/**
 * Website Generator Graph - Main LangGraph orchestration
 * Connects all nodes with conditional edges for repair loop
 */

import { StateGraph, END } from '@langchain/langgraph';
import { WebsiteStateAnnotation, WebsiteState, GeneratedFile } from './graph-state';
import { blueprintNode } from './nodes/blueprint-node';
import { structureNode } from './nodes/structure-node';
import { coreNode } from './nodes/core-node';
import { componentNode } from './nodes/component-node';
import { pageNode } from './nodes/page-node';
import { validationNode } from './nodes/validation-node';
import { repairNode } from './nodes/repair-node';

// Global callback registry for streaming
let globalFileCallback: ((file: GeneratedFile) => void) | null = null;
let globalPhaseCallback: ((phase: string) => void) | null = null;

// Export functions to set callbacks
export function setFileCallback(cb: ((file: GeneratedFile) => void) | null) {
    globalFileCallback = cb;
}

export function setPhaseCallback(cb: ((phase: string) => void) | null) {
    globalPhaseCallback = cb;
}

// Function to call when a file is generated (called by nodes)
export function notifyFileCreated(file: GeneratedFile) {
    if (globalFileCallback) {
        globalFileCallback(file);
    }
}

export function notifyPhaseChange(phase: string) {
    if (globalPhaseCallback) {
        globalPhaseCallback(phase);
    }
}

// Build the graph
function buildGraph() {
    const workflow = new StateGraph(WebsiteStateAnnotation)
        // Add all nodes - use _step suffix to avoid collision with state attributes
        .addNode('blueprint_step', blueprintNode)
        .addNode('structure_step', structureNode)
        .addNode('core_step', coreNode)
        .addNode('components_step', componentNode)
        .addNode('pages_step', pageNode)
        .addNode('validation_step', validationNode)
        .addNode('repair_step', repairNode)

        // Define edges - linear flow
        .addEdge('__start__', 'blueprint_step')
        .addEdge('blueprint_step', 'structure_step')
        .addEdge('structure_step', 'core_step')
        .addEdge('core_step', 'components_step')
        .addEdge('components_step', 'pages_step')
        .addEdge('pages_step', 'validation_step')

        // Conditional edge from validation
        .addConditionalEdges('validation_step', (state: WebsiteState) => {
            // If no errors, we're done
            if (state.errors.length === 0) {
                console.log('\n✅ Validation passed! No errors.');
                return 'end';
            }

            // If max iterations reached, stop
            if (state.iterationCount >= 3) {
                console.log('\n⚠️ Max iterations reached, stopping.');
                return 'end';
            }

            // Otherwise, go to repair
            console.log(`\n🔄 ${state.errors.length} errors found, going to repair...`);
            return 'repair_step';
        }, {
            'repair_step': 'repair_step',
            'end': END
        })

        // After repair, go back to validation
        .addEdge('repair_step', 'validation_step');

    return workflow.compile();
}

// Export the compiled graph
export const websiteGraph = buildGraph();

// Main execution function
export async function generateWebsite(
    userPrompt: string,
    projectType: 'frontend' | 'backend' | 'fullstack' = 'frontend',
    onFileGenerated?: (file: GeneratedFile) => void,
    onPhaseChange?: (phase: string) => void
): Promise<{ files: Map<string, GeneratedFile>; errors: any[]; messages: string[] }> {
    console.log('\n🚀 ═══════════════════════════════════════════════════');
    console.log('🚀 STARTING LANGGRAPH WEBSITE GENERATOR');
    console.log('🚀 ═══════════════════════════════════════════════════\n');

    const startTime = Date.now();

    // Set up global callbacks for streaming
    setFileCallback(onFileGenerated || null);
    setPhaseCallback(onPhaseChange || null);

    try {
        // Initialize state
        const initialState = {
            userPrompt,
            projectType,
            blueprint: null,
            files: new Map(),
            fileRegistry: new Map(),
            errors: [],
            iterationCount: 0,
            currentPhase: 'init',
            isComplete: false,
            messages: []
        };

        // Run the graph
        const result = await websiteGraph.invoke(initialState);

        const duration = ((Date.now() - startTime) / 1000).toFixed(1);

        console.log('\n═══════════════════════════════════════════════════');
        console.log('📊 GENERATION COMPLETE');
        console.log('═══════════════════════════════════════════════════');
        console.log(`   Duration: ${duration}s`);
        console.log(`   Files: ${result.files.size}`);
        console.log(`   Errors: ${result.errors.length}`);
        console.log('═══════════════════════════════════════════════════\n');

        return {
            files: result.files,
            errors: result.errors,
            messages: result.messages
        };

    } catch (error: any) {
        console.error('\n❌ Generation failed:', error.message);
        throw error;
    } finally {
        // Clean up callbacks
        setFileCallback(null);
        setPhaseCallback(null);
    }
}

// Export for external use
export { WebsiteState, GeneratedFile };
