/**
 * Structure Agent (Phase 2)
 * Generates foundational config files and project structure
 */

import { BaseAgent } from './base-agent';
import { AgentResult, GeneratedFile } from './types';
import { ProjectStateManager } from './state-manager';

export class StructureAgent extends BaseAgent {
    constructor(stateManager: ProjectStateManager) {
        super(stateManager, 'structure');
    }

    protected getSystemPrompt(): string {
        return `You are a senior frontend architect generating production-ready configuration files.

Generate COMPLETE, ERROR-FREE configuration files for a React + Vite + TypeScript + Tailwind project.

CRITICAL RULES:
1. package.json MUST include ALL dependencies the project needs
2. All config files must be syntactically valid
3. Include proper TypeScript path aliases (@/)
4. Tailwind config must extend theme properly
5. NO placeholders or TODOs

OUTPUT FORMAT: Return files in chirAction XML format:
<chirArtifact id="project-structure" title="Project Structure">
<chirAction type="file" filePath="package.json">
{file content here}
</chirAction>
<chirAction type="file" filePath="tsconfig.json">
{file content here}
</chirAction>
</chirArtifact>`;
    }

    protected getUserPrompt(): string {
        const state = this.stateManager.getState();
        const blueprint = state.blueprint;

        if (!blueprint) {
            return 'Generate standard React + Vite + TypeScript + Tailwind config files.';
        }

        // Build dependency list from blueprint
        const coreDeps = [
            'react@^18.3.1',
            'react-dom@^18.3.1',
            'react-router-dom@^7.1.1',
            'lucide-react@^0.460.0',
            'framer-motion@^11.14.4',
            'clsx@^2.1.1',
            'tailwind-merge@^2.5.5',
            'axios@^1.7.9'
        ];

        const additionalDeps = blueprint.dependencies || [];

        return `Generate production-ready configuration files for this project:

PROJECT: ${blueprint.projectName}
DESCRIPTION: ${blueprint.description}
STYLE: ${blueprint.designSystem?.style || 'modern'}
PRIMARY COLOR: ${blueprint.designSystem?.primaryColor || '#3b82f6'}
SECONDARY COLOR: ${blueprint.designSystem?.secondaryColor || '#10b981'}
FONT: ${blueprint.designSystem?.fontFamily || 'Inter'}

REQUIRED DEPENDENCIES:
${[...coreDeps, ...additionalDeps].join('\n')}

PAGES TO SUPPORT:
${blueprint.pages.map(p => `- ${p.name} (${p.route})`).join('\n')}

Generate these files:
1. package.json - Complete with ALL dependencies and scripts
2. tsconfig.json - Strict TypeScript with path aliases
3. tsconfig.node.json - For Vite config
4. vite.config.ts - With @/ path alias
5. tailwind.config.js - Extended theme with project colors
6. postcss.config.js - Standard PostCSS config
7. eslint.config.js - Modern flat config
8. index.html - With proper meta tags
9. src/main.tsx - Entry point with StrictMode
10. src/index.css - Tailwind imports + custom styles
11. src/lib/utils.ts - cn() utility function
12. src/vite-env.d.ts - Vite type definitions

Return ALL files in chirAction XML format.`;
    }

    async execute(): Promise<AgentResult> {
        console.log('\n📁 ═══════════════════════════════════════════');
        console.log('📁 PHASE 2: STRUCTURE AGENT');
        console.log('📁 ═══════════════════════════════════════════\n');

        try {
            const response = await this.callLLM(
                this.getSystemPrompt(),
                this.getUserPrompt(),
                0.3 // Lower temperature for consistent config files
            );

            // Parse chirAction files
            const files = this.parseChirActions(response);

            if (files.length === 0) {
                console.log('⚠️ No files parsed, attempting alternative parsing...');
                // Try to extract any file content
                return this.errorResult('No files generated in structure phase');
            }

            // Add files to state
            files.forEach(file => {
                this.stateManager.addFile(file);
            });

            console.log(`\n✅ Structure files generated: ${files.length}`);
            files.forEach(f => console.log(`   📄 ${f.path}`));

            return this.successResult(files, 'core');

        } catch (error: any) {
            console.error('Structure agent error:', error);
            return this.errorResult(`Structure generation failed: ${error.message}`);
        }
    }
}
