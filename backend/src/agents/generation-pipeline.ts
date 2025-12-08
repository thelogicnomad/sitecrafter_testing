/**
 * Generation Pipeline
 * Orchestrates all agents in the correct order with verification loop
 */

import { ProjectStateManager } from './state-manager';
import { BlueprintAgent } from './blueprint-agent';
import { StructureAgent } from './structure-agent';
import { CoreAgent } from './core-agent';
import { ComponentAgent } from './component-agent';
import { PageAgent } from './page-agent';
import { VerificationAgent } from './verification-agent';
import { RepairAgent } from './repair-agent';
import { BaseAgent } from './base-agent';
import { AgentPhase, GeneratedFile, VerificationError, AgentResult } from './types';
import { EventEmitter } from 'events';

export interface PipelineEvents {
    file: (file: GeneratedFile) => void;
    phase: (phase: AgentPhase, message: string) => void;
    error: (error: VerificationError) => void;
    complete: (files: GeneratedFile[]) => void;
    progress: (current: number, total: number, message: string) => void;
}

export class GenerationPipeline extends EventEmitter {
    private stateManager: ProjectStateManager;
    private agents: Map<AgentPhase, BaseAgent>;

    constructor(
        userPrompt: string,
        projectType: 'frontend' | 'backend' | 'fullstack' = 'frontend',
        apiKeys: string[] = []
    ) {
        super();

        this.stateManager = new ProjectStateManager(userPrompt, projectType, apiKeys);

        // Set up callbacks
        this.stateManager.setCallbacks({
            onFileGenerated: (file) => this.emit('file', file),
            onPhaseChange: (phase) => this.emit('phase', phase, `Starting ${phase} phase`),
            onError: (error) => this.emit('error', error),
            onComplete: () => this.emit('complete', this.stateManager.getFiles())
        });

        // Prevent ERR_UNHANDLED_ERROR crash - add default error handler
        this.on('error', (error) => {
            console.log(`   ⚠️ Non-fatal error detected: ${error.message || JSON.stringify(error)}`);
        });

        // Initialize all agents
        this.agents = new Map<AgentPhase, BaseAgent>();
        this.agents.set('blueprint', new BlueprintAgent(this.stateManager));
        this.agents.set('structure', new StructureAgent(this.stateManager));
        this.agents.set('core', new CoreAgent(this.stateManager));
        this.agents.set('component', new ComponentAgent(this.stateManager));
        this.agents.set('page', new PageAgent(this.stateManager));
        this.agents.set('verification', new VerificationAgent(this.stateManager));
        this.agents.set('repair', new RepairAgent(this.stateManager));
    }

    async execute(): Promise<GeneratedFile[]> {
        console.log('\n🚀 ═══════════════════════════════════════════════════');
        console.log('🚀 STARTING MULTI-STEP GENERATION PIPELINE');
        console.log('🚀 ═══════════════════════════════════════════════════\n');

        const startTime = Date.now();
        let currentPhase: AgentPhase | undefined = 'blueprint';
        let phaseCount = 0;
        const maxPhases = 15; // Safety limit

        try {
            while (currentPhase && phaseCount < maxPhases) {
                phaseCount++;

                console.log(`\n[Pipeline] Phase ${phaseCount}: ${currentPhase.toUpperCase()}`);
                this.stateManager.setPhase(currentPhase);
                this.emit('progress', phaseCount, 7, `Running ${currentPhase} agent`);

                const agent = this.agents.get(currentPhase);
                if (!agent) {
                    console.error(`No agent for phase: ${currentPhase}`);
                    break;
                }

                const result: AgentResult = await agent.execute();

                if (!result.success && result.phase !== 'verification') {
                    console.error(`\n❌ Phase ${currentPhase} failed: ${result.message}`);
                    // Try to continue if possible
                    if (currentPhase === 'blueprint') {
                        throw new Error(`Blueprint generation failed: ${result.message}`);
                    }
                }

                // Determine next phase
                currentPhase = result.nextPhase as AgentPhase | undefined;

                // If no next phase or verification passed, we're done
                if (!currentPhase) {
                    console.log('\n✅ Pipeline completed successfully!');
                    break;
                }

                // Log progress
                console.log(`   → Next phase: ${currentPhase}`);
            }

            const endTime = Date.now();
            const duration = ((endTime - startTime) / 1000).toFixed(1);
            const files = this.stateManager.getFiles();

            console.log('\n═══════════════════════════════════════════════════');
            console.log('📊 PIPELINE COMPLETE');
            console.log('═══════════════════════════════════════════════════');
            console.log(`   Duration: ${duration}s`);
            console.log(`   Phases completed: ${phaseCount}`);
            console.log(`   Files generated: ${files.length}`);
            console.log(`   Errors remaining: ${this.stateManager.getState().errors.length}`);
            console.log('═══════════════════════════════════════════════════\n');

            this.emit('complete', files);
            return files;

        } catch (error: any) {
            console.error('\n💥 Pipeline failed:', error.message);
            throw error;
        }
    }

    // Get all generated files
    getFiles(): GeneratedFile[] {
        return this.stateManager.getFiles();
    }

    // Get current state for debugging
    getState() {
        return this.stateManager.getState();
    }

    // Convert files to chirAction XML for frontend
    toChirArtifactXml(): string {
        const files = this.stateManager.getFiles();
        const blueprint = this.stateManager.getState().blueprint;

        const fileActions = files.map(file =>
            `<chirAction type="file" filePath="${file.path}">\n${file.content}\n</chirAction>`
        ).join('\n\n');

        return `<chirArtifact id="generated-project" title="${blueprint?.projectName || 'Generated Project'}">
${fileActions}
</chirArtifact>`;
    }
}
