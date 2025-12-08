/**
 * Core Agent (Phase 3)
 * Generates layout components, providers, and shared UI
 */

import { BaseAgent } from './base-agent';
import { AgentResult } from './types';
import { ProjectStateManager } from './state-manager';

export class CoreAgent extends BaseAgent {
    constructor(stateManager: ProjectStateManager) {
        super(stateManager, 'core');
    }

    protected getSystemPrompt(): string {
        return `THIS IS THE CORE PHASE - Generate REACT COMPONENTS only, NOT config files.

DO NOT generate: package.json, tsconfig.json, vite.config.ts, tailwind.config.js, etc.
THOSE ARE ALREADY DONE. This phase is ONLY for React component files.

Generate these COMPONENT files:
1. src/components/layout/Header.tsx - Navigation header with links
2. src/components/layout/Footer.tsx - Footer with copyright
3. src/components/layout/AppLayout.tsx - Layout wrapper with Outlet
4. src/components/ui/Button.tsx - Reusable button
5. src/components/ui/Card.tsx - Card component
6. src/components/ui/Input.tsx - Form input
7. src/App.tsx - Main app with BrowserRouter and routes

RULES:
- TypeScript + Tailwind CSS
- Use @/ path imports
- NO markdown backticks around code

OUTPUT FORMAT:
<chirArtifact id="core" title="Core Components">
<chirAction type="file" filePath="src/components/layout/Header.tsx">
// Component code here - raw TSX, no backticks
</chirAction>
</chirArtifact>`;
    }

    protected getUserPrompt(): string {
        const state = this.stateManager.getState();
        const blueprint = state.blueprint;

        if (!blueprint) {
            return 'Generate standard React layout components.';
        }

        // Generate list of page imports
        const pageImports = blueprint.pages.map(p => {
            const pageName = p.name.replace(/\s+/g, '');
            return `import ${pageName} from '@/pages/${pageName}';`;
        }).join('\n');

        // Generate route elements
        const routeElements = blueprint.pages.map(p => {
            const pageName = p.name.replace(/\s+/g, '');
            const path = p.route === '/' ? 'index' : `path="${p.route.replace('/', '')}"`;
            return `          <Route ${path} element={<${pageName} />} />`;
        }).join('\n');

        return `Generate core components for this project:

PROJECT: ${blueprint.projectName}
DESCRIPTION: ${blueprint.description}

DESIGN SYSTEM:
- Primary Color: ${blueprint.designSystem?.primaryColor || '#3b82f6'}
- Secondary Color: ${blueprint.designSystem?.secondaryColor || '#10b981'}
- Style: ${blueprint.designSystem?.style || 'modern'}
- Font: ${blueprint.designSystem?.fontFamily || 'Inter'}

PAGES THAT WILL EXIST (for Header navigation and App.tsx routing):
${blueprint.pages.map(p => `- ${p.name} at route "${p.route}" -> file: src/pages/${p.name.replace(/\s+/g, '')}.tsx`).join('\n')}

Generate these files:

1. src/lib/utils.ts
   - Export cn() function using clsx and tailwind-merge
   - This is CRITICAL - many components depend on it

2. src/components/layout/Header.tsx
   - Import { Link } from 'react-router-dom'
   - Logo/brand name: "${blueprint.projectName}"
   - Navigation links for ALL pages using Link component
   - Mobile hamburger menu with useState
   - Modern design with framer-motion animations
   
3. src/components/layout/Footer.tsx
   - Company info for "${blueprint.projectName}"
   - Quick links matching header navigation
   - Social media icons from lucide-react
   - Copyright with current year
   
4. src/components/layout/AppLayout.tsx
   - Import Header, Footer, and Outlet
   - Structure: Header -> main with Outlet -> Footer
   - Use Outlet from react-router-dom for nested routes
   - Export as NAMED export: export { AppLayout }
   
5. src/components/ui/Button.tsx - Complete button with variants
6. src/components/ui/Card.tsx - Flexible card component
7. src/components/ui/Input.tsx - Form input with proper types

8. src/App.tsx - THIS IS CRITICAL:
   - Import BrowserRouter, Routes, Route from 'react-router-dom'
   - Import { AppLayout } from '@/components/layout/AppLayout'
   - Import ALL page components like this:
${pageImports}
   - Routes structure:
     <BrowserRouter>
       <Routes>
         <Route path="/" element={<AppLayout />}>
${routeElements}
           <Route path="*" element={<NotFoundPage />} />
         </Route>
       </Routes>
     </BrowserRouter>

IMPORTANT: Do NOT put backticks around the code. Just raw TypeScript/TSX code inside chirAction tags.

Return ALL files in chirAction XML format with COMPLETE implementations.`;
    }

    async execute(): Promise<AgentResult> {
        console.log('\n🏗️ ═══════════════════════════════════════════');
        console.log('🏗️ PHASE 3: CORE AGENT');
        console.log('🏗️ ═══════════════════════════════════════════\n');

        try {
            // Use callLLMDirect to avoid RECITATION filter issues with conversation context
            const response = await this.callLLMDirect(
                this.getSystemPrompt(),
                this.getUserPrompt(),
                0.5
            );

            const files = this.parseChirActions(response);

            if (files.length === 0) {
                return this.errorResult('No core files generated');
            }

            files.forEach(file => {
                this.stateManager.addFile(file);
            });

            console.log(`\n✅ Core files generated: ${files.length}`);
            files.forEach(f => console.log(`   📄 ${f.path}`));

            return this.successResult(files, 'component');

        } catch (error: any) {
            console.error('Core agent error:', error);
            return this.errorResult(`Core generation failed: ${error.message}`);
        }
    }
}
