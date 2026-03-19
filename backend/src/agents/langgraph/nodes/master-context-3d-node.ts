/**
 * Master Context 3D Node
 * Generates comprehensive, unified 3D context for all downstream nodes
 * Replaces: prompt-expansion-node.ts + context-3d-node.ts for 3D mode
 */

import { WebsiteState } from '../graph-state';
import { MasterContext3DService } from '../../../services/master-context-3d.service';
import { notifyPhaseChange } from '../website-graph';

export async function masterContext3DNode(
    state: WebsiteState
): Promise<Partial<WebsiteState>> {

    console.log(`\n[MasterContext3D Node] ═══════════════════════════════════════════════`);
    console.log(`[MasterContext3D Node] GENERATING UNIFIED MASTER CONTEXT`);
    console.log(`[MasterContext3D Node] ═══════════════════════════════════════════════`);

    // Notify phase change
    notifyPhaseChange('master_context_3d');

    // Skip if not 3D mode
    if (!state.enable3D) {
        console.log(`[MasterContext3D Node] Not in 3D mode, skipping...`);
        return {
            currentPhase: 'master_context_skip',
            messages: ['Skipped master context (not 3D mode)'],
        };
    }

    try {
        // Get or generate theme - pass undefined if not available (service will generate one)
        const theme = state.dynamicTheme || undefined;

        // Generate master context
        const result = await MasterContext3DService.generateMasterContext(
            state.userPrompt,
            theme
        );

        if (!result.success || !result.data) {
            throw new Error(result.error || 'Failed to generate master context');
        }

        const masterContext = result.data;

        // Extract backward-compatible fields
        const expandedPrompt = masterContext.expandedPrompt;
        const ragContext = MasterContext3DService.serializeForLLM(masterContext, 20000);
        const intentTags = masterContext.ragContext.intentTags;
        const detailedContext = masterContext.expandedPrompt;

        // Build scene-page map from master context
        const scenePageMap: Record<string, string[]> = {};
        for (const page of masterContext.pages) {
            scenePageMap[page.name] = page.sceneComponents;
        }

        // Build import instructions
        const importInstructions = masterContext.scenes.map(scene =>
            `import { ${scene.name} } from '../components/3d/${scene.fileName.replace('.tsx', '')}';`
        ).join('\n');

        // Build threeDModules list
        const threeDModules = masterContext.ragContext.intentTags;

        console.log(`[MasterContext3D Node] ═══════════════════════════════════════════════`);
        console.log(`[MasterContext3D Node] MASTER CONTEXT GENERATED`);
        console.log(`[MasterContext3D Node] Brand: ${masterContext.brand.name}`);
        console.log(`[MasterContext3D Node] Scenes: ${masterContext.scenes.length}`);
        console.log(`[MasterContext3D Node] Pages: ${masterContext.pages.length}`);
        console.log(`[MasterContext3D Node] RAG Tags: ${intentTags.join(', ')}`);
        console.log(`[MasterContext3D Node] ═══════════════════════════════════════════════\n`);

        return {
            // New unified context
            masterContext,

            // Backward-compatible fields for existing nodes
            expandedPrompt,
            ragContext,
            intentTags,
            detailedContext,
            scenePageMap,
            importInstructions,
            threeDModules,

            // Note: dynamicTheme is kept from state if it exists, or remains undefined
            // The masterContext.designTokens provides all styling information for 3D mode

            // Phase tracking
            currentPhase: 'master_context_complete',
            messages: [
                `Master 3D context generated: "${masterContext.brand.name}"`,
                `${masterContext.scenes.length} scenes, ${masterContext.pages.length} pages`,
                `RAG context: ${intentTags.length} intent tags`,
                `Design: ${masterContext.designTokens.colors.primary} (primary)`,
            ],
        };

    } catch (error: any) {
        console.error(`[MasterContext3D Node] Error: ${error.message}`);

        // Return with error state but don't fail completely
        return {
            currentPhase: 'master_context_error',
            messages: [`Master context generation failed: ${error.message}`],
            // Keep existing fields so pipeline can attempt to continue
        };
    }
}
