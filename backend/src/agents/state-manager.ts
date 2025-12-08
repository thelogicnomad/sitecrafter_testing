/**
 * Project State Manager
 * Manages shared state between agents with rate limiting support
 */

import {
    ProjectState,
    AgentPhase,
    GeneratedFile,
    VerificationError,
    ProjectBlueprint,
    RateLimitConfig
} from './types';

// Conversation message type
export interface ConversationMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

// Default rate limit config for Gemini free tier
const DEFAULT_RATE_LIMIT: RateLimitConfig = {
    requestsPerMinute: 15, // Conservative for free tier
    delayBetweenRequests: 4000, // 4 seconds between requests
    apiKeys: [],
    currentKeyIndex: 0
};

export class ProjectStateManager {
    private state: ProjectState;
    private rateLimitConfig: RateLimitConfig;
    private lastRequestTime: number = 0;
    private requestCount: number = 0;
    private requestCountResetTime: number = Date.now();

    // NEW: Conversation history for context continuity
    private conversationHistory: ConversationMessage[] = [];

    constructor(
        userPrompt: string,
        projectType: 'frontend' | 'backend' | 'fullstack' = 'frontend',
        apiKeys: string[] = []
    ) {
        this.rateLimitConfig = {
            ...DEFAULT_RATE_LIMIT,
            apiKeys: apiKeys.length > 0 ? apiKeys : [process.env.gemini3 || '']
        };

        this.state = {
            userPrompt,
            projectType,
            blueprint: null,
            generatedFiles: new Map(),
            currentPhase: 'blueprint',
            phaseHistory: [],
            errors: [],
            iterationCount: 0,
            maxIterations: 3
        };

        // Initialize conversation with neutral context (phases will add their own instructions)
        this.conversationHistory = [
            {
                role: 'system',
                content: `You are a senior full-stack developer building a unique ${projectType} application. Follow each phase's specific instructions carefully.`
            }
        ];
    }

    // Get conversation history
    getConversationHistory(): ConversationMessage[] {
        return this.conversationHistory;
    }

    // Add message to conversation
    addToConversation(role: 'user' | 'assistant', content: string): void {
        this.conversationHistory.push({ role, content });
        // Keep conversation manageable - only last 10 messages
        if (this.conversationHistory.length > 12) {
            // Keep system message + last 10
            this.conversationHistory = [
                this.conversationHistory[0],
                ...this.conversationHistory.slice(-10)
            ];
        }
    }

    // Clear conversation (for fresh start)
    clearConversation(): void {
        this.conversationHistory = [this.conversationHistory[0]];
    }

    // Get current state
    getState(): ProjectState {
        return this.state;
    }

    // Get current API key with rotation
    getCurrentApiKey(): string {
        const key = this.rateLimitConfig.apiKeys[this.rateLimitConfig.currentKeyIndex];
        return key;
    }

    // Rotate to next API key
    rotateApiKey(): void {
        this.rateLimitConfig.currentKeyIndex =
            (this.rateLimitConfig.currentKeyIndex + 1) % this.rateLimitConfig.apiKeys.length;
        console.log(`🔄 Rotated to API key index: ${this.rateLimitConfig.currentKeyIndex}`);
    }

    // Wait for rate limit if needed
    async waitForRateLimit(): Promise<void> {
        const now = Date.now();

        // Reset counter every minute
        if (now - this.requestCountResetTime > 60000) {
            this.requestCount = 0;
            this.requestCountResetTime = now;
        }

        // Check if we've hit the per-minute limit
        if (this.requestCount >= this.rateLimitConfig.requestsPerMinute) {
            const waitTime = 60000 - (now - this.requestCountResetTime);
            console.log(`⏳ Rate limit reached. Waiting ${Math.ceil(waitTime / 1000)}s and rotating key...`);
            this.rotateApiKey();
            await this.delay(Math.min(waitTime, 5000)); // Wait max 5s then try with new key
            this.requestCount = 0;
            this.requestCountResetTime = Date.now();
        }

        // Ensure minimum delay between requests
        const timeSinceLastRequest = now - this.lastRequestTime;
        if (timeSinceLastRequest < this.rateLimitConfig.delayBetweenRequests) {
            const waitTime = this.rateLimitConfig.delayBetweenRequests - timeSinceLastRequest;
            console.log(`⏳ Waiting ${waitTime}ms before next request...`);
            await this.delay(waitTime);
        }

        this.lastRequestTime = Date.now();
        this.requestCount++;
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Set blueprint from Phase 1
    setBlueprint(blueprint: ProjectBlueprint): void {
        this.state.blueprint = blueprint;
        console.log(`📋 Blueprint set: ${blueprint.projectName} with ${blueprint.features.length} features`);
    }

    // Add generated file
    addFile(file: GeneratedFile): void {
        this.state.generatedFiles.set(file.path, file);
        console.log(`📁 File generated: ${file.path} (Phase: ${file.phase})`);

        if (this.state.onFileGenerated) {
            this.state.onFileGenerated(file);
        }
    }

    // Get all files as array
    getFiles(): GeneratedFile[] {
        return Array.from(this.state.generatedFiles.values());
    }

    // Get file by path
    getFile(path: string): GeneratedFile | undefined {
        return this.state.generatedFiles.get(path);
    }

    // Update file content
    updateFile(path: string, content: string): void {
        const existing = this.state.generatedFiles.get(path);
        if (existing) {
            existing.content = content;
            existing.timestamp = Date.now();
            console.log(`📝 File updated: ${path}`);
        }
    }

    // Set current phase
    setPhase(phase: AgentPhase): void {
        this.state.phaseHistory.push(this.state.currentPhase);
        this.state.currentPhase = phase;
        console.log(`\n🔵 Phase changed: ${phase.toUpperCase()}`);

        if (this.state.onPhaseChange) {
            this.state.onPhaseChange(phase);
        }
    }

    // Add verification error
    addError(error: VerificationError): void {
        this.state.errors.push(error);
        console.log(`❌ Error added: ${error.type} in ${error.file} - ${error.message}`);

        if (this.state.onError) {
            this.state.onError(error);
        }
    }

    // Clear errors (after repair)
    clearErrors(): void {
        this.state.errors = [];
    }

    // Increment iteration count
    incrementIteration(): number {
        this.state.iterationCount++;
        return this.state.iterationCount;
    }

    // Check if max iterations reached
    hasReachedMaxIterations(): boolean {
        return this.state.iterationCount >= this.state.maxIterations;
    }

    // Set callbacks
    setCallbacks(callbacks: {
        onFileGenerated?: (file: GeneratedFile) => void;
        onPhaseChange?: (phase: AgentPhase) => void;
        onError?: (error: VerificationError) => void;
        onComplete?: () => void;
    }): void {
        Object.assign(this.state, callbacks);
    }

    // Get summary for logging
    getSummary(): string {
        return `
📊 Project State Summary:
   Phase: ${this.state.currentPhase}
   Files: ${this.state.generatedFiles.size}
   Errors: ${this.state.errors.length}
   Iterations: ${this.state.iterationCount}/${this.state.maxIterations}
   Blueprint: ${this.state.blueprint ? '✅' : '❌'}
`;
    }
}
