/**
 * Verification Agent (Phase 6)
 * Detects errors, missing imports, and quality issues
 */

import { BaseAgent } from './base-agent';
import { AgentResult, VerificationError, GeneratedFile } from './types';
import { ProjectStateManager } from './state-manager';

export class VerificationAgent extends BaseAgent {
    constructor(stateManager: ProjectStateManager) {
        super(stateManager, 'verification');
    }

    protected getSystemPrompt(): string {
        return `You are a senior code reviewer analyzing generated React/TypeScript code for errors.

Your job is to find ALL issues that would prevent the code from compiling or running correctly.

CHECK FOR:
1. Missing imports - component/hook used but not imported
2. Missing packages - import from package not in package.json
3. Missing files - importing local file that doesn't exist
4. TypeScript errors - wrong types, missing interfaces
5. Placeholder content - TODO, "coming soon", "placeholder", empty components
6. Missing exports - component defined but not exported
7. Import path errors - wrong path or case sensitivity

OUTPUT FORMAT (JSON only):
{
  "errors": [
    {
      "type": "missing_import|missing_package|missing_file|placeholder|typescript_error|incomplete",
      "file": "path/to/file.tsx",
      "line": 10,
      "message": "Description of the error",
      "severity": "error|warning",
      "suggestedFix": "How to fix this"
    }
  ],
  "summary": {
    "totalErrors": 5,
    "totalWarnings": 2,
    "criticalIssues": ["list of critical issues"]
  }
}`;
    }

    protected getUserPrompt(filesWithErrors: string[] = []): string {
        const state = this.stateManager.getState();
        const files = Array.from(state.generatedFiles.values());

        // Get package.json to check dependencies
        const packageJson = files.find(f => f.path === 'package.json');
        const dependencies = packageJson ? this.extractDependencies(packageJson.content) : [];

        // Build file list for context (just paths, not content)
        const fileList = files.map(f => f.path).join('\n');

        // OPTIMIZATION: Only include content for files with errors (max 10 files)
        const filesToInclude = filesWithErrors.length > 0
            ? files.filter(f => filesWithErrors.includes(f.path)).slice(0, 10)
            : files.slice(0, 10); // Limit to first 10 files if no specific errors

        const fileContents = filesToInclude.map(f => {
            const content = f.content.length > 1500
                ? f.content.substring(0, 1500) + '\n// ... truncated'
                : f.content;
            return `=== ${f.path} ===\n${content}`;
        }).join('\n\n');

        return `Analyze these files for errors (${filesToInclude.length} of ${files.length} files shown):

ALL GENERATED FILES:
${fileList}

PACKAGES IN package.json:
${dependencies.join(', ')}

FILES TO REVIEW:
${fileContents}

Find errors in these specific files. Return ONLY JSON.`;
    }

    async execute(): Promise<AgentResult> {
        console.log('\n🔍 ═══════════════════════════════════════════');
        console.log('🔍 PHASE 6: VERIFICATION AGENT');
        console.log('🔍 ═══════════════════════════════════════════\n');

        try {
            // First do local analysis
            const localErrors = this.performLocalAnalysis();
            console.log(`   Local analysis found ${localErrors.length} issues`);

            // OPTIMIZATION: Skip LLM if very few local errors (saves context/rate limits)
            if (localErrors.length <= 3) {
                console.log('   ✅ Few local errors, skipping LLM verification');
                // Just use local errors
                localErrors.forEach(error => this.stateManager.addError(error));
                return {
                    success: localErrors.length === 0,
                    phase: this.phase,
                    files: [],
                    errors: localErrors,
                    nextPhase: localErrors.length > 0 ? 'repair' : undefined,
                    message: localErrors.length > 0 ? `Found ${localErrors.length} issues` : 'Verification passed'
                };
            }

            // Get files with errors for focused LLM analysis
            const filesWithErrors = [...new Set(localErrors.map(e => e.file))];

            // Then use LLM for deeper analysis (with reduced context)
            const response = await this.callLLM(
                this.getSystemPrompt(),
                this.getUserPrompt(filesWithErrors),
                0.2 // Low temperature for consistent analysis
            );

            // Parse LLM response
            let llmErrors: VerificationError[] = [];
            try {
                const cleaned = response
                    .replace(/```json\s*/g, '')
                    .replace(/```\s*/g, '')
                    .trim();

                const parsed = JSON.parse(cleaned);
                llmErrors = parsed.errors || [];
            } catch (e) {
                console.log('   Could not parse LLM verification response');
            }

            // Combine all errors
            const allErrors = [...localErrors, ...llmErrors];

            // Add errors to state
            allErrors.forEach(error => {
                this.stateManager.addError(error);
            });

            console.log(`\n🔍 Verification complete:`);
            console.log(`   Total errors: ${allErrors.filter(e => e.severity === 'error').length}`);
            console.log(`   Total warnings: ${allErrors.filter(e => e.severity === 'warning').length}`);

            if (allErrors.filter(e => e.severity === 'error').length > 0) {
                console.log('\n   Errors found:');
                allErrors.filter(e => e.severity === 'error').forEach(e => {
                    console.log(`   ❌ ${e.file}: ${e.message}`);
                });
            }

            // Decide next phase
            const hasErrors = allErrors.some(e => e.severity === 'error');
            const nextPhase = hasErrors ? 'repair' : undefined;

            return {
                success: !hasErrors,
                phase: this.phase,
                files: [],
                errors: allErrors,
                nextPhase,
                message: hasErrors
                    ? `Found ${allErrors.length} issues that need fixing`
                    : 'Verification passed - no critical errors'
            };

        } catch (error: any) {
            console.error('Verification agent error:', error);
            return this.errorResult(`Verification failed: ${error.message}`);
        }
    }

    private performLocalAnalysis(): VerificationError[] {
        const errors: VerificationError[] = [];
        const state = this.stateManager.getState();
        const files = Array.from(state.generatedFiles.values());
        const filePathSet = new Set(files.map(f => f.path));

        // Get package.json dependencies
        const packageJson = files.find(f => f.path === 'package.json');
        const dependencies = packageJson ? this.extractDependencies(packageJson.content) : [];

        for (const file of files) {
            // Skip non-code files
            if (!file.path.match(/\.(tsx?|jsx?)$/)) continue;

            // Check for placeholder content
            const placeholders = ['TODO', 'PLACEHOLDER', 'coming soon', 'will be', 'goes here'];
            for (const placeholder of placeholders) {
                if (file.content.toLowerCase().includes(placeholder.toLowerCase())) {
                    errors.push({
                        type: 'placeholder',
                        file: file.path,
                        message: `Contains placeholder text: "${placeholder}"`,
                        severity: 'error',
                        suggestedFix: `Replace "${placeholder}" with actual implementation`
                    });
                }
            }

            // Check for empty component bodies
            if (file.content.includes('return null') || file.content.includes('return <></>')) {
                errors.push({
                    type: 'incomplete',
                    file: file.path,
                    message: 'Component returns null or empty fragment',
                    severity: 'error',
                    suggestedFix: 'Implement actual component content'
                });
            }

            // Check imports against available files
            const importMatches = file.content.matchAll(/from\s+['"](@\/[^'"]+)['"]/g);
            for (const match of importMatches) {
                const importPath = match[1];
                const resolvedPath = this.resolveImportPath(importPath);

                if (!this.fileExists(resolvedPath, filePathSet)) {
                    errors.push({
                        type: 'missing_file',
                        file: file.path,
                        message: `Import "${importPath}" - file not found`,
                        severity: 'error',
                        suggestedFix: `Create file: ${resolvedPath}`
                    });
                }
            }

            // Check package imports (skip @/ path aliases!)
            const pkgImports = file.content.matchAll(/from\s+['"]([a-z@][^'"]*)['"]/g);
            for (const match of pkgImports) {
                const importPath = match[1];

                // CRITICAL FIX: Skip @/ path aliases - they are NOT packages!
                if (importPath.startsWith('@/')) {
                    continue; // This is a TypeScript path alias, not a package
                }

                const pkg = importPath.split('/')[0]; // Get base package name
                if (pkg.startsWith('@')) {
                    // Scoped package (like @hookform/resolvers) - get first two parts
                    const parts = importPath.split('/');
                    const scopedPkg = parts.slice(0, 2).join('/');
                    if (!dependencies.includes(scopedPkg) && !dependencies.includes(pkg)) {
                        errors.push({
                            type: 'missing_package',
                            file: file.path,
                            message: `Package "${scopedPkg}" not in dependencies`,
                            severity: 'error',
                            suggestedFix: `Add "${scopedPkg}" to package.json`
                        });
                    }
                } else if (!dependencies.includes(pkg) && !pkg.startsWith('.')) {
                    errors.push({
                        type: 'missing_package',
                        file: file.path,
                        message: `Package "${pkg}" not in dependencies`,
                        severity: 'error',
                        suggestedFix: `Add "${pkg}" to package.json`
                    });
                }
            }
        }

        return errors;
    }

    private extractDependencies(packageJsonContent: string): string[] {
        try {
            const pkg = JSON.parse(packageJsonContent);
            return [
                ...Object.keys(pkg.dependencies || {}),
                ...Object.keys(pkg.devDependencies || {})
            ];
        } catch {
            return [];
        }
    }

    private resolveImportPath(importPath: string): string {
        // Convert @/path to src/path
        let resolved = importPath.replace('@/', 'src/');

        // Add possible extensions
        const extensions = ['.tsx', '.ts', '.jsx', '.js'];
        for (const ext of extensions) {
            if (resolved.endsWith(ext)) return resolved;
        }

        return resolved + '.tsx'; // Default to .tsx
    }

    private fileExists(path: string, fileSet: Set<string>): boolean {
        // Check exact match
        if (fileSet.has(path)) return true;

        // Check with different extensions
        const extensions = ['.tsx', '.ts', '.jsx', '.js', '/index.tsx', '/index.ts'];
        for (const ext of extensions) {
            const withExt = path.replace(/\.(tsx?|jsx?)$/, '') + ext;
            if (fileSet.has(withExt)) return true;
        }

        return false;
    }
}
