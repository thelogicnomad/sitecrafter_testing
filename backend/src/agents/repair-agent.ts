/**
 * Repair Agent (Phase 7)
 * Fixes detected errors by regenerating/updating files
 */

import { BaseAgent } from './base-agent';
import { AgentResult, VerificationError } from './types';
import { ProjectStateManager } from './state-manager';

export class RepairAgent extends BaseAgent {
    constructor(stateManager: ProjectStateManager) {
        super(stateManager, 'repair');
    }

    protected getSystemPrompt(): string {
        return `You are a senior developer fixing errors in generated React/TypeScript code.

Your job is to generate CORRECTED versions of files that have errors.

RULES:
1. Fix ALL the errors listed
2. Keep the original functionality - just fix the bugs
3. Add missing imports
4. Add missing exports
5. Replace placeholder content with real implementations
6. Ensure TypeScript types are correct

OUTPUT FORMAT: Return ONLY the fixed files in chirAction XML format:
<chirArtifact id="repairs" title="Fixed Files">
<chirAction type="file" filePath="path/to/fixed/file.tsx">
{complete fixed file content}
</chirAction>
</chirArtifact>`;
    }

    protected getUserPrompt(): string {
        const state = this.stateManager.getState();
        const errors = state.errors;

        // Group errors by file
        const errorsByFile = new Map<string, VerificationError[]>();
        for (const error of errors) {
            if (!errorsByFile.has(error.file)) {
                errorsByFile.set(error.file, []);
            }
            errorsByFile.get(error.file)!.push(error);
        }

        // Get existing file contents
        const filesToFix: string[] = [];
        errorsByFile.forEach((fileErrors, filePath) => {
            const file = state.generatedFiles.get(filePath);
            if (file) {
                filesToFix.push(`
=== ${filePath} ===
ERRORS TO FIX:
${fileErrors.map(e => `- ${e.type}: ${e.message}${e.suggestedFix ? ` (Suggested: ${e.suggestedFix})` : ''}`).join('\n')}

CURRENT CONTENT:
${file.content}
`);
            }
        });

        // Also handle missing file errors by generating them
        const missingFiles = errors
            .filter(e => e.type === 'missing_file')
            .map(e => e.suggestedFix?.replace('Create file: ', '') || '');

        return `Fix these errors in the generated code:

FILES WITH ERRORS:
${filesToFix.join('\n\n')}

${missingFiles.length > 0 ? `
MISSING FILES TO CREATE:
${missingFiles.join('\n')}

For missing files, generate complete implementations based on the project context.
` : ''}

IMPORTANT:
1. Return COMPLETE fixed file contents (not just the changes)
2. Fix ALL errors in each file
3. Make sure all imports are correct
4. Make sure all exports are present
5. Replace any placeholder content with real implementations

Return the fixed files in chirAction XML format.`;
    }

    async execute(): Promise<AgentResult> {
        console.log('\n🔧 ═══════════════════════════════════════════');
        console.log('🔧 PHASE 7: REPAIR AGENT');
        console.log('🔧 ═══════════════════════════════════════════\n');

        try {
            const state = this.stateManager.getState();
            const errors = state.errors;

            if (errors.length === 0) {
                console.log('   No errors to fix!');
                return this.successResult([], undefined);
            }

            // Check iteration limit
            const iteration = this.stateManager.incrementIteration();
            if (this.stateManager.hasReachedMaxIterations()) {
                console.log(`   ⚠️ Max iterations (${state.maxIterations}) reached, stopping repairs`);
                return {
                    success: false,
                    phase: this.phase,
                    files: [],
                    errors,
                    message: `Max repair iterations reached. ${errors.length} errors remain.`
                };
            }

            console.log(`   Repair iteration ${iteration}/${state.maxIterations}`);
            console.log(`   Fixing ${errors.length} errors...`);

            // Try to fix package.json separately if package errors exist
            const packageErrors = errors.filter(e => e.type === 'missing_package');
            if (packageErrors.length > 0) {
                await this.fixPackageJson(packageErrors);
            }

            // Fix file errors
            const fileErrors = errors.filter(e => e.type !== 'missing_package');
            if (fileErrors.length > 0) {
                const response = await this.callLLM(
                    this.getSystemPrompt(),
                    this.getUserPrompt(),
                    0.4
                );

                const files = this.parseChirActions(response);

                // Update existing files or add new ones
                files.forEach(file => {
                    const existing = state.generatedFiles.get(file.path);
                    if (existing) {
                        this.stateManager.updateFile(file.path, file.content);
                    } else {
                        this.stateManager.addFile(file);
                    }
                });

                console.log(`   ✅ Fixed ${files.length} files`);
            }

            // Clear errors for re-verification
            this.stateManager.clearErrors();

            return {
                success: true,
                phase: this.phase,
                files: [],
                errors: [],
                nextPhase: 'verification', // Go back to verification
                message: `Repair iteration ${iteration} complete. Re-verifying...`
            };

        } catch (error: any) {
            console.error('Repair agent error:', error);
            return this.errorResult(`Repair failed: ${error.message}`);
        }
    }

    private async fixPackageJson(packageErrors: VerificationError[]): Promise<void> {
        const state = this.stateManager.getState();
        const packageFile = state.generatedFiles.get('package.json');

        if (!packageFile) return;

        try {
            // Clean the content - extract just the JSON part
            let content = packageFile.content;

            // Strip any prefix before the opening brace
            const jsonStart = content.indexOf('{');
            if (jsonStart > 0) {
                console.log(`   ⚠️ Stripping ${jsonStart} chars prefix from package.json`);
                content = content.substring(jsonStart);
            }

            // Strip any suffix after the closing brace
            const jsonEnd = content.lastIndexOf('}');
            if (jsonEnd > 0 && jsonEnd < content.length - 1) {
                content = content.substring(0, jsonEnd + 1);
            }

            const pkg = JSON.parse(content);

            // Add missing packages with default versions
            const packageVersions: Record<string, string> = {
                // React core
                'react': '^18.3.1',
                'react-dom': '^18.3.1',
                'react-router-dom': '^7.1.1',
                // Animation & UI
                'framer-motion': '^11.14.4',
                'lucide-react': '^0.460.0',
                'class-variance-authority': '^0.7.0',
                'gsap': '^3.12.5',
                '@gsap/react': '^2.1.1',
                // Utilities
                'axios': '^1.7.9',
                'clsx': '^2.1.1',
                'tailwind-merge': '^2.5.5',
                'date-fns': '^4.1.0',
                // State & Data
                '@tanstack/react-query': '^5.62.2',
                'zustand': '^5.0.2',
                // Forms & Validation
                'zod': '^3.24.1',
                'react-hook-form': '^7.54.0',
                '@hookform/resolvers': '^3.9.1',
                // Notifications
                'sonner': '^1.7.3',
                // 3D & Effects
                'three': '^0.170.0',
                '@react-three/fiber': '^8.17.0',
                '@react-three/drei': '^9.117.0',
                'ogl': '^1.0.8',
                'lenis': '^1.1.14',
                // Radix UI
                '@radix-ui/react-dialog': '^1.1.2',
                '@radix-ui/react-dropdown-menu': '^2.1.2',
                '@radix-ui/react-toast': '^1.2.2',
                '@radix-ui/react-slot': '^1.1.0',
                // SEO & Utils
                'react-helmet-async': '^2.0.5',
                'react-intersection-observer': '^9.13.1'
            };

            for (const error of packageErrors) {
                const match = error.message.match(/Package "([^"]+)"/);
                if (match) {
                    const pkgName = match[1];
                    if (!pkg.dependencies[pkgName]) {
                        pkg.dependencies[pkgName] = packageVersions[pkgName] || 'latest';
                        console.log(`   📦 Added missing package: ${pkgName}`);
                    }
                }
            }

            // Update package.json
            this.stateManager.updateFile('package.json', JSON.stringify(pkg, null, 2));

        } catch (e) {
            console.error('   Failed to fix package.json:', e);
        }
    }
}
