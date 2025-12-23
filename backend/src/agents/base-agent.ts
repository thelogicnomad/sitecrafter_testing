/**
 * Base Agent Class
 * Abstract base class for all agents in the pipeline
 */

import OpenAI from 'openai';
import { AgentResult, AgentPhase, GeneratedFile } from './types';
import { ProjectStateManager } from './state-manager';

export abstract class BaseAgent {
    protected stateManager: ProjectStateManager;
    protected client: OpenAI;
    // Use ONLY gemini-2.5-flash as per user request - no fallbacks
    protected model: string = 'gemini-2.5-flash';
    protected currentModelIndex: number = 0;
    protected phase: AgentPhase;

    constructor(stateManager: ProjectStateManager, phase: AgentPhase) {
        this.stateManager = stateManager;
        this.phase = phase;

        // Create OpenAI client with current API key
        this.client = new OpenAI({
            baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
            apiKey: stateManager.getCurrentApiKey()
        });
    }

    // Refresh client with potentially rotated API key
    protected refreshClient(): void {
        this.client = new OpenAI({
            baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
            apiKey: this.stateManager.getCurrentApiKey()
        });
    }

    // Execute the agent's main logic
    abstract execute(): Promise<AgentResult>;

    // Get the agent's system prompt
    protected abstract getSystemPrompt(): string;

    // Get the agent's user prompt
    protected abstract getUserPrompt(): string;

    // Make LLM call with conversation context (like ChatGPT)
    protected async callLLM(
        systemPrompt: string,
        userPrompt: string,
        temperature: number = 0.7,
        maxRetries: number = 3
    ): Promise<string> {
        let lastError: any = null;

        // Add user message to conversation
        this.stateManager.addToConversation('user', `[${this.phase.toUpperCase()} PHASE]\n${userPrompt}`);

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            // Wait for rate limit
            await this.stateManager.waitForRateLimit();

            // Refresh client in case key rotated
            this.refreshClient();

            // Build messages from conversation history
            const conversationHistory = this.stateManager.getConversationHistory();
            const messages = conversationHistory.map(msg => ({
                role: msg.role as 'system' | 'user' | 'assistant',
                content: msg.content
            }));

            console.log(`\n🤖 [${this.phase.toUpperCase()}] Making LLM call (attempt ${attempt}/${maxRetries})...`);
            console.log(`   Conversation messages: ${messages.length}`);
            console.log(`   Total context: ${messages.reduce((acc, m) => acc + m.content.length, 0)} chars`);

            try {
                const response = await this.client.chat.completions.create({
                    model: this.model,
                    messages: messages,
                    temperature
                });

                // DEBUG: Log response info
                const finishReason = response.choices[0]?.finish_reason || 'unknown';
                const content = response.choices[0]?.message?.content || '';

                console.log(`   📦 Finish reason: ${finishReason}`);
                console.log(`   ✅ Response received: ${content.length} chars`);

                // If RECITATION filter or empty, try different approach
                if (content.length === 0 || finishReason.includes('RECITATION')) {
                    console.log(`   ⚠️ Empty/filtered response (${finishReason}), trying with modified prompt...`);

                    // Remove last user message and try with modified prompt
                    const history = this.stateManager.getConversationHistory();
                    if (history.length > 1) {
                        history.pop(); // Remove last user message
                    }

                    // Add a "creativity" hint to avoid recitation
                    const modifiedPrompt = `BE CREATIVE AND ORIGINAL. Do not copy any existing code patterns. Generate completely unique code for this specific project.\n\n${userPrompt}`;
                    this.stateManager.addToConversation('user', modifiedPrompt);

                    this.stateManager.rotateApiKey();
                    await this.delay(3000);
                    continue;
                }

                // Add assistant response to conversation
                this.stateManager.addToConversation('assistant', content.substring(0, 2000)); // Truncate to manage context

                return content;
            } catch (error: any) {
                console.error(`   ❌ LLM call failed:`, error.message);
                lastError = error;

                // If rate limited, rotate key and retry
                if (error.status === 429 || error.message?.includes('rate')) {
                    console.log(`   🔄 Rate limited, rotating key and retrying...`);
                    this.stateManager.rotateApiKey();
                    await this.delay(5000);
                    continue;
                }

                // For other errors, throw immediately
                throw error;
            }
        }

        // All retries exhausted
        throw new Error(`LLM call failed after ${maxRetries} attempts: ${lastError?.message || 'Empty responses'}`);
    }

    // Direct LLM call WITHOUT conversation history (for phases that need isolated responses like Blueprint)
    // Uses only gemini-2.5-flash with robust retry and key rotation
    protected async callLLMDirect(
        systemPrompt: string,
        userPrompt: string,
        temperature: number = 0.9, // Higher temp to avoid RECITATION
        maxRetries: number = 5 // More retries since we only use one model
    ): Promise<string> {
        let lastError: any = null;

        console.log(`\n🔧 Using model: ${this.model}`);

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            await this.stateManager.waitForRateLimit();
            this.refreshClient();

            console.log(`🤖 [${this.phase.toUpperCase()}] Attempt ${attempt}/${maxRetries}...`);

            try {
                const response = await this.client.chat.completions.create({
                    model: this.model,
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: userPrompt }
                    ],
                    temperature: Math.min(temperature + (attempt * 0.05), 1.0) // Slightly increase temp on retries
                });

                const finishReason = response.choices[0]?.finish_reason || 'unknown';
                const content = response.choices[0]?.message?.content || '';
                console.log(`   📦 Finish: ${finishReason}, Received: ${content.length} chars`);

                // If RECITATION, rotate key and retry with higher temp
                if (finishReason.includes('RECITATION')) {
                    console.log(`   ⚠️ RECITATION filter - rotating key and increasing temperature...`);
                    this.stateManager.rotateApiKey();
                    await this.delay(2000);
                    continue;
                }

                if (content.length === 0) {
                    console.log(`   ⚠️ Empty response, rotating key...`);
                    this.stateManager.rotateApiKey();
                    await this.delay(3000);
                    continue;
                }

                return content;
            } catch (error: any) {
                console.error(`   ❌ Error:`, error.message || error);
                lastError = error;

                if (error.status === 429 || error.message?.includes('429')) {
                    console.log(`   🔄 Rate limited, rotating key and waiting...`);
                    this.stateManager.rotateApiKey();
                    await this.delay(5000 + (attempt * 2000)); // Longer waits on subsequent retries
                    continue;
                }

                // For other errors, rotate key and try again
                this.stateManager.rotateApiKey();
                await this.delay(2000);
            }
        }
        throw new Error(`LLM call failed after ${maxRetries} attempts: ${lastError?.message || 'RECITATION filter'}`);
    }

    // Parse chirAction XML from response
    protected parseChirActions(response: string): GeneratedFile[] {
        const files: GeneratedFile[] = [];

        // Try multiple regex patterns for flexibility
        const patterns = [
            // Standard format: <chirAction type="file" filePath="...">
            /<chirAction\s+type="file"\s+filePath="([^"]+)">([\s\S]*?)<\/chirAction>/g,
            // Reversed attributes: <chirAction filePath="..." type="file">
            /<chirAction\s+filePath="([^"]+)"\s+type="file">([\s\S]*?)<\/chirAction>/g,
            // Any chirAction with filePath
            /<chirAction[^>]*filePath="([^"]+)"[^>]*>([\s\S]*?)<\/chirAction>/g,
            // File tag with filePath attribute
            /<file\s+filePath="([^"]+)">([\s\S]*?)<\/file>/g,
            // File tag with path attribute
            /<file\s+path="([^"]+)">([\s\S]*?)<\/file>/g,
            // File tag with name attribute (Core Agent uses this!)
            /<file\s+name="([^"]+)">([\s\S]*?)<\/file>/g,
        ];

        console.log(`   🔍 Parsing response (${response.length} chars)...`);
        console.log(`   🔍 Response preview: ${response.substring(0, 300)}...`);

        for (const regex of patterns) {
            let match;
            while ((match = regex.exec(response)) !== null) {
                const [, filePath, rawContent] = match;

                // CRITICAL: Clean up file content
                let content = rawContent.trim();

                // 1. Strip CDATA wrappers (XML escape syntax)
                content = content.replace(/^\s*<!\[CDATA\[\s*/i, '');
                content = content.replace(/\s*\]\]>\s*$/i, '');

                // 2. Handle JSON content wrapper - LLM sometimes returns {"content": "..."}
                if (content.trim().startsWith('{') && content.includes('"content"')) {
                    try {
                        const jsonObj = JSON.parse(content);
                        if (jsonObj.content && typeof jsonObj.content === 'string') {
                            content = jsonObj.content;
                        }
                    } catch (e) {
                        // Not valid JSON, continue with original
                    }
                }

                // 3. Remove markdown code blocks with optional language specifier
                content = content.replace(/^```(?:typescript|tsx|ts|javascript|jsx|js|json|css|html|xml)?\s*\n?/i, '');
                content = content.replace(/\n?```\s*$/i, '');

                // 4. Handle case where entire content is wrapped in backticks
                if (content.startsWith('```') && content.endsWith('```')) {
                    content = content.slice(3, -3).replace(/^[a-z]+\n/i, '');
                }

                content = content.trim();

                // Avoid duplicates
                if (!files.find(f => f.path === filePath)) {
                    files.push({
                        path: filePath,
                        content: content,
                        phase: this.phase,
                        timestamp: Date.now()
                    });
                }
            }

            // Reset regex for next pattern
            regex.lastIndex = 0;

            // If we found files, no need to try other patterns
            if (files.length > 0) {
                console.log(`   ✅ Parsed ${files.length} files using pattern ${patterns.indexOf(regex) + 1}`);
                break;
            }
        }

        if (files.length === 0) {
            console.log(`   ❌ No files matched any pattern. Checking response structure...`);
            // Log what tags exist in the response
            const tagMatches = response.match(/<\/?[a-zA-Z][^>]*>/g);
            if (tagMatches) {
                const uniqueTags = [...new Set(tagMatches.slice(0, 10))];
                console.log(`   📦 Tags found: ${uniqueTags.join(', ')}`);
            }
        }

        return files;
    }

    // Get list of already generated files for context
    protected getGeneratedFilesContext(): string {
        const files = this.stateManager.getFiles();
        if (files.length === 0) return 'No files generated yet.';

        return files.map(f => {
            const preview = f.content.substring(0, 200).replace(/\n/g, ' ');
            return `- ${f.path}: ${preview}...`;
        }).join('\n');
    }

    // Get list of file paths for imports
    protected getGeneratedFilePaths(): string[] {
        return this.stateManager.getFiles().map(f => f.path);
    }

    // Helper delay function
    protected delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Create success result
    protected successResult(files: GeneratedFile[], nextPhase?: AgentPhase): AgentResult {
        return {
            success: true,
            phase: this.phase,
            files,
            errors: [],
            nextPhase,
            message: `Phase ${this.phase} completed successfully with ${files.length} files`
        };
    }

    // Create error result
    protected errorResult(message: string): AgentResult {
        return {
            success: false,
            phase: this.phase,
            files: [],
            errors: [],
            message
        };
    }
}
