/**
 * generate-3d-component-node.ts
 *
 * Generates CINEMATIC, IMMERSIVE, FULLY INTERACTIVE 3D components.
 *
 * Design principles:
 *  - Zero hardcoded templates. Every component is shaped by Business DNA.
 *  - All R3F scene components return <> fragments, never <Canvas>.
 *  - HTML overlays (nav / footer / loader) are pure React + Tailwind.
 *  - Every scene implements: scroll narrative, mouse parallax, hover interaction.
 *  - Quality gate catches only runtime / type CRASH bugs - not style issues.
 */

import fs from 'fs';
import path from 'path';
import { WebsiteState, GeneratedFile, createRegistryEntry } from '../graph-state';
import { invokeLLM, parseChirActions, extractExports, extractImports } from '../llm-utils';
import { getMemoryContext, updateMemory3D } from '../project-memory';
import { threeDPromptContext } from '../../../prompts/3dpromptcontext';
import { notifyFileCreated, notifyPhaseChange } from '../website-graph';
import { MasterContext3DService } from '../../../services/master-context-3d.service';
import { MasterContext3D, SceneBlueprint, BusinessDNA as MasterBusinessDNA } from '../../../types/master-context-3d.types';
import OpenAI from 'openai';

const THREEJS_REF_PATH = path.resolve(process.cwd(), '3dt-threejs.txt');
let _cachedThreeJSRef: string | null = null;

function loadThreeJSReference(): string {
    if (_cachedThreeJSRef) return _cachedThreeJSRef;
    try {
        const raw = fs.readFileSync(THREEJS_REF_PATH, 'utf-8');
        const lines = raw.split('\n');
        const usefulLines = lines.slice(0, 1900);
        _cachedThreeJSRef = usefulLines.join('\n');
        console.log(`[3D-Ref] Loaded 3dt-threejs.txt (${_cachedThreeJSRef.length} chars, ${usefulLines.length} lines)`);
    } catch (err) {
        console.warn(`[3D-Ref] Could not load 3dt-threejs.txt: ${err}`);
        _cachedThreeJSRef = '';
    }
    return _cachedThreeJSRef;
}

// ─── API Key Pool ────────────────────────────────────────────────────────────

const API_KEYS = [
    process.env.gemini13, process.env.gemini12, process.env.gemini8,
    process.env.gemini9, process.env.gemini10, process.env.gemini11,
    process.env.gemini, process.env.gemini3, process.env.gemini4,
    process.env.gemini7, process.env.gemini6, process.env.gemini5,
    process.env.gemini2,
].filter((k): k is string => !!k && k.length > 0);

let _keyIdx = Math.floor(Math.random() * Math.max(API_KEYS.length, 1));

function getClient(): OpenAI {
    return new OpenAI({
        apiKey: API_KEYS[_keyIdx % Math.max(API_KEYS.length, 1)] || process.env.gemini2,
        baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
    });
}

function rotateKey(): void {
    if (API_KEYS.length > 1) _keyIdx = (_keyIdx + 1) % API_KEYS.length;
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface BusinessDNA {
    businessName: string;
    industry: string;
    energyLevel: 'calm' | 'dynamic' | 'explosive';
    visualArchetype: string;   // e.g. "CosmicNebula", "LiquidMetal", "BioluminescentForest"
    colorStory: { background: string; primary: string; secondary: string; accent: string; emissive: string; fog: string };
    motionLanguage: string;   // e.g. "fluid", "snappy", "organic", "mechanical"
    shaderStyle: 'aurora' | 'hologram' | 'plasma' | 'deepspace' | 'liquidmetal' | 'custom';
    particlePersona: string;   // e.g. "nebula", "data-stream", "firefly", "stardust"
    emotionalJourney: string;   // One sentence: emotional arc for visitor
    uniqueGeometry: string;   // Signature geometry idea specific to this business
    interactionStyle: string;   // How objects should respond to mouse/hover/click
}

interface SectionSpec {
    name: string;
    path: string;
    sectionType: string;  // hero | features | showcase | process | testimonials | cta | about | contact | ambient
    componentKind: 'scene' | 'overlay';  // scene = R3F fragment, overlay = pure HTML
    overlayRole?: 'navbar' | 'footer' | 'loader';
    narrative: string;  // 3-4 sentences on what this scene tells the visitor
    visualConcept: string;  // Geometry, material, shader ideas
    interactiveHooks: string;  // What responds to scroll/hover/click
    colorMood: string;  // Color temperature and mood for this section
    scrollBehavior: string;  // How scroll offset drives the scene
}

// ─── Master Context Conversion Helpers ──────────────────────────────────────

/**
 * Converts MasterContext3D BusinessDNA to local BusinessDNA interface
 */
function convertMasterBusinessDNA(masterDNA: MasterBusinessDNA, designTokens: MasterContext3D['designTokens']): BusinessDNA {
    return {
        businessName: masterDNA.niche || masterDNA.industry,
        industry: masterDNA.industry,
        energyLevel: masterDNA.energyLevel === 'intense' ? 'explosive' : masterDNA.energyLevel === 'moderate' ? 'dynamic' : 'calm',
        visualArchetype: masterDNA.sceneArchetype,
        colorStory: {
            background: designTokens.colors.background,
            primary: designTokens.colors.primary,
            secondary: designTokens.colors.secondary,
            accent: designTokens.colors.accent,
            emissive: designTokens.colors.emissive,
            fog: designTokens.colors.fog,
        },
        motionLanguage: masterDNA.motionLanguage.split(',')[0].trim() || 'fluid',
        shaderStyle: (['aurora', 'hologram', 'plasma', 'deepspace', 'liquidmetal'].includes(masterDNA.sceneArchetype?.toLowerCase() || '')
            ? masterDNA.sceneArchetype?.toLowerCase()
            : 'aurora') as BusinessDNA['shaderStyle'],
        particlePersona: masterDNA.visualMetaphor || 'glowing particles drifting in void',
        emotionalJourney: masterDNA.emotionalTone || 'From curiosity to wonder to conviction.',
        uniqueGeometry: masterDNA.visualMetaphor || 'Procedural geometry driven by brand DNA',
        interactionStyle: 'hover causes emissive pulse and scale',
    };
}

/**
 * Converts MasterContext3D SceneBlueprints to local SectionSpec array
 */
function convertMasterScenesToSpecs(masterContext: MasterContext3D): SectionSpec[] {
    const specs: SectionSpec[] = [];

    // Add mandatory overlay components first
    specs.push({
        name: 'LoadingScreen3D',
        path: 'src/components/3d/LoadingScreen3D.tsx',
        sectionType: 'loading',
        componentKind: 'overlay',
        overlayRole: 'loader',
        narrative: `Premium loading experience showcasing ${masterContext.brand.name}`,
        visualConcept: 'Progress bar with brand animation',
        interactiveHooks: 'Progress tracking with drei useProgress',
        colorMood: `Brand colors: ${masterContext.designTokens.colors.primary}`,
        scrollBehavior: 'N/A - overlay',
    });

    specs.push({
        name: 'NavBar3D',
        path: 'src/components/3d/NavBar3D.tsx',
        sectionType: 'navbar',
        componentKind: 'overlay',
        overlayRole: 'navbar',
        narrative: `Navigation for ${masterContext.brand.name}`,
        visualConcept: 'Glassmorphism navigation with brand identity',
        interactiveHooks: 'Scroll-aware transparency, mobile menu',
        colorMood: `Brand colors with accent ${masterContext.designTokens.colors.accent}`,
        scrollBehavior: 'N/A - overlay',
    });

    specs.push({
        name: 'Footer3D',
        path: 'src/components/3d/Footer3D.tsx',
        sectionType: 'footer',
        componentKind: 'overlay',
        overlayRole: 'footer',
        narrative: `Footer for ${masterContext.brand.name}`,
        visualConcept: 'Premium footer with brand elements',
        interactiveHooks: 'Animated entrance on view',
        colorMood: `Dark background with accent ${masterContext.designTokens.colors.accent}`,
        scrollBehavior: 'N/A - overlay',
    });

    // Convert scene blueprints to section specs
    for (const scene of masterContext.scenes) {
        const spec: SectionSpec = {
            name: scene.name,
            path: `src/components/3d/${scene.fileName}`,
            sectionType: inferSectionType(scene),
            componentKind: 'scene',
            narrative: `${scene.description}\n\nPurpose: ${scene.purpose}`,
            visualConcept: buildVisualConcept(scene),
            interactiveHooks: buildInteractiveHooks(scene),
            colorMood: `Background: ${masterContext.designTokens.colors.background}, Emissive: ${masterContext.designTokens.colors.emissive}, Fog: ${masterContext.designTokens.colors.fog}`,
            scrollBehavior: scene.scrollBehavior?.objectTransitions?.join('; ') || 'Objects transform with scroll offset',
        };
        specs.push(spec);
    }

    return specs;
}

/**
 * Infer section type from scene blueprint
 */
function inferSectionType(scene: SceneBlueprint): string {
    const name = scene.name.toLowerCase();
    const id = scene.id.toLowerCase();

    if (name.includes('hero') || id.includes('hero')) return 'hero';
    if (name.includes('feature') || id.includes('feature')) return 'features';
    if (name.includes('showcase') || name.includes('product') || name.includes('gallery')) return 'showcase';
    if (name.includes('testimonial') || name.includes('review')) return 'testimonials';
    if (name.includes('about') || name.includes('team')) return 'about';
    if (name.includes('contact')) return 'contact';
    if (name.includes('cta') || name.includes('call')) return 'cta';
    if (name.includes('ambient') || name.includes('background')) return 'ambient';
    return 'features';
}

/**
 * Build visual concept string from scene objects
 */
function buildVisualConcept(scene: SceneBlueprint): string {
    const concepts: string[] = [];

    // Describe objects
    if (scene.objects.length > 0) {
        concepts.push(`Objects: ${scene.objects.map(o => `${o.name} (${o.geometry.type}, ${o.material.type})`).join(', ')}`);
    }

    // Describe lighting
    concepts.push(`Lighting: ambient(${scene.lighting.ambientIntensity}) + ${scene.lighting.lights.map(l => l.type).join(', ')}`);

    // Describe particles
    if (scene.particles) {
        concepts.push(`Particles: ${scene.particles.type} (${scene.particles.count} count)`);
    }

    // Describe shader
    if (scene.shader) {
        concepts.push(`Custom shader: ${scene.shader.name}`);
    }

    // Wow factor
    concepts.push(`WOW FACTOR: ${scene.wowFactor}`);

    return concepts.join('\n');
}

/**
 * Build interactive hooks description from scene
 */
function buildInteractiveHooks(scene: SceneBlueprint): string {
    const hooks: string[] = [];

    for (const obj of scene.objects) {
        if (obj.animation) {
            hooks.push(`${obj.name}: ${obj.animation.type} animation`);
        }
        if (obj.interactions?.hover) {
            hooks.push(`${obj.name}: hover → scale(${obj.interactions.hover.scale}), emissive(${obj.interactions.hover.emissiveIntensity})`);
        }
        if (obj.interactions?.click) {
            hooks.push(`${obj.name}: click → ${obj.interactions.click}`);
        }
    }

    if (scene.scrollBehavior) {
        hooks.push(`Scroll: ${scene.scrollBehavior.cameraPath || 'camera movement with offset'}`);
    }

    if (scene.canvas.controls?.type === 'orbit') {
        hooks.push('OrbitControls for camera manipulation');
    }

    return hooks.length > 0 ? hooks.join('\n') : 'Scroll-driven transformations, hover interactions, mouse parallax';
}

// ─── Step 1: Extract Business DNA ────────────────────────────────────────────

async function extractBusinessDNA(
    userPrompt: string,
    blueprint: WebsiteState['blueprint'],
    theme: WebsiteState['dynamicTheme'],
): Promise<BusinessDNA> {
    const prompt = `You are a world-class creative director for Awwwards-winning 3D web experiences.
Analyze this business deeply and extract its complete visual DNA.

BUSINESS: "${userPrompt}"
DESCRIPTION: ${blueprint?.description || ''}
PAGES: ${blueprint?.pages?.map(p => p.name).join(', ') || ''}
THEME PALETTE: primary=${theme?.palette?.primary || 'unknown'}, accent=${theme?.palette?.accent || 'unknown'}

Extract a visual identity that is UNIQUE and UNMISTAKABLY this business.
Think Bruno Simon, Active Theory, Resn.co.nz — not generic templates.

Return ONLY valid JSON:
{
  "businessName": "exact brand name",
  "industry": "specific industry (e.g. 'artisan bakery', 'cybersecurity SaaS', 'luxury watch brand')",
  "energyLevel": "calm|dynamic|explosive",
  "visualArchetype": "one evocative name like CosmicNebula|LiquidMetal|BioluminescentForest|CrystallineVault|DigitalMatrix|FloatingIslands|AuroraBorealis|MoltenGlass|NeonMetropolis|OrganicGrowth — invent one if none fit",
  "colorStory": {
    "background": "#hex — very dark, richly tinted near-black",
    "primary": "#hex — vibrant brand color with emotion",
    "secondary": "#hex — complementary",
    "accent": "#hex — high energy CTA color",
    "emissive": "#hex — 3D glow color (more saturated than primary)",
    "fog": "#hex — matches background, for Three.js fog"
  },
  "motionLanguage": "fluid|snappy|organic|mechanical|ethereal — pick one word",
  "shaderStyle": "aurora|hologram|plasma|deepspace|liquidmetal|custom",
  "particlePersona": "describe in 3-5 words what the particles feel like (e.g. 'glowing amber embers', 'cold data packets', 'pollen drifting in sun')",
  "emotionalJourney": "One sentence: what should the visitor FEEL moving from hero to CTA?",
  "uniqueGeometry": "One striking geometry idea unique to this business (e.g. 'stacked croissant torus rings' for a bakery, 'crystalline DNA helix' for biotech)",
  "interactionStyle": "How 3D objects respond to mouse/hover: e.g. 'objects lean toward cursor with magnetic pull', 'hover causes emissive pulse wave', 'click shatters object into particles'"
}`;

    for (let i = 0; i < 3; i++) {
        try {
            rotateKey();
            const res = await getClient().chat.completions.create({
                model: 'gemini-2.5-flash-lite',
                messages: [
                    { role: 'system', content: 'You are a creative director. Return ONLY valid JSON. Zero markdown.' },
                    { role: 'user', content: prompt },
                ],
                temperature: 0.4,
            });
            const raw = res.choices[0].message.content || '{}';
            const match = raw.match(/\{[\s\S]*\}/);
            if (match) return JSON.parse(match[0]) as BusinessDNA;
        } catch (e: any) {
            console.warn(`[DNA] attempt ${i + 1} failed: ${e.message?.slice(0, 60)}`);
            rotateKey();
        }
    }

    // Graceful fallback so pipeline never halts
    const primary = theme?.palette?.primary || '#6366f1';
    const accent = theme?.palette?.accent || '#22d3ee';
    return {
        businessName: blueprint?.projectName || 'Brand',
        industry: 'creative agency',
        energyLevel: 'dynamic',
        visualArchetype: 'CosmicNebula',
        colorStory: { background: '#050508', primary, secondary: theme?.palette?.secondary || '#818cf8', accent, emissive: primary, fog: '#020205' },
        motionLanguage: 'fluid',
        shaderStyle: 'aurora',
        particlePersona: 'glowing particles drifting in void',
        emotionalJourney: 'From curiosity to wonder to conviction.',
        uniqueGeometry: 'Icosahedron with custom distort shader',
        interactionStyle: 'hover causes emissive pulse and scale',
    };
}

// ─── Step 2: Build Section Specs ─────────────────────────────────────────────

async function buildSectionSpecs(
    userPrompt: string,
    blueprint: WebsiteState['blueprint'],
    dna: BusinessDNA,
): Promise<SectionSpec[]> {
    const pages = blueprint?.pages || [];
    const allSections = pages.flatMap(p => p.sections || []);

    const prompt = `You are an Awwwards-winning 3D web experience designer.

BUSINESS: "${userPrompt}"
BRAND DNA: ${JSON.stringify(dna, null, 2)}
PAGES: ${pages.map(p => p.name).join(', ')}
SECTIONS NEEDED: ${allSections.join(', ')}

Design a set of 3D scene components + HTML overlay components for this EXACT business.
Every component must feel UNMISTAKABLY unique to this brand — not generic.

MANDATORY OVERLAY COMPONENTS (always include exactly these three):
1. LoadingScreen3D  — sectionType: "loading",  componentKind: "overlay", overlayRole: "loader"
2. NavBar3D         — sectionType: "navbar",    componentKind: "overlay", overlayRole: "navbar"
3. Footer3D         — sectionType: "footer",    componentKind: "overlay", overlayRole: "footer"

THEN add 5-7 SCENE COMPONENTS that match the pages/sections above.
Classify sectionType as one of: hero | features | showcase | process | testimonials | cta | about | contact | ambient

For each SCENE component, think:
- What 3D geometry metaphor fits this exact business section?
- How does scroll tell an emotional story here?
- What makes a visitor hover, click, lean forward?

Return ONLY a JSON array:
[
  {
    "name": "UniqueNameScene3D",
    "path": "src/components/3d/UniqueNameScene3D.tsx",
    "sectionType": "hero",
    "componentKind": "scene",
    "narrative": "3-4 sentences on the emotional story this scene tells",
    "visualConcept": "specific geometry + material + shader idea grounded in this business",
    "interactiveHooks": "exact scroll/hover/click behaviors",
    "colorMood": "color temperature and lighting mood",
    "scrollBehavior": "how scroll.offset 0→1 transforms this scene"
  }
]`;

    for (let i = 0; i < 3; i++) {
        try {
            rotateKey();
            const res = await getClient().chat.completions.create({
                model: 'gemini-2.5-flash-lite',
                messages: [
                    { role: 'system', content: 'You are a 3D creative director. Return ONLY a JSON array. Zero markdown.' },
                    { role: 'user', content: prompt },
                ],
                temperature: 0.9,
            });
            const raw = res.choices[0].message.content || '[]';
            const match = raw.match(/\[[\s\S]*\]/);
            if (match) {
                const specs = JSON.parse(match[0]) as SectionSpec[];
                console.log(`[3D-Specs] Generated ${specs.length} section specs`);
                return specs;
            }
        } catch (e: any) {
            console.warn(`[3D-Specs] attempt ${i + 1} failed: ${e.message?.slice(0, 60)}`);
            rotateKey();
        }
    }

    throw new Error('[3D-Specs] Failed after 3 attempts');
}

// ─── Step 3: System Prompts ───────────────────────────────────────────────────

/**
 * Core system prompt for R3F scene components.
 * DNA-driven — no per-section hardcoding.
 */
function buildSceneSystemPrompt(dna: BusinessDNA): string {
    const threeRef = loadThreeJSReference();

    return `You are the world's greatest 3D web developer.
Your sites win Awwwards Site of the Year. You think like Bruno Simon, Aristide Benoist, and Active Theory.
You write COMPLETE code -- no TODOs, no placeholders, no abbreviated sections.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BUSINESS DNA (obey every line)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Industry:         ${dna.industry}
Visual archetype: ${dna.visualArchetype}
Energy:           ${dna.energyLevel}
Motion language:  ${dna.motionLanguage}
Shader style:     ${dna.shaderStyle}
Particle persona: ${dna.particlePersona}
Emotional arc:    ${dna.emotionalJourney}
Unique geometry:  ${dna.uniqueGeometry}
Interaction:      ${dna.interactionStyle}
Colors:
  background: ${dna.colorStory.background}
  primary:    ${dna.colorStory.primary}
  secondary:  ${dna.colorStory.secondary}
  accent:     ${dna.colorStory.accent}
  emissive:   ${dna.colorStory.emissive}
  fog:        ${dna.colorStory.fog}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCENE COMPONENT RULES (non-negotiable)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ARCHITECTURE:
- Returns a React Fragment <>...</>, NEVER <Canvas> or <div>
- ONLY R3F elements: mesh, group, lights, Float, Sparkles, shaderMaterial, points, fog, etc.
- NO Canvas, NO div, NO Html, NO ScrollControls, NO EffectComposer, NO Suspense, NO Text, NO Text3D
- Export BOTH named AND default: export const X = ...; export default X;

MINIMUM QUALITY STANDARDS (every component MUST meet ALL):
1. At least 250 lines of real TypeScript/JSX code
2. At least 3 distinct geometry types -- never repeat the same geometry twice
3. At least 3 useFrame loops each with a different purpose
4. At least 1 custom shaderMaterial with vertexShader + fragmentShader strings and a uTime uniform animated in useFrame
5. At least 1 scroll-reactive section using useScroll() from @react-three/drei
6. At least 1 mouse-reactive section using useThree().pointer
7. At least 3 light sources (ambientLight + 2 others)
8. Foreground layer (z=2..5), midground (z=-1..1), background (z=-5..-10)
9. All animations use THREE.MathUtils.lerp -- no sudden jumps
10. Interface defined for any props; no implicit any

INTERACTIVITY (mandatory -- this is what makes sites win awards):
- Mouse parallax: objects subtly shift toward pointer using useThree().pointer + lerp
- Hover: onPointerOver raises emissiveIntensity, scales up; onPointerOut reverses
- Scroll: map useScroll().offset to at minimum 3 visual properties (rotation, opacity, emissive, fog density, particle count, position, scale, etc.)
- 3-ACT SCROLL NARRATIVE:
    Act 1 (offset 0.0-0.33): dark, sparse, curious -- establish the world
    Act 2 (offset 0.33-0.66): objects coalesce, light intensifies, reveal -- create wonder
    Act 3 (offset 0.66-1.0): energy peak, everything alive, vibrant -- inspire action

CINEMATIC CAMERA (for hero/full-page scenes):
- CatmullRomCurve3 with >=6 control points
- camera.position.lerp to curve.getPoint(scroll.offset) in useFrame
- camera.lookAt(0, 0, 0)

PARTICLE SYSTEM (for hero and feature scenes):
- BufferGeometry with 2000-5000 particles
- Morph between 2-3 shapes tied to scroll offset using lerp
- pointsMaterial or custom shader -- NOT Sparkles for this

CUSTOM GLSL SHADER (required in EVERY scene):
Choose the style matching this business's dna.shaderStyle.
Shader must include uTime uniform animated each frame.
At minimum: a background plane using the shader + one mesh using it.
Use fresnel effects, noise distortion, vertex displacement, or procedural patterns.

PREMIUM DREI HELPERS (use these for visual richness):
- Float: gentle levitation for objects (speed, rotationIntensity, floatIntensity)
- MeshDistortMaterial: organic blob distortion (distort, speed, roughness, metalness)
- MeshWobbleMaterial: wobbling surfaces (factor, speed)
- MeshReflectorMaterial: reflective floor/ground planes (blur, resolution, mixBlur, mirror)
- Cloud: volumetric cloud groups (opacity, speed, segments)
- Sparkles: ambient floating sparkles (count, size, speed, color, scale)
- Stars: starfield background (radius, depth, count, factor, saturation)
- Trail: motion trails behind moving objects (width, length, color, attenuation)
- ContactShadows: soft contact shadows under objects (opacity, blur, far, resolution)
- Environment: IBL lighting presets (preset: apartment|city|dawn|forest|lobby|night|park|studio|sunset|warehouse)
- Lightformer: custom shaped lights inside Environment (intensity, color, form: ring|rect|circle)
- Sky: procedural sky with sun (distance, sunPosition, inclination, azimuth)
- useScroll: scroll offset for scroll-driven animations
- Billboard: auto-face camera
- GradientTexture: procedural gradient for materials

MATERIAL CASING (critical):
LOWERCASE = Three.js intrinsics: meshPhysicalMaterial, meshStandardMaterial, shaderMaterial, pointsMaterial
CAPITALIZED = drei imports: MeshDistortMaterial, MeshWobbleMaterial, Float, Sparkles, Stars

ABSOLUTE BANS (any violation = regenerate):
- Text, Text3D (no font files)
- MeshTransmissionMaterial (GPU crash)
- useGLTF, useTexture (no assets)
- lucide-react
- @/components/ui/*
- setState inside useFrame
- Float nested inside Float
- EffectComposer inside scene fragment
- disableNormalPass on EffectComposer

OUTPUT FORMAT:
<chirAction type="file" filePath="PATH">
// complete code -- 250+ lines minimum
</chirAction>

ONE chirAction. ONE file. No markdown. No explanation.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
THREE.JS / TSL COMPLETE REFERENCE (use for correct API usage)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${threeRef}`;
}

/**
 * System prompt for pure-HTML overlay components (NavBar, Footer, Loader).
 */
function buildOverlaySystemPrompt(dna: BusinessDNA, role: 'navbar' | 'footer' | 'loader'): string {
    const roleRules: Record<string, string> = {
        navbar: `
NAVBAR RULES:
- <nav> fixed top-0 left-0 right-0 z-50
- Glassmorphism: backdrop-blur-xl bg-black/20 border-b border-white/10
- Brand: <Link to="/"> with brand name, tracking-[0.3em] uppercase font-black
- Desktop links: <Link to="..."> with hover transition
- Mobile hamburger: 3 <span> divs morphing to X via CSS rotate/translate transforms — NO lucide-react
- Mobile menu: framer-motion AnimatePresence slide-down
- NEVER use <a href> — always <Link to>
- Scroll handler: add/remove backdrop at scroll > 50`,

        footer: `
FOOTER RULES:
- <footer> bg-black py-24 border-t border-white/5
- TOP ACCENT LINE: <div className="h-px w-full bg-gradient-to-r from-transparent via-[ACCENT] to-transparent mb-16" />
- 4-column grid: Brand+tagline | Quick Links | Info | Social
- Social icons: FULL inline SVG <path> data for X/Twitter, GitHub, LinkedIn, Instagram — never an icon library
- 2 decorative blur orbs: position absolute rounded-full blur-[200px] opacity-5
- Copyright: text-[10px] tracking-[0.4em] uppercase text-white/20 mt-12
- framer-motion whileInView entrance`,

        loader: `
LOADER RULES:
- STANDALONE OVERLAY — signature: const LoadingScreen3D: React.FC = () => {...}
- NO children prop. NO wrapping page content. Floats above everything.
- Full-screen fixed: position fixed inset-0 z-[9999] bg-black
- import { useProgress } from '@react-three/drei' — ONLY allowed drei import
- NO useFrame, NO Canvas, NO @react-three/fiber
- Track progress → animate progress bar (width = progress%) + fade out when >= 100
- framer-motion AnimatePresence for exit animation
- Show brand name prominently with animation`,
    };

    return `You are an expert React/TypeScript developer building a PREMIUM HTML component for a 3D website.

BRAND DNA:
  Business:   ${dna.businessName}
  Industry:   ${dna.industry}
  Archetype:  ${dna.visualArchetype}
  Colors:     primary=${dna.colorStory.primary}, accent=${dna.colorStory.accent}, bg=${dna.colorStory.background}
  Energy:     ${dna.energyLevel}

THIS IS A ${role.toUpperCase()} COMPONENT — ZERO 3D CODE.

ALLOWED IMPORTS:
  import React, { useState, useEffect, useRef } from 'react';
  import { motion, AnimatePresence } from 'framer-motion';
  import { Link, useNavigate } from 'react-router-dom';
${role === 'loader' ? "  import { useProgress } from '@react-three/drei';" : ''}

BANNED IMPORTS (any violation = invalid):
  @react-three/fiber, @react-three/drei (except useProgress for loader), three, Canvas, useFrame
  lucide-react, @/components/ui/*, any icon library

${roleRules[role]}

DESIGN QUALITY:
- Match the brand's ${dna.energyLevel} energy and ${dna.visualArchetype} archetype in styling choices
- Premium feel — Apple/Stripe/Resn quality
- Every interactive element has a satisfying hover/focus state
- Consistent with brand colors above

OUTPUT FORMAT:
<chirAction type="file" filePath="PATH">
// complete production-ready code — minimum 80 lines
</chirAction>

ONE chirAction. ONE file. No markdown.`;
}

// ─── Step 4: Build user-turn prompt for each component ───────────────────────

function buildSceneUserPrompt(
    spec: SectionSpec,
    dna: BusinessDNA,
    blueprint: WebsiteState['blueprint'],
    theme: WebsiteState['dynamicTheme'],
    ragContext: string,
    staticRef: string,
): string {
    return [
        `GENERATE ONE FILE: ${spec.path}`,
        `ONE <chirAction> tag. ONE file. Nothing else.`,
        '',
        `═══ COMPONENT BRIEF ═══`,
        `Name:         ${spec.name}`,
        `Section type: ${spec.sectionType}`,
        `File:         ${spec.path}`,
        '',
        `═══ BUSINESS CONTEXT ═══`,
        `Business: ${blueprint?.projectName || dna.businessName} — ${blueprint?.description || ''}`,
        '',
        `═══ SCENE NARRATIVE ═══`,
        spec.narrative,
        '',
        `═══ VISUAL CONCEPT ═══`,
        spec.visualConcept,
        '',
        `═══ INTERACTION DESIGN ═══`,
        spec.interactiveHooks,
        '',
        `═══ COLOR MOOD ═══`,
        spec.colorMood,
        `Brand colors: primary=${dna.colorStory.primary} | accent=${dna.colorStory.accent} | emissive=${dna.colorStory.emissive} | bg=${dna.colorStory.background} | fog=${dna.colorStory.fog}`,
        '',
        `═══ SCROLL BEHAVIOR ═══`,
        spec.scrollBehavior,
        '',
        `═══ DESIGN THEME ═══`,
        theme ? [
            `Palette: "${theme.palette.name}"`,
            `  Primary: ${theme.palette.primary}`,
            `  Secondary: ${theme.palette.secondary}`,
            `  Accent: ${theme.palette.accent}`,
            `  Animation style: ${theme.animation.name}`,
        ].join('\n') : '',
        '',
        ragContext ? `═══ LIVE THREE.JS / DREI DOCUMENTATION ═══\n${ragContext}` : '',
        staticRef && !ragContext ? `═══ THREE.JS REFERENCE ═══\n${staticRef}` : '',
        '',
        `Make this scene UNMISTAKABLY about "${dna.industry}".`,
        `Visual archetype: ${dna.visualArchetype}.`,
        `Signature geometry: ${dna.uniqueGeometry}.`,
        `Particle persona: ${dna.particlePersona}.`,
        `User interaction: ${dna.interactionStyle}.`,
        `Emotional arc: ${dna.emotionalJourney}`,
        '',
        `Write a COMPLETE MURAL (200+ lines), not a thumbnail.`,
        `Every geometry, material, color choice must serve the brand DNA above.`,
    ].filter(line => line !== undefined).join('\n');
}

function buildOverlayUserPrompt(
    spec: SectionSpec,
    dna: BusinessDNA,
    blueprint: WebsiteState['blueprint'],
    theme: WebsiteState['dynamicTheme'],
): string {
    const role = spec.overlayRole!;
    const projectName = blueprint?.projectName || dna.businessName;
    const tagline = blueprint?.description ? blueprint.description.split('.')[0].trim() : `${dna.industry} — ${dna.emotionalJourney}`;
    const navLinks = (blueprint?.pages || [])
        .filter(p => p.name && p.route)
        .map(p => `{ label: "${p.name.replace(/Page$/, '')}", route: "${p.route}" }`)
        .join(', ')
        || '{ label: "Home", route: "/" }, { label: "About", route: "/about" }, { label: "Contact", route: "/contact" }';

    const accentHex = theme?.palette?.accent || dna.colorStory.accent;
    const primaryHex = theme?.palette?.primary || dna.colorStory.primary;

    const roleData: Record<string, string[]> = {
        navbar: [
            `Build a premium NavBar3D for this exact brand.`,
            ``,
            `BRAND NAME (copy exactly): "${projectName}"`,
            `NAV LINKS (use these exact routes):`,
            `  ${navLinks}`,
            `PRIMARY: ${primaryHex}`,
            `ACCENT: ${accentHex}`,
            `ENERGY: ${dna.energyLevel} — styling should feel ${dna.energyLevel}`,
            `ARCHETYPE: ${dna.visualArchetype} — use this to inspire the nav aesthetic`,
            ``,
            `Requirements:`,
            `- Brand wrapped in <Link to="/">`,
            `- Each nav link is <Link to={route}>`,
            `- Mobile menu with framer-motion AnimatePresence`,
            `- Scroll-aware: add backdrop/opacity change after 50px scroll`,
            `- Hover: colored underline slide from left using CSS scaleX transform`,
            `- Be VISUALLY DISTINCTIVE — not a generic glassmorphism bar`,
        ],
        footer: [
            `Build a cinematic Footer3D for this exact brand.`,
            ``,
            `BRAND NAME (copy exactly): "${projectName}"`,
            `TAGLINE (copy exactly): "${tagline}"`,
            `NAV LINKS (quick-links, use these exact routes):`,
            `  ${navLinks}`,
            `ACCENT: ${accentHex} — use for gradient accent line and hover states`,
            `COPYRIGHT: "© ${new Date().getFullYear()} ${projectName}. All rights reserved."`,
            ``,
            `Requirements:`,
            `- Social icons: write FULL inline SVG path data for X/Twitter, GitHub, LinkedIn, Instagram`,
            `- Premium top accent gradient line using accent color`,
            `- 2 large decorative blur orbs (position absolute, opacity-5)`,
            `- framer-motion whileInView entrance`,
            `- dark bg matching brand archetype ${dna.visualArchetype}`,
        ],
        loader: [
            `Build a cinematic LoadingScreen3D for this exact brand.`,
            ``,
            `BRAND NAME (show during loading): "${projectName}"`,
            `PRIMARY: ${primaryHex}`,
            `ACCENT: ${accentHex}`,
            `ENERGY: ${dna.energyLevel}`,
            `ARCHETYPE: ${dna.visualArchetype} — inspire the loader aesthetic`,
            ``,
            `Requirements:`,
            `- STANDALONE OVERLAY: const LoadingScreen3D: React.FC = () => { ... }`,
            `- NO children prop`,
            `- progress bar + branded name animation`,
            `- Fade out: framer-motion AnimatePresence when progress >= 100`,
            `- import { useProgress } from '@react-three/drei' — ONLY allowed drei import`,
            `- Make loading feel PREMIUM, not boring — this is the first thing visitors see`,
        ],
    };

    return [
        `GENERATE ONE FILE: ${spec.path}`,
        `ONE <chirAction> tag. ONE file. Nothing else.`,
        '',
        ...(roleData[role] || roleData['loader']),
    ].join('\n');
}

// ─── Step 5: Quality Gate (crash-only) ───────────────────────────────────────

interface QualityIssue {
    severity: 'CRASH' | 'TYPE_ERROR';
    code: string;
    message: string;
    mustFix: boolean;
}

function runQualityGate(code: string, spec: SectionSpec): QualityIssue[] {
    const issues: QualityIssue[] = [];
    const isScene = spec.componentKind === 'scene';
    const isLoader = spec.overlayRole === 'loader';

    // ── CRASH checks ─────────────────────────────────────────────────

    if (code.includes('MeshTransmissionMaterial')) {
        issues.push({
            severity: 'CRASH', code: 'BANNED_MATERIAL',
            message: 'MeshTransmissionMaterial causes GPU crash — use meshPhysicalMaterial with transmission={0.9}',
            mustFix: true
        });
    }

    if (code.includes('useGLTF(') || code.includes('useTexture(')) {
        issues.push({
            severity: 'CRASH', code: 'NO_ASSETS',
            message: 'useGLTF/useTexture called but no asset files exist — use procedural geometry',
            mustFix: true
        });
    }

    if (isScene && (code.includes('<Canvas') || code.includes('<Canvas>'))) {
        issues.push({
            severity: 'CRASH', code: 'CANVAS_IN_SCENE',
            message: 'Scene fragment must NOT contain Canvas — Canvas lives in the page',
            mustFix: true
        });
    }

    if (isScene && code.includes('EffectComposer')) {
        issues.push({
            severity: 'CRASH', code: 'EFFECT_IN_SCENE',
            message: 'EffectComposer must be in the page Canvas, not in a scene fragment',
            mustFix: true
        });
    }

    if (!isLoader && (code.includes("from '@react-three/fiber'") || code.includes('from "@react-three/fiber"'))
        && spec.componentKind === 'overlay') {
        issues.push({
            severity: 'CRASH', code: 'R3F_IN_OVERLAY',
            message: 'HTML overlay component must not import @react-three/fiber',
            mustFix: true
        });
    }

    if (isLoader && code.includes('children') &&
        (code.includes('props.children') || code.includes('{ children }') || code.includes('{children}'))) {
        issues.push({
            severity: 'CRASH', code: 'LOADER_CHILDREN',
            message: 'LoadingScreen3D must be standalone — remove children prop entirely',
            mustFix: true
        });
    }

    if (code.includes("useSpring") && code.includes("@react-three/drei")) {
        issues.push({
            severity: 'CRASH', code: 'DREI_USESPRING',
            message: 'useSpring is not exported from @react-three/drei — use useRef + lerp in useFrame',
            mustFix: true
        });
    }

    if (code.includes('Text3D') || (code.includes('<Text') && code.includes('@react-three/drei'))) {
        issues.push({
            severity: 'CRASH', code: 'TEXT3D_NO_FONT',
            message: 'Text/Text3D requires font files that do not exist at runtime — remove',
            mustFix: true
        });
    }

    // ── TYPE_ERROR checks ────────────────────────────────────────────

    if (/<ShaderMaterial[\s/>]/.test(code)) {
        issues.push({
            severity: 'TYPE_ERROR', code: 'SHADER_CASING',
            message: '<ShaderMaterial> must be lowercase <shaderMaterial attach="material">',
            mustFix: true
        });
    }

    if (code.includes('ChromaticAberration') && /offset=\{\s*\[/.test(code)) {
        issues.push({
            severity: 'TYPE_ERROR', code: 'CHROMATIC_VECTOR',
            message: 'ChromaticAberration offset must be new THREE.Vector2(), not an array',
            mustFix: false
        });
    }

    // ref.current access without null check
    const refAccesses = [...code.matchAll(/(\w+Ref)\.current\./g)];
    for (const m of refAccesses) {
        const refName = m[1];
        if (!code.includes(`if (!${refName}.current)`) &&
            !code.includes(`${refName}.current &&`) &&
            !code.includes(`${refName}.current?.`)) {
            issues.push({
                severity: 'TYPE_ERROR', code: 'REF_NULL_CHECK',
                message: `${refName}.current accessed without null check`,
                mustFix: false
            });
            break;
        }
    }

    if (isScene && !code.includes('useScroll')) {
        issues.push({
            severity: 'TYPE_ERROR', code: 'NO_SCROLL',
            message: 'Scene must use useScroll() from @react-three/drei for scroll-driven animations',
            mustFix: true
        });
    }

    if (isScene && !code.includes('useFrame')) {
        issues.push({
            severity: 'CRASH', code: 'NO_USEFRAME',
            message: 'Scene must have at least one useFrame loop for animation',
            mustFix: true
        });
    }

    if (isScene && !code.includes('shaderMaterial') && !code.includes('fragmentShader') && !code.includes('ShaderMaterial')) {
        issues.push({
            severity: 'TYPE_ERROR', code: 'NO_CUSTOM_SHADER',
            message: 'Scene must include at least one custom shaderMaterial with vertexShader + fragmentShader',
            mustFix: true
        });
    }

    return issues;
}

// ─── Step 6: Generate one component ──────────────────────────────────────────

async function generateOneComponent(
    spec: SectionSpec,
    dna: BusinessDNA,
    blueprint: WebsiteState['blueprint'],
    theme: WebsiteState['dynamicTheme'],
    ragContext: string,
    staticRef: string,
): Promise<string> {
    const isOverlay = spec.componentKind === 'overlay';
    const systemPrompt = isOverlay
        ? buildOverlaySystemPrompt(dna, spec.overlayRole!)
        : buildSceneSystemPrompt(dna);

    const userPrompt = isOverlay
        ? buildOverlayUserPrompt(spec, dna, blueprint, theme)
        : buildSceneUserPrompt(spec, dna, blueprint, theme, ragContext, staticRef);

    const response = await invokeLLM(systemPrompt, userPrompt, 0.85, 5);
    return response;
}

function extractCode(response: string, spec: SectionSpec): string {
    const parsed = parseChirActions(response);

    // Prefer the file matching this spec
    for (const f of parsed) {
        if (f.path === spec.path || f.path.endsWith(`/${spec.name}.tsx`) || f.path.includes(spec.name)) {
            return f.content;
        }
    }
    // Fallback: first parsed file
    if (parsed.length > 0) return parsed[0].content;

    // Fallback: raw code block
    const codeMatch = response.match(/```(?:tsx|jsx|typescript|javascript)?\n([\s\S]*?)```/);
    return codeMatch ? codeMatch[1].trim() : response.trim();
}

async function generateWithRetry(
    spec: SectionSpec,
    dna: BusinessDNA,
    blueprint: WebsiteState['blueprint'],
    theme: WebsiteState['dynamicTheme'],
    ragContext: string,
    staticRef: string,
): Promise<string> {
    let code = '';
    let issues: QualityIssue[] = [];

    for (let attempt = 1; attempt <= 3; attempt++) {
        const response = await generateOneComponent(spec, dna, blueprint, theme, ragContext, staticRef);
        code = extractCode(response, spec);

        if (code.length < 80) {
            console.warn(`[quality] ${spec.name} too short (${code.length} chars) — retry ${attempt}`);
            continue;
        }

        issues = runQualityGate(code, spec);
        const mustFix = issues.filter(i => i.mustFix);

        if (mustFix.length === 0) {
            if (issues.length > 0) {
                console.log(`[quality] ${spec.name}: ${issues.length} minor issues, passing`);
            }
            console.log(`[quality] ${spec.name} passed (attempt ${attempt}, ${code.length} chars)`);
            return code;
        }

        if (attempt < 3) {
            const issueList = mustFix.map(i => `- [${i.severity}] ${i.code}: ${i.message}`).join('\n');
            console.log(`[quality] ${spec.name} attempt ${attempt} — ${mustFix.length} critical issues, regenerating:\n${issueList}`);

            const fixPrompt = `PREVIOUS ATTEMPT FAILED QUALITY GATE.

CRITICAL ISSUES TO FIX (all mandatory):
${issueList}

Generate a COMPLETELY NEW implementation that fixes ALL issues above.
Do NOT repeat any banned pattern.
${spec.componentKind === 'scene' ? `Minimum 200 lines. Include custom shaderMaterial, multiple useFrame loops, useScroll narrative, particle system.` : `Minimum 80 lines. Pure HTML/CSS + framer-motion. Zero 3D imports.`}

${spec.componentKind === 'scene'
                    ? buildSceneUserPrompt(spec, dna, blueprint, theme, ragContext, staticRef)
                    : buildOverlayUserPrompt(spec, dna, blueprint, theme)}`;

            const systemPrompt = spec.componentKind === 'overlay'
                ? buildOverlaySystemPrompt(dna, spec.overlayRole!)
                : buildSceneSystemPrompt(dna);

            const retryResponse = await invokeLLM(systemPrompt, fixPrompt, 0.9, 3);
            code = extractCode(retryResponse, spec);
        }
    }

    // Return best available code even if issues remain — pipeline must not halt
    const remaining = runQualityGate(code, spec).filter(i => i.mustFix);
    if (remaining.length > 0) {
        console.warn(`[quality] ${spec.name} still has ${remaining.length} critical issues after 3 attempts — using anyway`);
    }
    return code;
}

// ─── Step 7: Build import instructions ───────────────────────────────────────

function buildImportInstructions(
    specs: SectionSpec[],
    generatedPaths: string[],
    dna: BusinessDNA,
): string {
    const sceneSpecs = specs.filter(s => s.componentKind === 'scene');
    const overlaySpecs = specs.filter(s => s.componentKind === 'overlay');
    const numScrollPages = Math.max(sceneSpecs.length + 2, 8);

    const lines: string[] = [
        '=== CINEMATIC 3D COMPONENT INTEGRATION GUIDE ===',
        '',
        `Business: ${dna.businessName} | Industry: ${dna.industry}`,
        `Archetype: ${dna.visualArchetype} | Energy: ${dna.energyLevel}`,
        `Story: ${dna.emotionalJourney}`,
        '',
        '─── CANVAS SETTINGS ───',
        '  gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}',
        '  dpr={[1, 2]} shadows',
        `  camera={{ fov: 60, near: 0.1, far: 1000 }}`,
        '',
        '─── SCROLL CONTROLS ───',
        `  <ScrollControls pages={${numScrollPages}} damping={0.03}>`,
        '',
        '─── PERFORMANCE ───',
        '  <AdaptiveDpr pixelated />',
        '  <AdaptiveEvents />',
        '',
        '─── POSTPROCESSING (inside Canvas, outside ScrollControls) ───',
        '  <EffectComposer>',
        '    <Bloom intensity={1.5} luminanceThreshold={0.2} luminanceSmoothing={0.9} />',
        '    <Vignette eskil={false} offset={0.1} darkness={0.7} />',
        '    <Noise opacity={0.04} />',
        '  </EffectComposer>',
        '',
        '─── SCENE COMPONENTS (inside <Scroll>) ───',
    ];

    let yOffset = 0;
    for (const spec of sceneSpecs) {
        const matched = generatedPaths.find(p => p.includes(spec.name));
        if (!matched) continue;
        const importPath = '@/' + matched.replace(/^src\//, '').replace('.tsx', '');
        lines.push(`  // ${spec.sectionType.toUpperCase()} — ${spec.name}`);
        lines.push(`  const ${spec.name} = lazy(() => import('${importPath}'));`);
        lines.push(yOffset === 0
            ? `  placement: <${spec.name} /> (Y=0, first in <Scroll>)`
            : `  placement: <group position={[0, ${yOffset}, 0]}><${spec.name} /></group>`);
        lines.push('');
        yOffset -= 10;
    }

    lines.push('─── HTML OVERLAYS (outside Canvas) ───');
    for (const spec of overlaySpecs) {
        const matched = generatedPaths.find(p => p.includes(spec.name));
        if (!matched) continue;
        const importPath = '@/' + matched.replace(/^src\//, '').replace('.tsx', '');
        lines.push(`  import ${spec.name} from '${importPath}';`);
    }

    lines.push('');
    lines.push('─── PAGE STRUCTURE TEMPLATE ───');
    lines.push('<div className="relative min-h-screen" style={{ background: "' + dna.colorStory.background + '" }}>');
    lines.push('  <LoadingScreen3D />          {/* Standalone overlay — NO children prop */}');
    lines.push('  <NavBar3D />');
    lines.push('  <div className="fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>');
    lines.push('    <Suspense fallback={<div className="w-full h-full" style={{ background: "' + dna.colorStory.background + '" }} />}>');
    lines.push('      <Canvas ...canvasSettings>');
    lines.push('        <AdaptiveDpr pixelated />');
    lines.push('        <AdaptiveEvents />');
    lines.push('        <ScrollControls pages={' + numScrollPages + '} damping={0.03}>');
    lines.push('          <Scroll>');
    lines.push('            {/* Scene fragments at Y offsets */}');
    lines.push('          </Scroll>');
    lines.push('          <Scroll html>');
    lines.push('            {/* h-screen sections with glassmorphism content */}');
    lines.push('            <section className="w-screen"><Footer3D /></section>');
    lines.push('          </Scroll>');
    lines.push('        </ScrollControls>');
    lines.push('        <Environment preset="city" />');
    lines.push('        <EffectComposer>...</EffectComposer>');
    lines.push('      </Canvas>');
    lines.push('    </Suspense>');
    lines.push('  </div>');
    lines.push('</div>');

    return lines.join('\n');
}

// ─── Step 8: Build scene-to-page map ─────────────────────────────────────────

function buildScenePageMap(
    specs: SectionSpec[],
    generatedPaths: string[],
    blueprint: WebsiteState['blueprint'],
): Record<string, string[]> {
    const map: Record<string, string[]> = {};
    const pages = blueprint?.pages || [];

    const sceneSpecs = specs.filter(s => s.componentKind === 'scene');
    const generatedScenes = sceneSpecs.filter(s => generatedPaths.some(p => p.includes(s.name)));
    const ambientScene = generatedScenes.find(s => s.sectionType === 'ambient');

    const sectionTypeOf = (name: string): string => {
        const lower = name.toLowerCase();
        if (/hero|banner|landing|intro|welcome/.test(lower)) return 'hero';
        if (/feature|capability|benefit/.test(lower)) return 'features';
        if (/product|showcase|gallery|portfolio|work/.test(lower)) return 'showcase';
        if (/testimonial|review|client/.test(lower)) return 'testimonials';
        if (/about|team|who/.test(lower)) return 'about';
        if (/contact|form|reach/.test(lower)) return 'contact';
        if (/cta|call|started|signup/.test(lower)) return 'cta';
        if (/stat|number|metric/.test(lower)) return 'stats';
        if (/process|how|step/.test(lower)) return 'process';
        return 'features';
    };

    for (const page of pages) {
        const pageName = page.name.replace(/\s+/g, '');
        const pageSectionTypes = (page.sections || []).map(s => sectionTypeOf(s));
        const assigned: string[] = [];

        for (const scene of generatedScenes) {
            if (scene.sectionType === 'ambient') continue;
            if (pageSectionTypes.includes(scene.sectionType) && !assigned.includes(scene.name)) {
                assigned.push(scene.name);
            }
        }

        // HomePage always gets hero + features at minimum
        if (page.route === '/' || page.name.toLowerCase().includes('home')) {
            for (const t of ['hero', 'features']) {
                const s = generatedScenes.find(sc => sc.sectionType === t);
                if (s && !assigned.includes(s.name)) assigned.unshift(s.name);
            }
        }

        // Ensure every page gets at least 3 scenes
        for (const scene of generatedScenes) {
            if (assigned.length >= 3) break;
            if (scene.sectionType !== 'ambient' && !assigned.includes(scene.name)) {
                assigned.push(scene.name);
            }
        }

        // Add ambient last
        if (ambientScene && !assigned.includes(ambientScene.name)) {
            assigned.push(ambientScene.name);
        }

        map[pageName] = assigned;
    }

    return map;
}

// ─── Main Node ────────────────────────────────────────────────────────────────

export async function generate3DComponentNode(state: WebsiteState): Promise<Partial<WebsiteState>> {
    console.log('\n[generate-3d] Starting cinematic 3D component generation...');
    notifyPhaseChange('3d_components');

    if (!state.enable3D) {
        return { currentPhase: 'generate_3d_skip', messages: ['3D component generation skipped'] };
    }

    const blueprint = state.blueprint;
    const theme = state.dynamicTheme;
    const userPrompt = state.userPrompt || '';
    const ragContext = state.ragContext || '';
    // Only inject static reference when no live docs were fetched
    const staticRef = ragContext ? '' : (threeDPromptContext || '');

    let dna: BusinessDNA;
    let specs: SectionSpec[];

    // ══════════════════════════════════════════════════════════════════════════
    // MASTER CONTEXT INTEGRATION
    // If masterContext exists, use pre-generated context instead of LLM calls
    // ══════════════════════════════════════════════════════════════════════════
    if (state.masterContext) {
        console.log('[generate-3d] Using MASTER CONTEXT (pre-generated)...');
        console.log(`[generate-3d] Master Context ID: ${state.masterContext.projectId}`);
        console.log(`[generate-3d] Scenes in context: ${state.masterContext.scenes.length}`);

        // Convert masterContext to local interfaces
        dna = convertMasterBusinessDNA(state.masterContext.businessDNA, state.masterContext.designTokens);
        console.log(`[generate-3d] DNA (from masterContext): ${dna.industry} | ${dna.visualArchetype} | shader=${dna.shaderStyle}`);

        specs = convertMasterScenesToSpecs(state.masterContext);
        console.log(`[generate-3d] Specs (from masterContext): ${specs.length} components`);
        console.log(`[generate-3d] Scenes: ${specs.filter(s => s.componentKind === 'scene').map(s => s.name).join(', ')}`);
    } else {
        // ── Fallback: Extract DNA and build specs via LLM ─────────────────────
        console.log('[generate-3d] No masterContext, extracting Business DNA via LLM...');
        dna = await extractBusinessDNA(userPrompt, blueprint, theme);
        console.log(`[generate-3d] DNA: ${dna.industry} | ${dna.visualArchetype} | shader=${dna.shaderStyle} | particles=${dna.particlePersona}`);

        console.log('[generate-3d] Building section specs via LLM...');
        specs = await buildSectionSpecs(userPrompt, blueprint, dna);
        console.log(`[generate-3d] ${specs.length} specs: ${specs.map(s => s.name).join(', ')}`);
    }

    const newFiles = new Map<string, GeneratedFile>();
    const registry = new Map(state.fileRegistry);

    const PROTECTED = new Set([
        'src/App.tsx', 'src/main.tsx', 'src/index.css', 'src/lib/utils.ts',
        'src/components/layout/AppLayout.tsx',
    ]);

    // ── Step 3: Generate all components concurrently ─────────────────────────
    console.log('[generate-3d] Generating components (parallel)...');

    // Build enhanced RAG context for each scene when masterContext is available
    const getSceneRagContext = (spec: SectionSpec): string => {
        if (!state.masterContext || spec.componentKind !== 'scene') {
            return ragContext;
        }
        // Combine general RAG context with scene-specific context from masterContext
        const sceneContext = MasterContext3DService.extractSceneContext(state.masterContext, spec.name);
        if (sceneContext) {
            return `${sceneContext}\n\n=== RAG DOCUMENTATION ===\n${ragContext}`;
        }
        return ragContext;
    };

    const results = await Promise.allSettled(
        specs.map(async (spec) => {
            console.log(`  [gen] ${spec.name} (${spec.componentKind}:${spec.sectionType})`);
            const sceneRagContext = getSceneRagContext(spec);
            const code = await generateWithRetry(spec, dna, blueprint, theme, sceneRagContext, staticRef);
            return { spec, code };
        })
    );

    for (const result of results) {
        if (result.status === 'rejected') {
            console.error(`[generate-3d] ${(result as PromiseRejectedResult).reason?.message}`);
            continue;
        }

        const { spec, code } = result.value;

        if (code.length < 50) {
            console.warn(`[generate-3d] ${spec.name}: code too small — skipping`);
            continue;
        }

        const filePath = spec.path;
        if (PROTECTED.has(filePath)) continue;

        const file: GeneratedFile = {
            path: filePath,
            content: code,
            phase: '3d_components',
            exports: extractExports(code),
            imports: extractImports(code),
        };
        newFiles.set(filePath, file);
        registry.set(filePath, createRegistryEntry(file));
        notifyFileCreated(file);
        console.log(`  [done] ${filePath} (${code.length} chars)`);
    }

    const generatedPaths = Array.from(newFiles.keys());
    console.log(`[generate-3d] Generated ${newFiles.size} components`);

    // ── Step 4: Import instructions + scene-page map ─────────────────────────
    const importInstructions = buildImportInstructions(specs, generatedPaths, dna);
    const scenePageMap = buildScenePageMap(specs, generatedPaths, blueprint);

    console.log('[generate-3d] Scene-page mapping:');
    Object.entries(scenePageMap).forEach(([page, scenes]) =>
        console.log(`  ${page}: ${scenes.join(', ')}`)
    );

    // ── Step 5: Update project memory ────────────────────────────────────────
    let updatedMemory = state.projectMemory;
    if (updatedMemory) {
        updatedMemory = updateMemory3D(updatedMemory, generatedPaths, importInstructions);
    }

    return {
        files: newFiles,
        fileRegistry: registry,
        projectMemory: updatedMemory,
        importInstructions,
        scenePageMap,
        currentPhase: 'generate_3d_complete',
        messages: [
            `Generated ${newFiles.size} cinematic 3D components`,
            `DNA: ${dna.visualArchetype} | ${dna.shaderStyle} shader | ${dna.particlePersona}`,
            `Story: ${dna.emotionalJourney}`,
            `Scenes: ${generatedPaths.filter(p => p.includes('Scene')).join(', ')}`,
            `Mapping: ${Object.entries(scenePageMap).map(([p, s]) => `${p}=[${s.join(',')}]`).join(' | ')}`,
        ],
    };
}