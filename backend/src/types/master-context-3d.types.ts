/**
 * Master 3D Context Types
 * Comprehensive type definitions for unified 3D website generation context
 */

// ============================================================
// BUSINESS & BRAND TYPES
// ============================================================

/**
 * Industry/niche analysis extracted from user prompt
 */
export interface BusinessDNA {
    industry: string;                    // e.g., "bakery", "tech-saas", "fitness"
    niche: string;                       // e.g., "artisan wedding cakes"
    targetAudience: string;              // e.g., "engaged couples, event planners"
    emotionalTone: string;               // e.g., "warm, celebratory, artisanal"
    businessGoal: string;                // e.g., "sell cakes, drive orders"
    visualMetaphor: string;              // e.g., "rising dough, sugar crystals"
    motionLanguage: string;              // e.g., "soft, flowing, meditative"
    brandVoice: 'premium' | 'playful' | 'authoritative' | 'warm' | 'technical' | 'elegant';
    energyLevel: 'calm' | 'moderate' | 'energetic' | 'intense';
    sceneArchetype: string;              // e.g., "EtherealGarden", "CosmicVoid", "CrystalCave"
}

/**
 * Brand identity generated for the project
 */
export interface BrandIdentity {
    name: string;                        // Company/project name
    tagline: string;                     // 5-7 word tagline
    logoDescription: string;             // Concept for logo visualization
    keyVisual: string;                   // Primary visual element description
    elevator: string;                    // One-sentence brand description
}

// ============================================================
// DESIGN SYSTEM TYPES
// ============================================================

/**
 * Complete design token system
 */
export interface DesignTokens {
    colors: {
        background: string;              // Dark world color (e.g., "#050508")
        backgroundDeep: string;          // Deeper background for sections
        surface: string;                 // Card/panel surface color
        primary: string;                 // Hero brand color
        secondary: string;               // Complementary color
        accent: string;                  // CTA/interaction color
        emissive: string;                // 3D glow/emission color
        fog: string;                     // Three.js fog color
        text: {
            primary: string;             // Main text (light on dark)
            secondary: string;           // Muted text
            accent: string;              // Highlighted text
            inverse: string;             // Dark text on light
        };
        glassmorphism: {
            background: string;          // e.g., "rgba(255,255,255,0.05)"
            border: string;              // e.g., "rgba(255,255,255,0.1)"
            blur: string;                // e.g., "20px"
        };
        gradients: {
            hero: string;                // Primary gradient
            cta: string;                 // Button gradient
            glow: string;                // Glow effect gradient
        };
    };
    typography: {
        headingFont: string;             // Google Font name for headings
        bodyFont: string;                // Google Font name for body
        accentFont?: string;             // Optional decorative font
        headingWeights: string[];        // e.g., ["600", "700", "800"]
        bodyWeights: string[];           // e.g., ["400", "500"]
        letterSpacing: {
            heading: string;             // e.g., "-0.02em"
            body: string;                // e.g., "0"
            wide: string;                // e.g., "0.1em" for labels
        };
        lineHeight: {
            heading: string;             // e.g., "1.1"
            body: string;                // e.g., "1.6"
        };
    };
    spacing: {
        sectionPadding: string;          // e.g., "py-24 md:py-32"
        containerMax: string;            // e.g., "max-w-7xl"
        cardGap: string;                 // e.g., "gap-6"
        elementSpacing: string;          // e.g., "space-y-4"
    };
    animation: {
        timing: string;                  // e.g., "cubic-bezier(0.4, 0, 0.2, 1)"
        duration: {
            instant: string;             // e.g., "0.1s"
            fast: string;                // e.g., "0.2s"
            normal: string;              // e.g., "0.4s"
            slow: string;                // e.g., "0.7s"
            glacial: string;             // e.g., "1.2s"
        };
        entrancePreset: string;          // e.g., "fade-up"
        hoverPreset: string;             // e.g., "glow-scale"
        scrollPreset: string;            // e.g., "parallax"
    };
    shadows: {
        glow: string;                    // e.g., "0 0 30px rgba(primary, 0.4)"
        card: string;                    // e.g., "0 4px 6px rgba(0,0,0,0.1)"
        text: string;                    // Text shadow for depth
    };
    borderRadius: {
        small: string;                   // e.g., "4px"
        medium: string;                  // e.g., "8px"
        large: string;                   // e.g., "16px"
        full: string;                    // e.g., "9999px"
    };
}

// ============================================================
// 3D SPECIFICATION TYPES
// ============================================================

/**
 * Specification for a single 3D object in a scene
 */
export interface ThreeDObjectSpec {
    id: string;                          // Unique identifier
    name: string;                        // React component name (e.g., "HeroCrystal")
    description: string;                 // What this object represents
    geometry: {
        type: string;                    // Three.js geometry (e.g., "icosahedronGeometry")
        args: (number | string)[];       // Constructor args (e.g., [2, 3])
        custom?: string;                 // Custom geometry code if needed
    };
    material: {
        type: string;                    // e.g., "meshPhysicalMaterial", "MeshDistortMaterial"
        properties: {
            color?: string;
            roughness?: number;
            metalness?: number;
            transmission?: number;
            thickness?: number;
            ior?: number;
            emissive?: string;
            emissiveIntensity?: number;
            envMapIntensity?: number;
            clearcoat?: number;
            clearcoatRoughness?: number;
            [key: string]: any;
        };
        textures?: {
            map?: string;
            normalMap?: string;
            roughnessMap?: string;
            metalnessMap?: string;
            envMap?: string;
        };
    };
    position: [number, number, number];
    rotation?: [number, number, number];
    scale?: [number, number, number] | number;
    animation?: {
        type: 'rotation' | 'float' | 'oscillate' | 'scroll-driven' | 'morph' | 'pulse' | 'custom';
        axis?: 'x' | 'y' | 'z';
        speed?: number;
        amplitude?: number;
        scrollMapping?: string;          // e.g., "offset * Math.PI * 2"
        customCode?: string;             // Custom useFrame code
    };
    interactions?: {
        hover?: {
            scale?: number;
            emissiveIntensity?: number;
            rotationSpeed?: number;
        };
        click?: string;                  // Description of click behavior
    };
    wrappers?: string[];                 // Drei wrappers (e.g., ["Float", "Trail"])
    wrapperProps?: Record<string, any>;  // Props for wrappers
    children?: ThreeDObjectSpec[];       // Nested objects
}

/**
 * Particle system specification
 */
export interface ParticleSpec {
    type: 'Sparkles' | 'Stars' | 'Points' | 'custom';
    count: number;
    color: string;
    size?: number;
    speed?: number;
    spread?: [number, number, number];
    opacity?: number;
    additionalProps?: Record<string, any>;
    customCode?: string;
}

/**
 * Lighting specification for a scene
 */
export interface LightingSpec {
    ambientIntensity: number;
    ambientColor?: string;
    lights: Array<{
        type: 'directional' | 'point' | 'spot' | 'hemisphere' | 'rect';
        position: [number, number, number];
        color: string;
        intensity: number;
        castShadow?: boolean;
        target?: [number, number, number];
        angle?: number;
        penumbra?: number;
        decay?: number;
        distance?: number;
    }>;
    environment?: {
        preset?: string;                 // drei Environment preset
        files?: string;                  // Custom HDR file
        intensity?: number;
        background?: boolean;
    };
}

/**
 * Post-processing configuration
 */
export interface PostProcessingSpec {
    enabled: boolean;
    bloom?: {
        intensity: number;
        luminanceThreshold: number;
        luminanceSmoothing: number;
        mipmapBlur?: boolean;
    };
    vignette?: {
        offset: number;
        darkness: number;
    };
    noise?: {
        opacity: number;
    };
    chromaticAberration?: {
        offset: [number, number];
    };
    depthOfField?: {
        focusDistance: number;
        focalLength: number;
        bokehScale: number;
    };
    toneMappingExposure?: number;
}

/**
 * Fog configuration
 */
export interface FogSpec {
    type: 'linear' | 'exponential';
    color: string;
    near?: number;
    far?: number;
    density?: number;
}

/**
 * Shader specification
 */
export interface ShaderSpec {
    name: string;                        // e.g., "AuroraWave"
    type: 'vertex' | 'fragment' | 'both';
    uniforms: Record<string, {
        value: any;
        type: string;                    // e.g., "float", "vec3", "sampler2D"
    }>;
    vertexShader?: string;               // GLSL code or template name
    fragmentShader?: string;             // GLSL code or template name
}

/**
 * Complete 3D scene blueprint
 */
export interface SceneBlueprint {
    id: string;                          // e.g., "hero-scene"
    name: string;                        // Component name (e.g., "HeroScene3D")
    fileName: string;                    // e.g., "HeroScene3D.tsx"
    description: string;                 // What this scene represents
    purpose: string;                     // User story: "As a visitor, I see..."
    wowFactor: string;                   // The ONE thing that makes this stunning

    // 3D Elements
    objects: ThreeDObjectSpec[];
    lighting: LightingSpec;
    fog?: FogSpec;
    particles?: ParticleSpec;
    shader?: ShaderSpec;

    // Canvas configuration
    canvas: {
        camera: {
            type: 'perspective' | 'orthographic';
            fov?: number;
            position: [number, number, number];
            near?: number;
            far?: number;
        };
        controls?: {
            type: 'orbit' | 'scroll' | 'none';
            enableZoom?: boolean;
            enablePan?: boolean;
            autoRotate?: boolean;
            autoRotateSpeed?: number;
            minPolarAngle?: number;
            maxPolarAngle?: number;
        };
        gl?: Record<string, any>;
        dpr?: [number, number];
        shadows?: boolean;
    };

    // Scroll behavior
    scrollBehavior?: {
        scrollPages?: number;            // How many scroll pages this scene spans
        damping?: number;
        cameraPath?: string;             // Description of camera movement
        objectTransitions?: string[];    // What objects do on scroll
    };

    // Post-processing for this scene
    postProcessing?: PostProcessingSpec;
}

// ============================================================
// UI/PAGE TYPES
// ============================================================

/**
 * HTML overlay content for a section
 */
export interface UIOverlaySpec {
    heading?: {
        text: string;
        tag: 'h1' | 'h2' | 'h3';
        className?: string;
    };
    subheading?: {
        text: string;
        className?: string;
    };
    body?: {
        text: string;
        className?: string;
    };
    cta?: {
        text: string;
        href: string;
        style: 'primary' | 'secondary' | 'ghost';
        icon?: string;
    };
    secondaryCta?: {
        text: string;
        href: string;
        style: 'primary' | 'secondary' | 'ghost';
    };
    features?: Array<{
        icon: string;
        title: string;
        description: string;
    }>;
    layout: 'centered' | 'left' | 'right' | 'split' | 'cards-grid' | 'full-width';
    glassmorphism: boolean;
    animation: {
        entrance: string;                // e.g., "fade-up stagger"
        delay?: number;
    };
    className?: string;
}

/**
 * Complete section blueprint (3D scene + UI overlay)
 */
export interface SectionBlueprint {
    id: string;                          // e.g., "hero"
    name: string;                        // e.g., "Hero Section"
    type: 'hero' | 'features' | 'showcase' | 'testimonials' | 'cta' | 'about' | 'contact' | 'custom';
    yOffset: number;                     // Position in scroll space
    scene: SceneBlueprint;
    uiOverlay: UIOverlaySpec;
    interactions: Array<{
        trigger: 'scroll' | 'hover' | 'click' | 'inView';
        target: '3d' | 'ui' | 'both';
        description: string;
    }>;
}

/**
 * Page blueprint
 */
export interface PageBlueprint {
    name: string;                        // e.g., "HomePage"
    fileName: string;                    // e.g., "HomePage.tsx"
    route: string;                       // e.g., "/"
    description: string;
    scrollPages: number;                 // Total ScrollControls pages
    sections: SectionBlueprint[];
    sceneComponents: string[];           // Which 3D components to import
    postProcessing: PostProcessingSpec;  // Global post-processing for this page
    metadata?: {
        title: string;
        description: string;
    };
}

// ============================================================
// RAG & DOCUMENTATION TYPES
// ============================================================

/**
 * Summarized documentation entry
 */
export interface DocSummary {
    name: string;
    summary: string;                     // Condensed for token efficiency
    codeSnippet?: string;
    fullContent?: string;                // Optional full content
}

/**
 * RAG documentation context
 */
export interface RAGContext {
    intentTags: string[];                // Classified tags (e.g., ["particles", "scroll_animation"])
    threejsDocs: DocSummary[];
    externalDocs: DocSummary[];
    totalTokenEstimate: number;
}

// ============================================================
// FILE STRUCTURE TYPES
// ============================================================

/**
 * File in the project structure
 */
export interface FileStructureEntry {
    path: string;                        // e.g., "src/components/3d/HeroScene3D.tsx"
    type: 'scene' | 'page' | 'overlay' | 'utility' | 'config' | 'layout' | 'component';
    description: string;
    exports: string[];
    imports: string[];
}

// ============================================================
// PERFORMANCE TYPES
// ============================================================

/**
 * Performance and mobile adaptation rules
 */
export interface PerformanceRules {
    canvas: {
        dpr: [number, number];
        gl: {
            antialias?: boolean;
            powerPreference?: 'default' | 'high-performance' | 'low-power';
            alpha?: boolean;
        };
        frameloop?: 'always' | 'demand' | 'never';
    };
    mobile: {
        reducedParticles: boolean;
        particleMultiplier: number;      // e.g., 0.3 for 30% of desktop
        simplifiedGeometry: boolean;
        geometrySegmentMultiplier: number;
        disabledEffects: string[];       // e.g., ["ChromaticAberration", "DepthOfField"]
        reducedShadows: boolean;
    };
    lazyLoading: {
        scenes: boolean;
        images: boolean;
        models: boolean;
    };
    optimizations: string[];             // List of optimization strategies
}

// ============================================================
// MASTER CONTEXT - THE UNIFIED TYPE
// ============================================================

/**
 * THE MASTER CONTEXT - Everything downstream nodes need
 */
export interface MasterContext3D {
    // Metadata
    version: string;                     // Schema version (e.g., "1.0.0")
    generatedAt: string;                 // ISO timestamp
    projectId: string;

    // Business & Brand
    businessDNA: BusinessDNA;
    brand: BrandIdentity;

    // Design System
    designTokens: DesignTokens;

    // 3D Technical Specifications
    scenes: SceneBlueprint[];

    // Page Blueprints
    pages: PageBlueprint[];

    // File Structure
    fileStructure: FileStructureEntry[];

    // RAG Documentation
    ragContext: RAGContext;

    // Performance
    performance: PerformanceRules;

    // Dependencies
    dependencies: Record<string, string>;

    // Raw prompt versions (for compatibility)
    userPrompt: string;
    expandedPrompt: string;
}

// ============================================================
// SERVICE RESPONSE TYPES
// ============================================================

export interface MasterContextResponse {
    success: boolean;
    data?: MasterContext3D;
    error?: string;
    warnings?: string[];
}
