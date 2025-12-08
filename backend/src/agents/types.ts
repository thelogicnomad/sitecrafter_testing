/**
 * Agent Type Definitions
 * Defines types for the multi-step agentic architecture
 */

// Agent phases in the pipeline
export type AgentPhase =
    | 'blueprint'
    | 'structure'
    | 'core'
    | 'component'
    | 'page'
    | 'verification'
    | 'repair';

// Generated file structure
export interface GeneratedFile {
    path: string;
    content: string;
    phase: AgentPhase;
    timestamp: number;
}

// Verification error types
export interface VerificationError {
    type: 'missing_import' | 'missing_package' | 'missing_file' | 'placeholder' | 'typescript_error' | 'incomplete';
    file: string;
    line?: number;
    message: string;
    severity: 'error' | 'warning';
    suggestedFix?: string;
}

// Blueprint structure from Phase 1
export interface ProjectBlueprint {
    projectName: string;
    projectType: 'frontend' | 'backend' | 'fullstack';
    description: string;
    features: FeatureSpec[];
    pages: PageSpec[];
    components: ComponentSpec[];
    designSystem: DesignSystemSpec;
    dependencies: string[];
}

export interface FeatureSpec {
    name: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    components: string[];
}

export interface PageSpec {
    name: string;
    route: string;
    description: string;
    sections: string[];
    components: string[];
}

export interface ComponentSpec {
    name: string;
    type: 'ui' | 'layout' | 'feature' | 'shared';
    props?: string[];
    dependencies: string[];
}

export interface DesignSystemSpec {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    style: string;
}

// Project state shared between agents
export interface ProjectState {
    // Input
    userPrompt: string;
    projectType: 'frontend' | 'backend' | 'fullstack';

    // Phase outputs
    blueprint: ProjectBlueprint | null;
    generatedFiles: Map<string, GeneratedFile>;

    // Tracking
    currentPhase: AgentPhase;
    phaseHistory: AgentPhase[];
    errors: VerificationError[];
    iterationCount: number;
    maxIterations: number;

    // Callbacks
    onFileGenerated?: (file: GeneratedFile) => void;
    onPhaseChange?: (phase: AgentPhase) => void;
    onError?: (error: VerificationError) => void;
    onComplete?: () => void;
}

// Agent result structure
export interface AgentResult {
    success: boolean;
    phase: AgentPhase;
    files: GeneratedFile[];
    errors: VerificationError[];
    nextPhase?: AgentPhase;
    message?: string;
}

// Rate limit configuration
export interface RateLimitConfig {
    requestsPerMinute: number;
    delayBetweenRequests: number; // ms
    apiKeys: string[];
    currentKeyIndex: number;
}

// Pipeline configuration
export interface PipelineConfig {
    maxIterations: number;
    enableVerification: boolean;
    enableRepair: boolean;
    streamingEnabled: boolean;
    rateLimitConfig: RateLimitConfig;
}
