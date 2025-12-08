/**
 * Page Agent (Phase 5)
 * Generates complete page implementations with all sections
 */

import { BaseAgent } from './base-agent';
import { AgentResult, PageSpec } from './types';
import { ProjectStateManager } from './state-manager';

export class PageAgent extends BaseAgent {
    constructor(stateManager: ProjectStateManager) {
        super(stateManager, 'page');
    }

    protected getSystemPrompt(): string {
        return `You are a senior React developer generating complete, production-ready page components.

CRITICAL RULES:
1. Each page must be FULLY IMPLEMENTED - no placeholders
2. Each page file MUST have a default export: export default PageName;
3. Include multiple sections per page (Hero, Features, Content, CTA, etc.)
4. Use real sample data - product names, descriptions, prices
<chirArtifact id="pages" title="Page Components">
<chirAction type="file" filePath="src/pages/HomePage.tsx">
{raw page code - NO backticks - MUST have default export}
</chirAction>
</chirArtifact>`;
    }

    protected getUserPrompt(): string {
        const state = this.stateManager.getState();
        const blueprint = state.blueprint;

        if (!blueprint) {
            return 'Generate a basic HomePage component.';
        }

        // Get list of already generated files for context
        const existingFiles = this.getGeneratedFilePaths();
        const componentFiles = existingFiles
            .filter(f => f.includes('/components/'))
            .map(f => '@/' + f.replace('src/', '').replace('.tsx', ''))
            .join('\n');

        // Build page specs with proper file names
        const pageSpecs = blueprint.pages.map(page => {
            const fileName = page.name.replace(/\s+/g, '');
            return `
PAGE: ${page.name}
FILE: src/pages/${fileName}.tsx
ROUTE: ${page.route}
DESCRIPTION: ${page.description}
SECTIONS: ${page.sections?.join(', ') || 'Hero, Features, Content, CTA'}
MUST EXPORT: export default ${fileName};`;
        }).join('\n');

        return `Generate COMPLETE page implementations for this project:

PROJECT: ${blueprint.projectName}
DESCRIPTION: ${blueprint.description}

DESIGN:
- Primary Color: ${blueprint.designSystem?.primaryColor}
- Secondary Color: ${blueprint.designSystem?.secondaryColor}
- Style: ${blueprint.designSystem?.style}

ALREADY GENERATED COMPONENTS (import these):
${componentFiles || '@/components/ui/Button\n@/components/ui/Card\n@/components/layout/Header\n@/components/layout/Footer'}

PAGES TO GENERATE:
${pageSpecs}

Also generate a NotFoundPage:
- FILE: src/pages/NotFoundPage.tsx
- Shows 404 error with link back to home
- MUST EXPORT: export default NotFoundPage;

CRITICAL REQUIREMENTS:
1. EVERY page must have real, meaningful content
2. Use sample data that makes sense for "${blueprint.projectName}"
3. Include at least 4 sections per page
4. Add framer-motion animations (use motion.div, motion.h1, etc.)
5. Responsive design with Tailwind (sm:, md:, lg: breakpoints)
6. Import lucide-react icons
7. NO "Lorem ipsum" - write real placeholder text
8. NO "Coming soon" or TODO comments
9. MUST use default exports: export default PageName;

IMAGE URLs - USE ONLY THESE FORMATS:
- Hero images: https://picsum.photos/1920/1080
- Card images: https://picsum.photos/400/300
- Thumbnails: https://picsum.photos/200/200
- Portrait: https://picsum.photos/600/800
- Random seed: https://picsum.photos/seed/{keyword}/800/600

NEVER use:
- images.unsplash.com direct links (they return 404)
- /images/... local paths that don't exist
- placeholder.com or other services

IMPORTANT: Do NOT put backticks around the code. Raw TypeScript/TSX only.

Return ALL pages in chirAction XML format with COMPLETE implementations.`;
    }

    async execute(): Promise<AgentResult> {
        console.log('\n📄 ═══════════════════════════════════════════');
        console.log('📄 PHASE 5: PAGE AGENT');
        console.log('📄 ═══════════════════════════════════════════\n');

        try {
            const state = this.stateManager.getState();
            const blueprint = state.blueprint;

            if (!blueprint || !blueprint.pages.length) {
                return this.errorResult('No pages defined in blueprint');
            }

            // Generate pages in batches to avoid context limits
            const allFiles: any[] = [];
            const pageChunks = this.chunkArray(blueprint.pages, 3);

            for (let i = 0; i < pageChunks.length; i++) {
                const chunk = pageChunks[i];
                console.log(`\n📄 Generating pages batch ${i + 1}/${pageChunks.length}: ${chunk.map((p: PageSpec) => p.name).join(', ')}`);

                const response = await this.callLLM(
                    this.getSystemPrompt(),
                    this.getPageBatchPrompt(chunk),
                    0.6
                );

                const files = this.parseChirActions(response);
                allFiles.push(...files);

                // Add files to state
                files.forEach(file => {
                    this.stateManager.addFile(file);
                });

                // Small delay between batches
                if (i < pageChunks.length - 1) {
                    await this.delay(2000);
                }
            }

            console.log(`\n✅ Page files generated: ${allFiles.length}`);
            allFiles.forEach((f: any) => console.log(`   📄 ${f.path}`));

            return this.successResult(allFiles, 'verification');

        } catch (error: any) {
            console.error('Page agent error:', error);
            return this.errorResult(`Page generation failed: ${error.message}`);
        }
    }

    private getPageBatchPrompt(pages: PageSpec[]): string {
        const blueprint = this.stateManager.getState().blueprint;

        return `Generate these specific pages with COMPLETE implementations:

${pages.map(page => {
            const fileName = page.name.replace(/\s+/g, '');
            return `
PAGE: ${page.name}
FILE PATH: src/pages/${fileName}.tsx
ROUTE: ${page.route}
DESCRIPTION: ${page.description}
REQUIRED SECTIONS: ${page.sections?.join(', ') || 'Hero, Features, Content, CTA'}
MUST END WITH: export default ${fileName};`;
        }).join('\n')}

PROJECT CONTEXT: ${blueprint?.projectName} - ${blueprint?.description}
STYLE: ${blueprint?.designSystem?.style}
PRIMARY COLOR: ${blueprint?.designSystem?.primaryColor}

CRITICAL RULES:
1. Each page MUST have "export default PageName;" at the end
2. DO NOT wrap code in backticks - raw code only
3. Use framer-motion for animations
4. Real content, no placeholders
5. Use components from @/components/ui/ and @/components/layout/

Return these pages in chirAction XML format with FULL implementations.`;
    }

    private chunkArray<T>(array: T[], size: number): T[][] {
        const chunks: T[][] = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    }
}
