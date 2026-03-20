/**
 * Master Context 3D Service
 * Unified service that merges context-3d.service.ts and planning-3d.service.ts
 * Generates comprehensive, structured 3D website blueprints
 */

import fs from 'fs';
import path from 'path';
import axios from 'axios';
import OpenAI from 'openai';
import {
    MasterContext3D,
    MasterContextResponse,
    BusinessDNA,
    BrandIdentity,
    DesignTokens,
    SceneBlueprint,
    PageBlueprint,
    RAGContext,
    PerformanceRules,
    FileStructureEntry,
    SectionBlueprint,
    ThreeDObjectSpec,
    LightingSpec,
    PostProcessingSpec,
    UIOverlaySpec,
} from '../types/master-context-3d.types';
import { DynamicDesignTheme, generateDynamicTheme, formatThemeForPrompt } from './dynamic-trends.service';

// Load 3D UI components JSON for RAG
const CONTEXT_MAP_PATH = path.resolve(process.cwd(), 'src/ui/3d-ui-components.json');

interface ContextMap {
    meta: {
        version: string;
        threejs_base_url: string;
        fetch_strategy: { threejs: string; external: string };
    };
    threejs_pages: Record<string, string[]>;
    external_libraries: Record<string, {
        crawl_url: string;
        fetch_method: string;
        description: string;
        keywords: string[];
        codesnippet: string;
        dependencies: string;
    }>;
    intent_map: Record<string, {
        keywords: string[];
        threejs_docs: string[];
        external_docs?: string[];
    }>;
    core_docs_always_included: string[];
}

let cachedContextMap: ContextMap | null = null;

function loadContextMap(): ContextMap {
    if (cachedContextMap) return cachedContextMap;
    try {
        const raw = fs.readFileSync(CONTEXT_MAP_PATH, 'utf-8');
        cachedContextMap = JSON.parse(raw) as ContextMap;
        console.log(`[MasterContext3D] Loaded 3d-ui-components.json (v${cachedContextMap.meta.version})`);
    } catch (err) {
        console.warn(`[MasterContext3D] Could not load context map: ${err}`);
        // Return minimal fallback
        cachedContextMap = {
            meta: { version: '0', threejs_base_url: 'https://threejs.org/docs/pages/{name}.html.md', fetch_strategy: { threejs: 'http', external: 'tavily' } },
            threejs_pages: {},
            external_libraries: {},
            intent_map: {},
            core_docs_always_included: ['WebGLRenderer', 'Scene', 'PerspectiveCamera', 'Mesh', 'MeshStandardMaterial'],
        };
    }
    return cachedContextMap;
}

// API Key management
const apiKeys = [
    process.env.gemini13,
    process.env.gemini12,
    process.env.gemini8,
    process.env.gemini9,
    process.env.gemini10,
    process.env.gemini11,
    process.env.gemini,
    process.env.gemini3,
    process.env.gemini4,
    process.env.gemini7,
    process.env.gemini6,
    process.env.gemini5,
    process.env.gemini2,
].filter(k => k && k.length > 0) as string[];

let keyIdx = Math.floor(Math.random() * Math.max(apiKeys.length, 1));

function getClient(): OpenAI {
    const key = apiKeys[keyIdx % Math.max(apiKeys.length, 1)] || process.env.gemini;
    return new OpenAI({
        apiKey: key as string,
        baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
    });
}

function rotateKey(): void {
    if (apiKeys.length > 0) {
        keyIdx = (keyIdx + 1) % apiKeys.length;
    }
}

const MODEL = 'gemini-3-flash-preview';

// ============================================================
// MAIN SERVICE CLASS
// ============================================================

export class MasterContext3DService {

    /**
     * Main entry point - generates complete Master Context
     * @param userPrompt - The user's prompt describing the website
     * @param existingTheme - Optional existing theme (can be partial or full DynamicDesignTheme)
     */
    static async generateMasterContext(
        userPrompt: string,
        existingTheme?: Partial<DynamicDesignTheme> | null
    ): Promise<MasterContextResponse> {
        const startTime = Date.now();
        console.log(`\n[MasterContext3D] ═══════════════════════════════════════════════`);
        console.log(`[MasterContext3D] GENERATING MASTER 3D CONTEXT`);
        console.log(`[MasterContext3D] ═══════════════════════════════════════════════`);

        try {
            // Step 1: Generate or use existing theme
            // If existing theme is provided but partial, generate a fresh one
            const theme = (existingTheme && existingTheme.timestamp && existingTheme.components)
                ? existingTheme as DynamicDesignTheme
                : generateDynamicTheme(userPrompt);
            console.log(`[MasterContext3D] Theme: ${theme.palette.name}`);

            // Step 2: Analyze business DNA and brand (LLM call)
            console.log(`[MasterContext3D] Step 1/5: Analyzing business DNA...`);
            const { businessDNA, brand } = await this.analyzeBusinessDNA(userPrompt, theme);

            // Step 3: Generate design tokens
            console.log(`[MasterContext3D] Step 2/5: Generating design tokens...`);
            const designTokens = this.generateDesignTokens(businessDNA, brand, theme);

            // Step 4: Classify intents and build RAG context
            console.log(`[MasterContext3D] Step 3/5: Building RAG context...`);
            const ragContext = await this.buildRAGContext(userPrompt, businessDNA);

            // Step 5: Generate scene blueprints (LLM call)
            console.log(`[MasterContext3D] Step 4/5: Generating scene blueprints...`);
            const scenes = await this.generateSceneBlueprints(userPrompt, businessDNA, designTokens, ragContext);

            // Step 6: Generate page blueprints
            console.log(`[MasterContext3D] Step 5/5: Generating page blueprints...`);
            const pages = this.generatePageBlueprints(businessDNA, scenes, designTokens);

            // Step 7: Generate file structure
            const fileStructure = this.generateFileStructure(pages, scenes);

            // Step 8: Generate performance rules
            const performance = this.generatePerformanceRules();

            // Step 9: Generate dependencies
            const dependencies = this.generateDependencies(ragContext);

            // Assemble the master context
            const masterContext: MasterContext3D = {
                version: '1.0.0',
                generatedAt: new Date().toISOString(),
                projectId: `proj-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,

                businessDNA,
                brand,
                designTokens,
                scenes,
                pages,
                fileStructure,
                ragContext,
                performance,
                dependencies,

                userPrompt,
                expandedPrompt: this.generateExpandedPrompt(userPrompt, businessDNA, brand, designTokens, scenes),
            };

            const duration = ((Date.now() - startTime) / 1000).toFixed(1);
            console.log(`[MasterContext3D] ═══════════════════════════════════════════════`);
            console.log(`[MasterContext3D] MASTER CONTEXT COMPLETE`);
            console.log(`[MasterContext3D] Duration: ${duration}s`);
            console.log(`[MasterContext3D] Scenes: ${scenes.length}, Pages: ${pages.length}`);
            console.log(`[MasterContext3D] RAG Tags: ${ragContext.intentTags.join(', ')}`);
            console.log(`[MasterContext3D] ═══════════════════════════════════════════════\n`);

            return { success: true, data: masterContext };

        } catch (error: any) {
            console.error(`[MasterContext3D] Error: ${error.message}`);
            return { success: false, error: error.message };
        }
    }

    /**
     * Step 1: Analyze business DNA and generate brand identity
     */
    private static async analyzeBusinessDNA(
        userPrompt: string,
        theme: DynamicDesignTheme
    ): Promise<{ businessDNA: BusinessDNA; brand: BrandIdentity }> {

        const systemPrompt = `You are a brand strategist and 3D web experience architect.
Analyze the user's request and extract deep business insights.
Return ONLY valid JSON matching this exact structure (no markdown, no explanation):

{
  "businessDNA": {
    "industry": "string - specific industry (e.g., 'bakery', 'tech-saas', 'fitness')",
    "niche": "string - specific niche (e.g., 'artisan wedding cakes')",
    "targetAudience": "string - who this serves",
    "emotionalTone": "string - feelings to evoke (e.g., 'warm, celebratory, artisanal')",
    "businessGoal": "string - primary goal",
    "visualMetaphor": "string - visual concept to use (e.g., 'rising dough, sugar crystals')",
    "motionLanguage": "string - how things move (e.g., 'soft, flowing, organic')",
    "brandVoice": "premium|playful|authoritative|warm|technical|elegant",
    "energyLevel": "calm|moderate|energetic|intense",
    "sceneArchetype": "string - 3D scene style (e.g., 'EtherealGarden', 'CosmicVoid', 'CrystalCave')"
  },
  "brand": {
    "name": "string - creative brand name",
    "tagline": "string - 5-7 word catchy tagline",
    "logoDescription": "string - logo concept",
    "keyVisual": "string - main visual element for 3D",
    "elevator": "string - one sentence brand description"
  }
}`;

        const userMessage = `Analyze this project request and create brand/business insights:

"${userPrompt}"

Design Theme Context:
- Color Palette: ${theme.palette.name} (${theme.palette.style})
- Primary: ${theme.palette.primary}
- Animation Style: ${theme.animation.name}

Return ONLY the JSON object.`;

        for (let attempt = 0; attempt < 3; attempt++) {
            try {
                rotateKey();
                const client = getClient();
                const response = await client.chat.completions.create({
                    model: MODEL,
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: userMessage },
                    ],
                    temperature: 0.7,
                });

                const content = response.choices[0]?.message?.content || '{}';
                const cleaned = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
                const parsed = JSON.parse(cleaned);

                if (parsed.businessDNA && parsed.brand) {
                    console.log(`[MasterContext3D] Brand: "${parsed.brand.name}" (${parsed.businessDNA.industry})`);
                    return parsed;
                }
            } catch (err: any) {
                console.warn(`[MasterContext3D] Business DNA attempt ${attempt + 1} failed: ${err.message?.slice(0, 60)}`);
                rotateKey();
            }
        }

        // Fallback
        return {
            businessDNA: {
                industry: 'general',
                niche: 'modern website',
                targetAudience: 'general audience',
                emotionalTone: 'professional, modern',
                businessGoal: 'engage visitors',
                visualMetaphor: 'flowing energy, light particles',
                motionLanguage: 'smooth, elegant',
                brandVoice: 'premium',
                energyLevel: 'moderate',
                sceneArchetype: 'AbstractFlow',
            },
            brand: {
                name: 'Aurora Project',
                tagline: 'Experience the Future Today',
                logoDescription: 'Abstract flowing shape',
                keyVisual: 'Glowing abstract form with particles',
                elevator: 'A stunning 3D web experience.',
            },
        };
    }

    /**
     * Step 2: Generate design tokens from theme and brand
     */
    private static generateDesignTokens(
        businessDNA: BusinessDNA,
        brand: BrandIdentity,
        theme: DynamicDesignTheme
    ): DesignTokens {
        // Derive emissive/glow color from primary
        const primaryHex = theme.palette.primary;
        const emissiveHex = this.lightenColor(primaryHex, 30);

        return {
            colors: {
                background: theme.palette.background,
                backgroundDeep: this.darkenColor(theme.palette.background, 10),
                surface: theme.palette.surface,
                primary: theme.palette.primary,
                secondary: theme.palette.secondary,
                accent: theme.palette.accent,
                emissive: emissiveHex,
                fog: theme.palette.background,
                text: {
                    primary: this.isLightColor(theme.palette.background) ? '#1a1a1a' : '#ffffff',
                    secondary: this.isLightColor(theme.palette.background) ? '#4a4a4a' : '#b0b0b0',
                    accent: theme.palette.accent,
                    inverse: this.isLightColor(theme.palette.background) ? '#ffffff' : '#1a1a1a',
                },
                glassmorphism: {
                    background: this.isLightColor(theme.palette.background)
                        ? 'rgba(0,0,0,0.05)'
                        : 'rgba(255,255,255,0.05)',
                    border: this.isLightColor(theme.palette.background)
                        ? 'rgba(0,0,0,0.1)'
                        : 'rgba(255,255,255,0.1)',
                    blur: '20px',
                },
                gradients: {
                    hero: `linear-gradient(135deg, ${theme.palette.primary}, ${theme.palette.secondary})`,
                    cta: `linear-gradient(135deg, ${theme.palette.accent}, ${theme.palette.primary})`,
                    glow: `radial-gradient(circle, ${emissiveHex}40, transparent)`,
                },
            },
            typography: {
                headingFont: theme.fonts.heading,
                bodyFont: theme.fonts.body,
                accentFont: undefined,
                headingWeights: ['600', '700', '800'],
                bodyWeights: ['400', '500'],
                letterSpacing: {
                    heading: '-0.02em',
                    body: '0',
                    wide: '0.1em',
                },
                lineHeight: {
                    heading: '1.1',
                    body: '1.6',
                },
            },
            spacing: {
                sectionPadding: 'py-20 md:py-28 lg:py-32',
                containerMax: 'max-w-7xl',
                cardGap: 'gap-6',
                elementSpacing: 'space-y-4',
            },
            animation: {
                timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                duration: {
                    instant: '0.1s',
                    fast: '0.2s',
                    normal: '0.4s',
                    slow: '0.7s',
                    glacial: '1.2s',
                },
                entrancePreset: theme.animation.entrance,
                hoverPreset: theme.animation.hover,
                scrollPreset: theme.animation.scroll,
            },
            shadows: {
                glow: `0 0 30px ${theme.palette.primary}60`,
                card: '0 4px 20px rgba(0,0,0,0.15)',
                text: '0 2px 10px rgba(0,0,0,0.3)',
            },
            borderRadius: {
                small: '4px',
                medium: '8px',
                large: '16px',
                full: '9999px',
            },
        };
    }

    /**
     * Step 3: Build RAG context by classifying intents and fetching docs
     */
    private static async buildRAGContext(
        userPrompt: string,
        businessDNA: BusinessDNA
    ): Promise<RAGContext> {

        // Classify intents
        const intentTags = await this.classifyIntents(userPrompt, businessDNA);

        // Fetch documentation
        const { threejsDocs, externalDocs } = await this.fetchDocumentation(intentTags);

        // Estimate tokens
        const totalTokenEstimate = threejsDocs.reduce((sum, d) => sum + d.summary.length / 4, 0)
            + externalDocs.reduce((sum, d) => sum + d.summary.length / 4, 0);

        return {
            intentTags,
            threejsDocs,
            externalDocs,
            totalTokenEstimate: Math.round(totalTokenEstimate),
        };
    }

    /**
     * Classify intents from user prompt
     */
    private static async classifyIntents(
        userPrompt: string,
        businessDNA: BusinessDNA
    ): Promise<string[]> {
        const contextMap = loadContextMap();
        const validTags = Object.keys(contextMap.intent_map);

        const systemPrompt = 'You are a 3D web technology classifier. Return ONLY a JSON array of strings. No markdown, no explanation.';
        const userMessage = `Classify this 3D website project to select appropriate documentation tags.

AVAILABLE TAGS:
${JSON.stringify(validTags)}

PROJECT:
"${userPrompt}"

Business: ${businessDNA.industry} / ${businessDNA.niche}
Visual Style: ${businessDNA.visualMetaphor}
Motion: ${businessDNA.motionLanguage}

RULES:
- Return 5-12 tags from the list
- Prioritize tags unique to THIS project
- Core lighting/post-processing docs are always included, only add those tags if specifically needed
- Consider: ${businessDNA.sceneArchetype} archetype

Return ONLY a JSON array of strings.`;

        for (let attempt = 0; attempt < 3; attempt++) {
            try {
                rotateKey();
                const client = getClient();
                const response = await client.chat.completions.create({
                    model: MODEL,
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: userMessage },
                    ],
                    temperature: 0.4,
                });

                const content = response.choices[0]?.message?.content || '[]';
                const cleaned = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
                const match = cleaned.match(/\[[\s\S]*\]/);
                if (match) {
                    const parsed = JSON.parse(match[0]) as string[];
                    const filtered = parsed.filter(tag => validTags.includes(tag));
                    if (filtered.length >= 3) {
                        console.log(`[MasterContext3D] Intent tags: ${filtered.join(', ')}`);
                        return filtered;
                    }
                }
            } catch (err: any) {
                console.warn(`[MasterContext3D] Intent classification attempt ${attempt + 1} failed`);
                rotateKey();
            }
        }

        return ['particles', 'scroll_animation', 'shaders_custom', 'lighting', 'animation'];
    }

    /**
     * Fetch Three.js and external documentation
     */
    private static async fetchDocumentation(
        intentTags: string[]
    ): Promise<{ threejsDocs: RAGContext['threejsDocs']; externalDocs: RAGContext['externalDocs'] }> {
        const contextMap = loadContextMap();

        const threejsDocNames = new Set<string>(contextMap.core_docs_always_included);
        const externalLibKeys = new Set<string>();

        for (const tag of intentTags) {
            const entry = contextMap.intent_map[tag];
            if (!entry) continue;
            entry.threejs_docs?.forEach(name => threejsDocNames.add(name));
            entry.external_docs?.forEach(key => externalLibKeys.add(key));
        }

        // Limit docs to prevent token overflow (20-30 Three.js, 5-10 external)
        let uniqueThreejsNames = Array.from(threejsDocNames).slice(0, 30);
        const uniqueExternalKeys = Array.from(externalLibKeys).slice(0, 10);

        const baseUrl = contextMap.meta.threejs_base_url;

        // Fetch Three.js docs (with summaries for token efficiency)
        const threejsFetchPromises = uniqueThreejsNames.map(async (name) => {
            const url = baseUrl.replace('{name}', name);
            try {
                const response = await axios.get(url, { timeout: 8000, responseType: 'text' });
                const content = (response.data as string).trim();
                const summary = content.slice(0, 4000);
                return { name, summary };
            } catch {
                return { name, summary: `[Documentation for ${name}]` };
            }
        });

        // Fetch external docs
        const externalFetchPromises = uniqueExternalKeys.map(async (key) => {
            const lib = contextMap.external_libraries[key];
            if (!lib) return { name: key, summary: '', codeSnippet: '' };

            try {
                if (process.env.TAVILY_API_KEY) {
                    const { data } = await axios.post(
                        'https://api.tavily.com/extract',
                        { api_key: process.env.TAVILY_API_KEY, urls: [lib.crawl_url] },
                        { timeout: 20000 }
                    );
                    const results = data?.results || [];
                    if (results[0]?.raw_content) {
                        const content = (results[0].raw_content as string).slice(0, 6000);
                        return { name: key, summary: content, codeSnippet: lib.codesnippet };
                    }
                } else if (uniqueExternalKeys.length > 0) {
                    console.warn('[MasterContext3D] TAVILY_API_KEY not set - external docs will use fallback snippets only');
                }
            } catch (err: any) {
                console.warn(`[MasterContext3D] Failed to fetch external doc for ${key}: ${err.message?.slice(0, 60)}`);
            }

            // Fallback to code snippet
            return {
                name: key,
                summary: `${lib.description}\nDependencies: ${lib.dependencies}`,
                codeSnippet: lib.codesnippet,
            };
        });

        const [threejsResults, externalResults] = await Promise.all([
            Promise.all(threejsFetchPromises),
            Promise.all(externalFetchPromises),
        ]);

        console.log(`[MasterContext3D] Fetched ${threejsResults.length} Three.js docs, ${externalResults.length} external docs`);

        return {
            threejsDocs: threejsResults.filter(d => d.summary.length > 0),
            externalDocs: externalResults.filter(d => d.summary.length > 0),
        };
    }

    /**
     * Step 4: Generate 3D scene blueprints
     */
    private static async generateSceneBlueprints(
        userPrompt: string,
        businessDNA: BusinessDNA,
        designTokens: DesignTokens,
        ragContext: RAGContext
    ): Promise<SceneBlueprint[]> {

        const systemPrompt = `You are a world-class 3D web scene architect using React Three Fiber, Three.js, and Drei.
Generate detailed 3D scene blueprints for an immersive website.

Return ONLY valid JSON - an array of scene blueprints.

Each scene should have this structure:
{
  "id": "hero-scene",
  "name": "HeroScene3D",
  "fileName": "HeroScene3D.tsx",
  "description": "Main hero section with floating crystal",
  "purpose": "As a visitor, I see a stunning 3D crystal that responds to my mouse",
  "wowFactor": "The crystal splits into particles on hover",
  "objects": [
    {
      "id": "main-crystal",
      "name": "MainCrystal",
      "description": "Central floating crystal",
      "geometry": { "type": "icosahedronGeometry", "args": [2, 3] },
      "material": {
        "type": "MeshDistortMaterial",
        "properties": { "color": "#6366f1", "roughness": 0.1, "metalness": 0.8, "distort": 0.4, "speed": 2 }
      },
      "position": [0, 0, 0],
      "animation": { "type": "rotation", "axis": "y", "speed": 0.002 },
      "wrappers": ["Float"],
      "wrapperProps": { "speed": 2, "rotationIntensity": 0.5, "floatIntensity": 1 }
    }
  ],
  "lighting": {
    "ambientIntensity": 0.3,
    "lights": [
      { "type": "directional", "position": [5, 5, 5], "color": "#ffffff", "intensity": 1.5, "castShadow": true }
    ],
    "environment": { "preset": "sunset", "intensity": 0.5 }
  },
  "particles": { "type": "Sparkles", "count": 100, "color": "#ffffff", "size": 1, "speed": 0.3 },
  "canvas": {
    "camera": { "type": "perspective", "fov": 45, "position": [0, 0, 8] },
    "dpr": [1, 1.5],
    "shadows": true
  },
  "scrollBehavior": { "scrollPages": 2, "damping": 0.1 }
}

Generate 5-7 unique scenes that work together for a complete 3D website experience.`;

        const userMessage = `Create scene blueprints for this 3D website:

PROJECT: "${userPrompt}"

BUSINESS DNA:
- Industry: ${businessDNA.industry}
- Visual Metaphor: ${businessDNA.visualMetaphor}
- Motion Language: ${businessDNA.motionLanguage}
- Scene Archetype: ${businessDNA.sceneArchetype}
- Energy Level: ${businessDNA.energyLevel}

DESIGN TOKENS:
- Primary: ${designTokens.colors.primary}
- Secondary: ${designTokens.colors.secondary}
- Accent: ${designTokens.colors.accent}
- Emissive: ${designTokens.colors.emissive}
- Background: ${designTokens.colors.background}

RAG CONTEXT (Three.js & Library Documentation):
${this.formatRAGDocsForBlueprint(ragContext)}

Generate 5-7 scenes: Hero, Features, Showcase, About/Story, CTA, and optionally Contact, Testimonials.
Return ONLY the JSON array.`;

        for (let attempt = 0; attempt < 3; attempt++) {
            try {
                rotateKey();
                const client = getClient();
                const response = await client.chat.completions.create({
                    model: MODEL,
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: userMessage },
                    ],
                    temperature: 0.7, // Lowered from 0.8 - more grounded with better docs
                });

                const content = response.choices[0]?.message?.content || '[]';
                const cleaned = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
                const match = cleaned.match(/\[[\s\S]*\]/);
                if (match) {
                    const parsed = JSON.parse(match[0]) as SceneBlueprint[];
                    if (parsed.length >= 3) {
                        console.log(`[MasterContext3D] Generated ${parsed.length} scene blueprints`);
                        return this.normalizeSceneBlueprints(parsed, designTokens);
                    }
                }
            } catch (err: any) {
                console.warn(`[MasterContext3D] Scene generation attempt ${attempt + 1} failed: ${err.message?.slice(0, 60)}`);
                rotateKey();
            }
        }

        // Fallback: generate basic scenes
        return this.generateFallbackScenes(designTokens, businessDNA);
    }

    /**
     * Normalize and validate scene blueprints
     */
    private static normalizeSceneBlueprints(
        scenes: SceneBlueprint[],
        designTokens: DesignTokens
    ): SceneBlueprint[] {
        return scenes.map((scene, index) => ({
            id: scene.id || `scene-${index}`,
            name: scene.name || `Scene${index}3D`,
            fileName: scene.fileName || `${scene.name || `Scene${index}3D`}.tsx`,
            description: scene.description || '',
            purpose: scene.purpose || '',
            wowFactor: scene.wowFactor || 'Stunning visuals',
            objects: scene.objects || [],
            lighting: scene.lighting || {
                ambientIntensity: 0.3,
                lights: [{ type: 'directional', position: [5, 5, 5], color: '#ffffff', intensity: 1.5 }],
            },
            fog: scene.fog,
            particles: scene.particles,
            shader: scene.shader,
            canvas: scene.canvas || {
                camera: { type: 'perspective', fov: 45, position: [0, 0, 8] },
                dpr: [1, 1.5],
                shadows: true,
            },
            scrollBehavior: scene.scrollBehavior,
            postProcessing: scene.postProcessing,
        }));
    }

    /**
     * Generate fallback scenes if LLM fails
     */
    private static generateFallbackScenes(
        designTokens: DesignTokens,
        businessDNA: BusinessDNA
    ): SceneBlueprint[] {
        const { primary, secondary, accent, emissive, background } = designTokens.colors;

        return [
            {
                id: 'hero-scene',
                name: 'HeroScene3D',
                fileName: 'HeroScene3D.tsx',
                description: 'Main hero section with centerpiece 3D element',
                purpose: 'Create an immediate visual impact',
                wowFactor: 'Floating, breathing main element with particle trail',
                objects: [
                    {
                        id: 'hero-shape',
                        name: 'HeroShape',
                        description: 'Central floating geometric shape',
                        geometry: { type: 'icosahedronGeometry', args: [2, 2] },
                        material: {
                            type: 'MeshDistortMaterial',
                            properties: { color: primary, roughness: 0.2, metalness: 0.8, distort: 0.3, speed: 1.5 },
                        },
                        position: [0, 0, 0],
                        animation: { type: 'rotation', axis: 'y', speed: 0.003 },
                        wrappers: ['Float'],
                        wrapperProps: { speed: 2, rotationIntensity: 0.5, floatIntensity: 1 },
                    },
                ],
                lighting: {
                    ambientIntensity: 0.2,
                    lights: [
                        { type: 'directional', position: [5, 5, 5], color: '#ffffff', intensity: 1.5, castShadow: true },
                        { type: 'point', position: [-3, 2, 2], color: primary, intensity: 1 },
                    ],
                    environment: { preset: 'sunset', intensity: 0.5 },
                },
                particles: { type: 'Sparkles', count: 80, color: emissive, size: 1, speed: 0.3 },
                canvas: {
                    camera: { type: 'perspective', fov: 45, position: [0, 0, 8] },
                    dpr: [1, 1.5],
                    shadows: true,
                },
                scrollBehavior: { scrollPages: 1.5, damping: 0.1 },
            },
            {
                id: 'features-scene',
                name: 'FeaturesScene3D',
                fileName: 'FeaturesScene3D.tsx',
                description: 'Features section with floating cards',
                purpose: 'Showcase key features with interactive elements',
                wowFactor: 'Cards that lift and glow on hover',
                objects: [
                    {
                        id: 'feature-orbs',
                        name: 'FeatureOrbs',
                        description: 'Floating orbs representing features',
                        geometry: { type: 'sphereGeometry', args: [0.5, 32, 32] },
                        material: {
                            type: 'meshPhysicalMaterial',
                            properties: { color: secondary, roughness: 0.1, metalness: 0.5, transmission: 0.6 },
                        },
                        position: [0, 0, 0],
                        animation: { type: 'float', amplitude: 0.2, speed: 1 },
                    },
                ],
                lighting: {
                    ambientIntensity: 0.3,
                    lights: [
                        { type: 'directional', position: [0, 10, 5], color: '#ffffff', intensity: 1 },
                    ],
                },
                canvas: {
                    camera: { type: 'perspective', fov: 50, position: [0, 0, 10] },
                    dpr: [1, 1.5],
                    shadows: false,
                },
            },
            {
                id: 'cta-scene',
                name: 'CTAScene3D',
                fileName: 'CTAScene3D.tsx',
                description: 'Call to action section',
                purpose: 'Drive user engagement with stunning visuals',
                wowFactor: 'Pulsing energy ring that expands on scroll',
                objects: [
                    {
                        id: 'cta-ring',
                        name: 'CTARing',
                        description: 'Energy ring',
                        geometry: { type: 'torusGeometry', args: [2, 0.1, 16, 100] },
                        material: {
                            type: 'meshBasicMaterial',
                            properties: { color: accent, transparent: true, opacity: 0.8 },
                        },
                        position: [0, 0, 0],
                        animation: { type: 'pulse', speed: 2 },
                    },
                ],
                lighting: {
                    ambientIntensity: 0.4,
                    lights: [
                        { type: 'point', position: [0, 0, 5], color: accent, intensity: 2 },
                    ],
                },
                canvas: {
                    camera: { type: 'perspective', fov: 45, position: [0, 0, 6] },
                    dpr: [1, 1.5],
                    shadows: false,
                },
            },
        ];
    }

    /**
     * Step 5: Generate page blueprints
     */
    private static generatePageBlueprints(
        businessDNA: BusinessDNA,
        scenes: SceneBlueprint[],
        designTokens: DesignTokens
    ): PageBlueprint[] {

        // Map scenes to sections
        const sections: SectionBlueprint[] = scenes.map((scene, index) => ({
            id: scene.id.replace('-scene', ''),
            name: scene.name.replace('Scene3D', ' Section'),
            type: this.inferSectionType(scene.id),
            yOffset: -index * 10,
            scene,
            uiOverlay: this.generateUIOverlay(scene, businessDNA, designTokens),
            interactions: [
                { trigger: 'scroll', target: 'both', description: 'Parallax movement on scroll' },
                { trigger: 'hover', target: '3d', description: '3D objects respond to mouse' },
            ],
        }));

        const totalScrollPages = Math.max(scenes.length * 1.5, 6);

        // Generate HomePage with all sections
        const homePage: PageBlueprint = {
            name: 'HomePage',
            fileName: 'HomePage.tsx',
            route: '/',
            description: `Main landing page for ${businessDNA.niche}`,
            scrollPages: totalScrollPages,
            sections,
            sceneComponents: scenes.map(s => s.name),
            postProcessing: {
                enabled: true,
                bloom: { intensity: 1.2, luminanceThreshold: 0.3, luminanceSmoothing: 0.9 },
                vignette: { offset: 0.5, darkness: 0.4 },
            },
            metadata: {
                title: `${businessDNA.niche} - ${businessDNA.emotionalTone}`,
                description: businessDNA.businessGoal,
            },
        };

        return [homePage];
    }

    /**
     * Infer section type from scene ID
     */
    private static inferSectionType(sceneId: string): SectionBlueprint['type'] {
        if (sceneId.includes('hero')) return 'hero';
        if (sceneId.includes('feature')) return 'features';
        if (sceneId.includes('showcase') || sceneId.includes('product')) return 'showcase';
        if (sceneId.includes('testimonial')) return 'testimonials';
        if (sceneId.includes('cta') || sceneId.includes('call')) return 'cta';
        if (sceneId.includes('about') || sceneId.includes('story')) return 'about';
        if (sceneId.includes('contact')) return 'contact';
        return 'custom';
    }

    /**
     * Generate UI overlay for a section
     */
    private static generateUIOverlay(
        scene: SceneBlueprint,
        businessDNA: BusinessDNA,
        designTokens: DesignTokens
    ): UIOverlaySpec {
        const sectionType = this.inferSectionType(scene.id);

        const baseOverlay: UIOverlaySpec = {
            layout: 'centered',
            glassmorphism: true,
            animation: { entrance: 'fade-up stagger', delay: 0.2 },
        };

        switch (sectionType) {
            case 'hero':
                return {
                    ...baseOverlay,
                    heading: { text: businessDNA.niche.toUpperCase(), tag: 'h1' },
                    subheading: { text: scene.purpose || 'Experience the future' },
                    cta: { text: 'Get Started', href: '#features', style: 'primary' },
                    layout: 'centered',
                };
            case 'features':
                return {
                    ...baseOverlay,
                    heading: { text: 'Why Choose Us', tag: 'h2' },
                    body: { text: `Discover what makes our ${businessDNA.industry} solutions special` },
                    layout: 'cards-grid',
                };
            case 'cta':
                return {
                    ...baseOverlay,
                    heading: { text: 'Ready to Begin?', tag: 'h2' },
                    subheading: { text: businessDNA.businessGoal },
                    cta: { text: 'Start Now', href: '/contact', style: 'primary' },
                    secondaryCta: { text: 'Learn More', href: '/about', style: 'ghost' },
                    layout: 'centered',
                };
            default:
                return {
                    ...baseOverlay,
                    heading: { text: scene.name.replace('Scene3D', ''), tag: 'h2' },
                    body: { text: scene.description },
                    layout: 'left',
                };
        }
    }

    /**
     * Generate file structure
     */
    private static generateFileStructure(
        pages: PageBlueprint[],
        scenes: SceneBlueprint[]
    ): FileStructureEntry[] {
        const files: FileStructureEntry[] = [];

        // Config files
        files.push(
            { path: 'package.json', type: 'config', description: 'Project dependencies', exports: [], imports: [] },
            { path: 'vite.config.ts', type: 'config', description: 'Vite configuration', exports: ['default'], imports: ['vite', '@vitejs/plugin-react'] },
            { path: 'tailwind.config.js', type: 'config', description: 'Tailwind configuration', exports: ['default'], imports: [] },
            { path: 'tsconfig.json', type: 'config', description: 'TypeScript configuration', exports: [], imports: [] },
        );

        // Core files
        files.push(
            { path: 'src/main.tsx', type: 'utility', description: 'React entry point', exports: [], imports: ['react', 'react-dom'] },
            { path: 'src/App.tsx', type: 'layout', description: 'Root component', exports: ['default'], imports: ['react-router-dom'] },
            { path: 'src/index.css', type: 'utility', description: 'Global styles', exports: [], imports: [] },
        );

        // Layout components
        files.push(
            { path: 'src/components/layout/AppLayout.tsx', type: 'layout', description: 'App layout wrapper', exports: ['AppLayout'], imports: ['react'] },
        );

        // 3D components
        files.push(
            { path: 'src/components/3d/LoadingScreen3D.tsx', type: 'component', description: 'Loading screen', exports: ['LoadingScreen3D'], imports: ['react', 'framer-motion'] },
            { path: 'src/components/3d/NavBar3D.tsx', type: 'component', description: '3D navigation bar', exports: ['NavBar3D'], imports: ['react', 'react-router-dom'] },
            { path: 'src/components/3d/Footer3D.tsx', type: 'component', description: '3D footer', exports: ['Footer3D'], imports: ['react'] },
        );

        // Scene components
        for (const scene of scenes) {
            files.push({
                path: `src/components/3d/${scene.fileName}`,
                type: 'scene',
                description: scene.description,
                exports: [scene.name],
                imports: ['@react-three/fiber', '@react-three/drei', 'three'],
            });
        }

        // Page components
        for (const page of pages) {
            files.push({
                path: `src/pages/${page.fileName}`,
                type: 'page',
                description: page.description,
                exports: [page.name],
                imports: ['react', '@react-three/fiber', '@react-three/drei', ...page.sceneComponents.map(s => `../components/3d/${s}`)],
            });
        }

        return files;
    }

    /**
     * Generate performance rules
     */
    private static generatePerformanceRules(): PerformanceRules {
        return {
            canvas: {
                dpr: [1, 1.5],
                gl: {
                    antialias: true,
                    powerPreference: 'high-performance',
                    alpha: true,
                },
                frameloop: 'demand',
            },
            mobile: {
                reducedParticles: true,
                particleMultiplier: 0.3,
                simplifiedGeometry: true,
                geometrySegmentMultiplier: 0.5,
                disabledEffects: ['ChromaticAberration', 'DepthOfField'],
                reducedShadows: true,
            },
            lazyLoading: {
                scenes: true,
                images: true,
                models: true,
            },
            optimizations: [
                'Use React.lazy for scene components',
                'Implement Suspense with loading fallback',
                'Use InstancedMesh for repeated objects',
                'Dispose geometries and materials on unmount',
                'Use LOD for complex models',
                'Pause animations when off-screen',
            ],
        };
    }

    /**
     * Generate dependencies
     */
    private static generateDependencies(ragContext: RAGContext): Record<string, string> {
        const deps: Record<string, string> = {
            'react': '^18.3.1',
            'react-dom': '^18.3.1',
            'react-router-dom': '^6.22.0',
            'three': '^0.183.1',
            '@react-three/fiber': '^8.16.0',
            '@react-three/drei': '^9.102.0',
            '@react-three/postprocessing': '^2.16.0',
            'postprocessing': '^6.36.0',
            'framer-motion': '^11.1.0',
            'gsap': '^3.12.5',
            'tailwindcss': '^3.4.0',
            'zustand': '^4.5.2',
            'maath': '^0.10.8',
        };

        // Add dependencies based on RAG tags
        if (ragContext.intentTags.includes('smooth_scroll') || ragContext.intentTags.includes('scroll_animation')) {
            deps['lenis'] = '^1.1.2';
        }
        if (ragContext.intentTags.includes('physics')) {
            deps['@react-three/rapier'] = '^1.2.1';
        }

        return deps;
    }

    /**
     * Generate expanded prompt for downstream nodes
     */
    private static generateExpandedPrompt(
        userPrompt: string,
        businessDNA: BusinessDNA,
        brand: BrandIdentity,
        designTokens: DesignTokens,
        scenes: SceneBlueprint[]
    ): string {
        return `
# ${brand.name} - 3D Website Blueprint
## ${brand.tagline}

${brand.elevator}

## Business DNA
- **Industry:** ${businessDNA.industry}
- **Niche:** ${businessDNA.niche}
- **Target Audience:** ${businessDNA.targetAudience}
- **Emotional Tone:** ${businessDNA.emotionalTone}
- **Visual Metaphor:** ${businessDNA.visualMetaphor}
- **Motion Language:** ${businessDNA.motionLanguage}
- **Scene Archetype:** ${businessDNA.sceneArchetype}

## Design System

### Colors
- Primary: ${designTokens.colors.primary}
- Secondary: ${designTokens.colors.secondary}
- Accent: ${designTokens.colors.accent}
- Background: ${designTokens.colors.background}
- Emissive/Glow: ${designTokens.colors.emissive}

### Typography
- Headings: ${designTokens.typography.headingFont}
- Body: ${designTokens.typography.bodyFont}

## 3D Scenes (${scenes.length} total)

${scenes.map((s, i) => `
### Scene ${i + 1}: ${s.name}
**${s.description}**

Purpose: ${s.purpose}
Wow Factor: ${s.wowFactor}

Objects: ${s.objects.map(o => o.name).join(', ')}
`).join('\n')}

## Original Request
"${userPrompt}"
`.trim();
    }

    // ============================================================
    // SERIALIZATION METHODS FOR DOWNSTREAM NODES
    // ============================================================

    /**
     * Format RAG documentation for scene blueprint generation.
     * Provides full documentation content so the LLM can learn from real Three.js patterns.
     */
    private static formatRAGDocsForBlueprint(ragContext: RAGContext): string {
        const sections: string[] = [];

        sections.push('=== THREE.JS API DOCUMENTATION ===\n');

        const threejsDocs = ragContext.threejsDocs || [];
        for (const doc of threejsDocs.slice(0, 40)) {
            sections.push(`### ${doc.name}`);
            const summary = typeof doc.summary === 'string' ? doc.summary : '';
            sections.push(summary);

            if (doc.codeSnippet) {
                sections.push('```tsx');
                sections.push(doc.codeSnippet);
                sections.push('```');
            }
            sections.push('');
        }

        sections.push('\n=== EXTERNAL LIBRARY DOCUMENTATION ===\n');

        const externalDocs = ragContext.externalDocs || [];
        for (const doc of externalDocs) {
            sections.push(`### ${doc.name}`);
            const summary = typeof doc.summary === 'string' ? doc.summary : '';
            sections.push(summary);

            if (doc.codeSnippet) {
                sections.push('```tsx');
                sections.push(doc.codeSnippet);
                sections.push('```');
            }
            sections.push('');
        }

        sections.push('\n=== INTENT TAGS ===');
        sections.push(`Active features: ${ragContext.intentTags.join(', ')}`);

        return sections.join('\n');
    }

    /**
     * Get GLSL shader code templates for custom materials
     */
    private static getShaderTemplates(): string {
        return `
### Vertex Shader (Base with displacement)
\`\`\`glsl
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vWorldPosition;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vPosition = position;
  vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
\`\`\`

### Fragment Shader (Aurora / Northern Lights)
\`\`\`glsl
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
varying vec2 vUv;
varying vec3 vNormal;

void main() {
  float wave1 = sin(vUv.x * 6.0 + uTime * 0.7) * 0.5 + 0.5;
  float wave2 = sin(vUv.x * 4.0 - uTime * 0.5 + 2.0) * 0.5 + 0.5;
  float wave3 = sin(vUv.y * 8.0 + uTime * 0.3) * 0.5 + 0.5;
  float mask = smoothstep(0.2, 0.8, vUv.y + wave1 * 0.3);
  vec3 col = mix(uColor1, uColor2, wave1);
  col = mix(col, uColor3, wave2 * wave3);
  float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);
  col += fresnel * uColor2 * 0.6;
  float alpha = mask * (0.4 + fresnel * 0.6);
  gl_FragColor = vec4(col, alpha);
}
\`\`\`

### Fragment Shader (Liquid Metal)
\`\`\`glsl
uniform float uTime;
uniform vec3 uColor;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

void main() {
  float n = noise(vUv * 5.0 + uTime * 0.3) * 0.5 +
            noise(vUv * 10.0 - uTime * 0.2) * 0.25 +
            noise(vUv * 20.0 + uTime * 0.1) * 0.125;
  float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
  vec3 reflection = uColor * (0.6 + n * 0.8);
  vec3 col = mix(reflection, vec3(1.0), fresnel * 0.7);
  col += uColor * fresnel * 0.5;
  gl_FragColor = vec4(col, 1.0);
}
\`\`\`

### Vertex Shader (Noise Terrain Displacement)
\`\`\`glsl
uniform float uTime;
uniform float uAmplitude;
varying vec2 vUv;
varying float vElevation;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), f.x),
             mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y);
}

void main() {
  vUv = uv;
  float elevation = noise(uv * 4.0 + uTime * 0.15) * uAmplitude;
  elevation += noise(uv * 8.0 - uTime * 0.1) * uAmplitude * 0.5;
  vElevation = elevation;
  vec3 pos = position + normal * elevation;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
\`\`\`

### Fragment Shader (Fresnel Rim Glow)
\`\`\`glsl
uniform float uTime;
uniform vec3 uGlowColor;
uniform float uGlowPower;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vec3 viewDir = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), uGlowPower);
  float pulse = sin(uTime * 2.0) * 0.15 + 0.85;
  vec3 col = uGlowColor * fresnel * pulse * 2.0;
  float alpha = fresnel * 0.9;
  gl_FragColor = vec4(col, alpha);
}
\`\`\`

### Fragment Shader (Dissolve / Disintegration)
\`\`\`glsl
uniform float uTime;
uniform float uProgress;
uniform vec3 uEdgeColor;
uniform vec3 uBaseColor;
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  f = f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),
             mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
}

void main() {
  float n = noise(vUv * 8.0) * 0.5 + noise(vUv * 16.0) * 0.25 + noise(vUv * 32.0) * 0.125;
  float edge = smoothstep(uProgress - 0.05, uProgress, n) - smoothstep(uProgress, uProgress + 0.05, n);
  if (n < uProgress) discard;
  vec3 col = mix(uBaseColor, uEdgeColor, edge * 3.0);
  col += uEdgeColor * edge * 2.0;
  gl_FragColor = vec4(col, 1.0);
}
\`\`\`

### Fragment Shader (Iridescent / Thin-Film)
\`\`\`glsl
uniform float uTime;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vec3 viewDir = normalize(cameraPosition - vPosition);
  float angle = dot(viewDir, vNormal);
  float shift = angle * 6.28 + uTime * 0.5;
  vec3 iridescence = vec3(
    sin(shift) * 0.5 + 0.5,
    sin(shift + 2.094) * 0.5 + 0.5,
    sin(shift + 4.189) * 0.5 + 0.5
  );
  float fresnel = pow(1.0 - abs(angle), 2.0);
  vec3 col = mix(vec3(0.05), iridescence, fresnel * 0.8 + 0.2);
  col += iridescence * fresnel * 0.3;
  gl_FragColor = vec4(col, 0.85 + fresnel * 0.15);
}
\`\`\`

### Fragment Shader (Plasma Energy)
\`\`\`glsl
uniform float uTime;
uniform vec3 uColor;
varying vec2 vUv;

void main() {
  float v1 = sin(vUv.x * 10.0 + uTime);
  float v2 = sin(vUv.y * 10.0 + uTime * 0.5);
  float v3 = sin((vUv.x + vUv.y) * 10.0 + uTime * 0.7);
  float v4 = sin(sqrt(vUv.x * vUv.x + vUv.y * vUv.y) * 10.0 + uTime);
  float plasma = (v1 + v2 + v3 + v4) * 0.25;
  vec3 col = uColor * (plasma * 0.5 + 0.5);
  col = pow(col, vec3(0.8));
  float glow = smoothstep(0.3, 0.7, plasma * 0.5 + 0.5);
  col += uColor * glow * 0.4;
  gl_FragColor = vec4(col, 0.85);
}
\`\`\`

### Vertex Shader (Particle Nebula Morph)
\`\`\`glsl
uniform float uTime;
uniform float uMorph;
attribute vec3 targetPosition;
varying float vAlpha;

void main() {
  vec3 morphed = mix(position, targetPosition, uMorph);
  morphed += sin(morphed * 2.0 + uTime) * 0.1;
  vAlpha = 0.3 + 0.7 * (1.0 - length(morphed) * 0.15);
  vec4 mvPosition = modelViewMatrix * vec4(morphed, 1.0);
  gl_PointSize = (150.0 / -mvPosition.z) * (0.5 + sin(uTime + float(gl_VertexID) * 0.01) * 0.3);
  gl_Position = projectionMatrix * mvPosition;
}
\`\`\`

### React Three Fiber ShaderMaterial Usage
\`\`\`tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = \`...\`;
const fragmentShader = \`...\`;

function CustomShaderMesh() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh>
      <icosahedronGeometry args={[1, 4]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uColor: { value: new THREE.Color('#00ffff') }
        }}
        transparent
      />
    </mesh>
  );
}
\`\`\`
`.trim();
    }

    /**
     * Get React Three Fiber animation patterns
     */
    private static getAnimationPatterns(): string {
        return `
### Pulse Animation
\`\`\`tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function PulsingMesh({ speed = 2 }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * speed) * 0.2;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return <mesh ref={meshRef}>{/* geometry & material */}</mesh>;
}
\`\`\`

### Orbit Animation
\`\`\`tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function OrbitingMesh({ radius = 3, speed = 1 }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * speed;
      meshRef.current.position.x = Math.cos(t) * radius;
      meshRef.current.position.z = Math.sin(t) * radius;
    }
  });

  return <mesh ref={meshRef}>{/* geometry & material */}</mesh>;
}
\`\`\`

### Rotation Animation
\`\`\`tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function RotatingMesh({ axis = 'y', speed = 0.01 }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation[axis] += speed;
    }
  });

  return <mesh ref={meshRef}>{/* geometry & material */}</mesh>;
}
\`\`\`

### Float Animation (Using Drei)
\`\`\`tsx
import { Float } from '@react-three/drei';

function FloatingMesh() {
  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={1}
      floatingRange={[-0.5, 0.5]}
    >
      <mesh>{/* geometry & material */}</mesh>
    </Float>
  );
}
\`\`\`

### Combined Animation (Rotation + Position)
\`\`\`tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ComplexAnimation({ speed = 1 }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Rotate
      groupRef.current.rotation.y += 0.01 * speed;
      // Float up and down
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * speed) * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>{/* geometry & material */}</mesh>
    </group>
  );
}
\`\`\`
`.trim();
    }

    /**
     * Get interaction code patterns for hover, click, etc.
     */
    private static getInteractionPatterns(): string {
        return `
### Hover Effect (Scale Up)
\`\`\`tsx
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function HoverableMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const targetScale = hovered ? 1.3 : 1;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? '#ff6b6b' : '#4ecdc4'} />
    </mesh>
  );
}
\`\`\`

### Hover Effect (Material Emissive Glow)
\`\`\`tsx
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function GlowOnHover() {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (materialRef.current) {
      const target = hovered ? 1 : 0;
      materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        materialRef.current.emissiveIntensity,
        target,
        0.1
      );
    }
  });

  return (
    <mesh
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#4ecdc4"
        emissive="#00ffff"
        emissiveIntensity={0}
      />
    </mesh>
  );
}
\`\`\`

### Click Effect (Explode Particles)
\`\`\`tsx
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ClickToExplode() {
  const [clicked, setClicked] = useState(false);
  const particlesRef = useRef<THREE.Points>(null);

  useFrame(() => {
    if (particlesRef.current && clicked) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += (Math.random() - 0.5) * 0.1;     // x
        positions[i + 1] += (Math.random() - 0.5) * 0.1; // y
        positions[i + 2] += (Math.random() - 0.5) * 0.1; // z
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef} onClick={() => setClicked(true)}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={100}
          array={new Float32Array(100 * 3).map(() => (Math.random() - 0.5) * 2)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" />
    </points>
  );
}
\`\`\`

### Mouse Follow (Camera or Object)
\`\`\`tsx
import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function MouseFollower() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        pointer.x * 3,
        0.1
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        pointer.y * 3,
        0.1
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="#ff6b6b" />
    </mesh>
  );
}
\`\`\`

### Raycaster Hover Detection (Multiple Objects)
\`\`\`tsx
import { useState } from 'react';

function InteractiveScene() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <>
      {[1, 2, 3].map((id) => (
        <mesh
          key={id}
          position={[(id - 2) * 2, 0, 0]}
          onPointerOver={() => setHoveredId(\`mesh-\${id}\`)}
          onPointerOut={() => setHoveredId(null)}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={hoveredId === \`mesh-\${id}\` ? '#ff6b6b' : '#4ecdc4'}
          />
        </mesh>
      ))}
    </>
  );
}
\`\`\`
`.trim();
    }

    /**
     * Serialize master context for LLM consumption with full documentation
     */
    static serializeForLLM(context: MasterContext3D, maxTokens: number = 40000): string {
        const sections: string[] = [];

        // Brand and business DNA
        sections.push(`# ${context.brand.name}`);
        sections.push(`Tagline: ${context.brand.tagline}`);
        sections.push(`Industry: ${context.businessDNA.industry} / ${context.businessDNA.niche}`);
        sections.push(`Visual Metaphor: ${context.businessDNA.visualMetaphor}`);
        sections.push(`Motion Language: ${context.businessDNA.motionLanguage}`);
        sections.push('');

        // Design tokens
        sections.push('## Design Tokens');
        sections.push(`Colors: primary=${context.designTokens.colors.primary}, secondary=${context.designTokens.colors.secondary}, accent=${context.designTokens.colors.accent}, emissive=${context.designTokens.colors.emissive}, bg=${context.designTokens.colors.background}`);
        sections.push(`Typography: heading=${context.designTokens.typography.headingFont}, body=${context.designTokens.typography.bodyFont}`);
        sections.push(`Animation: timing=${context.designTokens.animation.timing}, duration=${context.designTokens.animation.duration.normal}`);
        sections.push('');

        // Scene blueprints with details
        sections.push('## Scene Blueprints');
        for (const scene of context.scenes) {
            sections.push(`### ${scene.name}`);
            sections.push(`**${scene.description}**`);
            sections.push(`Purpose: ${scene.purpose}`);
            sections.push(`Wow Factor: ${scene.wowFactor}`);
            sections.push(`Objects: ${scene.objects.map(o => `${o.name} (${o.geometry.type}, ${o.material.type})`).join(', ')}`);
            if (scene.particles) {
                sections.push(`Particles: ${scene.particles.type} (${scene.particles.count} particles)`);
            }
            if (scene.postProcessing) {
                const effects = [];
                if (scene.postProcessing.bloom) effects.push('Bloom');
                if (scene.postProcessing.vignette) effects.push('Vignette');
                if (scene.postProcessing.chromaticAberration) effects.push('ChromaticAberration');
                if (scene.postProcessing.depthOfField) effects.push('DepthOfField');
                if (scene.postProcessing.noise) effects.push('Noise');
                if (effects.length > 0) {
                    sections.push(`Post-Processing: ${effects.join(', ')}`);
                }
            }
        }
        sections.push('');

        if (context.ragContext.threejsDocs.length > 0) {
            sections.push('## Three.js Documentation');
            sections.push(`Available docs (${context.ragContext.threejsDocs.length}):`);
            for (const doc of context.ragContext.threejsDocs.slice(0, 40)) {
                sections.push(`### ${doc.name}`);
                sections.push(doc.summary);
                if (doc.codeSnippet) {
                    sections.push('```tsx');
                    sections.push(doc.codeSnippet);
                    sections.push('```');
                }
                sections.push('');
            }
        }

        if (context.ragContext.externalDocs.length > 0) {
            sections.push('## External Libraries');
            for (const doc of context.ragContext.externalDocs) {
                sections.push(`### ${doc.name}`);
                sections.push(doc.summary);
                if (doc.codeSnippet) {
                    sections.push('```tsx');
                    sections.push(doc.codeSnippet);
                    sections.push('```');
                }
                sections.push('');
            }
        }

        // Add shader code templates
        sections.push('## Shader Code Templates');
        sections.push(this.getShaderTemplates());
        sections.push('');

        // Add animation patterns
        sections.push('## Animation Patterns (React Three Fiber)');
        sections.push(this.getAnimationPatterns());
        sections.push('');

        // Add interaction patterns
        sections.push('## Interaction Patterns');
        sections.push(this.getInteractionPatterns());
        sections.push('');

        // Performance rules
        sections.push('## Performance Rules');
        sections.push(context.performance.optimizations.join(', '));
        sections.push('');

        // Intent tags for reference
        sections.push(`## 3D Features: ${context.ragContext.intentTags.join(', ')}`);

        return sections.join('\n');
    }

    /**
     * Extract context for a specific scene
     */
    static extractSceneContext(context: MasterContext3D, sceneName: string): string {
        const scene = context.scenes.find(s => s.name === sceneName || s.id === sceneName);
        if (!scene) return '';

        return `
# Scene: ${scene.name}
${scene.description}

## Purpose
${scene.purpose}

## Wow Factor
${scene.wowFactor}

## Objects
${JSON.stringify(scene.objects, null, 2)}

## Lighting
${JSON.stringify(scene.lighting, null, 2)}

## Particles
${scene.particles ? JSON.stringify(scene.particles, null, 2) : 'None'}

## Canvas Config
${JSON.stringify(scene.canvas, null, 2)}

## Design Tokens
Primary: ${context.designTokens.colors.primary}
Secondary: ${context.designTokens.colors.secondary}
Emissive: ${context.designTokens.colors.emissive}
Background: ${context.designTokens.colors.background}
`.trim();
    }

    /**
     * Extract context for a specific page
     */
    static extractPageContext(context: MasterContext3D, pageName: string): string {
        const page = context.pages.find(p => p.name === pageName);
        if (!page) return '';

        return `
# Page: ${page.name}
Route: ${page.route}
${page.description}

## Sections (${page.sections.length})
${page.sections.map(s => `- ${s.name} (${s.type})`).join('\n')}

## Scene Components to Import
${page.sceneComponents.join(', ')}

## Scroll Pages: ${page.scrollPages}

## Design Tokens
Primary: ${context.designTokens.colors.primary}
Background: ${context.designTokens.colors.background}
Heading Font: ${context.designTokens.typography.headingFont}
`.trim();
    }

    // ============================================================
    // UTILITY METHODS
    // ============================================================

    private static lightenColor(hex: string, percent: number): string {
        const num = parseInt(hex.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.min(255, (num >> 16) + amt);
        const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
        const B = Math.min(255, (num & 0x0000FF) + amt);
        return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
    }

    private static darkenColor(hex: string, percent: number): string {
        const num = parseInt(hex.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.max(0, (num >> 16) - amt);
        const G = Math.max(0, ((num >> 8) & 0x00FF) - amt);
        const B = Math.max(0, (num & 0x0000FF) - amt);
        return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
    }

    private static isLightColor(hex: string): boolean {
        const num = parseInt(hex.replace('#', ''), 16);
        const R = num >> 16;
        const G = (num >> 8) & 0x00FF;
        const B = num & 0x0000FF;
        const luminance = (0.299 * R + 0.587 * G + 0.114 * B) / 255;
        return luminance > 0.5;
    }
}
