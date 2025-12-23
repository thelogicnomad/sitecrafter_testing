/**
 * Component Agent (Phase 4)
 * Generates feature-specific components in batches
 */

import { BaseAgent } from './base-agent';
import { AgentResult, ComponentSpec } from './types';
import { ProjectStateManager } from './state-manager';

export class ComponentAgent extends BaseAgent {
    constructor(stateManager: ProjectStateManager) {
        super(stateManager, 'component');
    }

    protected getSystemPrompt(): string {
        return `You are a senior React developer generating production-ready components.

CRITICAL RULES:
1. Every component must be FULLY implemented - no placeholders
2. Use TypeScript with proper interfaces for props
3. Use Tailwind CSS for styling
4. Components should be reusable and well-structured
5. Include proper exports (default or named)
6. Add Framer Motion animations where appropriate
7. Use lucide-react for icons

COMPONENT STRUCTURE:
- Props interface at top
- Proper TypeScript types
- Clean JSX with Tailwind classes
- Export statement

OUTPUT FORMAT: Return files in chirAction XML format:
<chirArtifact id="components" title="Feature Components">
<chirAction type="file" filePath="src/components/features/ProductCard.tsx">
{component code}
</chirAction>
</chirArtifact>`;
    }

    protected getUserPrompt(): string {
        const state = this.stateManager.getState();
        const blueprint = state.blueprint;

        if (!blueprint) {
            return 'Generate basic feature components.';
        }

        // Get components from blueprint
        const featureComponents = blueprint.components.filter(c => c.type === 'feature');
        const uiComponents = blueprint.components.filter(c => c.type === 'ui');

        return `Generate feature components for this project:

PROJECT: ${blueprint.projectName}
DESCRIPTION: ${blueprint.description}

DESIGN:
- Primary: ${blueprint.designSystem?.primaryColor}
- Secondary: ${blueprint.designSystem?.secondaryColor}
- Style: ${blueprint.designSystem?.style}

EXISTING FILES (import and use these where needed):
${this.stateManager.getFileContext() || 'No files generated yet'}

FEATURE COMPONENTS TO GENERATE:
${featureComponents.map(c => `
- ${c.name}
  Type: ${c.type}
  Props: ${c.props?.join(', ') || 'standard'}
  Used for: Project-specific feature`).join('\n')}

UI COMPONENTS TO GENERATE (if not already created):
${uiComponents.map(c => `
- ${c.name}
  Type: ${c.type}
  Props: ${c.props?.join(', ') || 'standard'}`).join('\n')}

FEATURES TO SUPPORT:
${blueprint.features.map(f => `- ${f.name}: ${f.description}`).join('\n')}

Generate components at these paths:
- Feature components: src/components/features/ComponentName.tsx
- Additional UI: src/components/ui/ComponentName.tsx

IMAGE URLs - USE LOREM PICSUM (reliable, CDN-backed):
Format: https://picsum.photos/seed/{descriptive-name}/{width}/{height}
- Cards: https://picsum.photos/seed/card-1/400/300
- Thumbnails: https://picsum.photos/seed/thumb-1/200/200
- Avatars: https://picsum.photos/seed/avatar-1/100/100
NEVER use source.unsplash.com or fake local paths.

Each component must be COMPLETE with real functionality.
Return all components in chirAction XML format.`;
    }

    async execute(): Promise<AgentResult> {
        console.log('\n🧩 ═══════════════════════════════════════════');
        console.log('🧩 PHASE 4: COMPONENT AGENT');
        console.log('🧩 ═══════════════════════════════════════════\n');

        try {
            const state = this.stateManager.getState();
            const blueprint = state.blueprint;

            if (!blueprint) {
                return this.errorResult('No blueprint available');
            }

            const response = await this.callLLM(
                this.getSystemPrompt(),
                this.getUserPrompt(),
                0.5
            );

            const files = this.parseChirActions(response);

            if (files.length === 0) {
                console.log('   ⚠️ No component files generated');
                // Continue anyway - core agent may have created necessary components
                return this.successResult([], 'page');
            }

            files.forEach(file => {
                this.stateManager.addFile(file);
            });

            console.log(`\n✅ Component files generated: ${files.length}`);
            files.forEach(f => console.log(`   📄 ${f.path}`));

            return this.successResult(files, 'page');

        } catch (error: any) {
            console.error('Component agent error:', error);
            return this.errorResult(`Component generation failed: ${error.message}`);
        }
    }
}
