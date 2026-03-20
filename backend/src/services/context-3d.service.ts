import fs from 'fs';
import path from 'path';
import axios from 'axios';
import OpenAI from 'openai';

// Use process.cwd() to reliably point to the source JSON file, even when running compiled from build/
const CONTEXT_MAP_PATH = path.resolve(process.cwd(), 'src/ui/3d-ui-components.json');

interface IntentMapEntry {
    keywords: string[];
    threejs_docs: string[];
    external_docs?: string[];
}

interface ExternalLibEntry {
    crawl_url: string;
    fetch_method: string;
    description: string;
    keywords: string[];
    codesnippet: string;
    dependencies: string;
}

interface ContextMap {
    meta: {
        version: string;
        threejs_base_url: string;
        fetch_strategy: { threejs: string; external: string };
    };
    threejs_pages: Record<string, string[]>;
    external_libraries: Record<string, ExternalLibEntry>;
    intent_map: Record<string, IntentMapEntry>;
    core_docs_always_included: string[];
}

let cachedMap: ContextMap | null = null;

function loadContextMap(): ContextMap {
    if (cachedMap) return cachedMap;
    const raw = fs.readFileSync(CONTEXT_MAP_PATH, 'utf-8');
    cachedMap = JSON.parse(raw) as ContextMap;
    console.log(`[context-3d] Loaded 3d-ui-components.json (v${cachedMap.meta.version})`);
    return cachedMap;
}

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

export async function classifyIntents(expandedBrief: string): Promise<string[]> {
    const contextMap = loadContextMap();
    const validTags = Object.keys(contextMap.intent_map);

    const systemPrompt = 'You are a 3D web technology classifier. Return ONLY a JSON array of strings. No markdown, no explanation.';

    // NOTE: We deliberately do NOT hardcode "lighting" or "post_processing" here.
    // Those docs are already in core_docs_always_included and will always be fetched.
    // Forcing them as classifier tags wastes the extra-doc budget and makes every site
    // feel identical. Instead we ask the classifier to pick tags that are SPECIFIC and
    // UNIQUE to this brief — giving the generator LLM the right context to build
    // something genuinely different each time.
    const userPrompt = `You are classifying a 3D website brief to select the most SPECIFIC and THEMATICALLY APPROPRIATE documentation tags.

AVAILABLE TAGS:
${JSON.stringify(validTags)}

BRIEF (first 3000 chars):
"${expandedBrief.slice(0, 3000)}"

RULES:
- Return ONLY tags from the list above.
- Return between 5 and 12 tags.
- PRIORITIZE tags that are UNIQUE to this specific brief — pick tags that reflect the brand, mood, and visual identity described (e.g. a bakery site might emphasize "environment_maps", "particles", "custom_materials"; a college site might emphasize "text_3d", "scroll_animation", "instancing").
- Do NOT default to generic tags just because all 3D scenes need lights. Core lighting docs are always included automatically. Only include a lighting-specific tag (e.g. "lighting", "shadows") if the brief specifically calls for dramatic shadow work, colored theatrical lighting, or a distinctive light-driven aesthetic.
- Do NOT include "post_processing" unless the brief specifically needs cinematic post effects beyond the standard bloom/vignette. Standard post effects are always included automatically.
- Think about what makes THIS site visually distinct from every other 3D site. Favor tags that enable that distinctiveness.
- If the brief mentions scroll/camera path, include "scroll_animation".
- If the brief involves products, objects, or characters that need to be interactive or animated, include "animation" and/or "models".
- If the brief calls for a strong atmosphere (fog, particles, environmental effects), include those specific tags.

Return ONLY a JSON array of strings.`;

    for (let attempt = 0; attempt < 3; attempt++) {
        try {
            rotateKey();
            const client = getClient();
            const response = await client.chat.completions.create({
                model: 'gemini-2.5-flash-lite',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt },
                ],
                temperature: 0.4, // Slightly higher than before to encourage creative tag selection
            });

            const content = response.choices[0]?.message?.content || '[]';
            const cleaned = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
            const match = cleaned.match(/\[[\s\S]*\]/);
            if (match) {
                const parsed = JSON.parse(match[0]) as string[];
                const filtered = parsed.filter(tag => validTags.includes(tag));
                if (filtered.length >= 3) {
                    console.log(`[context-3d] Classified ${filtered.length} intent tags: ${filtered.join(', ')}`);
                    return filtered;
                }
            }
        } catch (err: any) {
            console.warn(`[context-3d] Classification attempt ${attempt + 1} failed: ${err.message?.slice(0, 80)}`);
            rotateKey();
        }
    }

    // Fallback: use a generic set that still avoids duplicating core docs
    const fallback = ['shaders_custom', 'particles', 'scroll_animation', 'environment_maps', 'animation'];
    console.warn(`[context-3d] Classification failed, using fallback tags: ${fallback.join(', ')}`);
    return fallback;
}

export interface ResolvedContext {
    threejsDocs: { name: string; content: string }[];
    externalDocs: { name: string; content: string }[];
}

export async function resolveContext(intentTags: string[]): Promise<ResolvedContext> {
    const contextMap = loadContextMap();

    const threejsDocNames = new Set<string>(contextMap.core_docs_always_included);
    const externalLibKeys = new Set<string>();

    for (const tag of intentTags) {
        const entry = contextMap.intent_map[tag];
        if (!entry) continue;

        if (entry.threejs_docs) {
            entry.threejs_docs.forEach(name => threejsDocNames.add(name));
        }
        if (entry.external_docs) {
            entry.external_docs.forEach(key => externalLibKeys.add(key));
        }
    }

    let uniqueThreejsNames = Array.from(threejsDocNames);
    const coreCount = contextMap.core_docs_always_included.length;

    // Increased from coreCount + 8 to coreCount + 14, then to coreCount + 20 (40 total docs)
    // to enable advanced techniques like SSR, custom shader materials, cinematic cameras,
    // and performance optimization. This ensures unique intent-tag docs reach the generator
    // LLM with room for truly impressive 3D effects.
    if (uniqueThreejsNames.length > coreCount + 20) {
        uniqueThreejsNames = uniqueThreejsNames.slice(0, coreCount + 20);
    }
    const uniqueExternalKeys = Array.from(externalLibKeys);

    console.log(`[context-3d] Resolving ${uniqueThreejsNames.length} Three.js docs + ${uniqueExternalKeys.length} external libs...`);

    const baseUrl = contextMap.meta.threejs_base_url;

    const threejsFetchPromises = uniqueThreejsNames.map(async (name): Promise<{ name: string; content: string }> => {
        const url = baseUrl.replace('{name}', name);
        try {
            const response = await axios.get(url, {
                timeout: 10000,
                headers: { 'User-Agent': 'SiteCrafter/3.0' },
                responseType: 'text',
            });
            const content = (response.data as string).trim();
            if (content.length < 30) {
                return { name, content: '' };
            }
            return { name, content: content.slice(0, 12000) }; // Increased to 12KB for richer documentation
        } catch (err: any) {
            console.warn(`[context-3d] Three.js fetch failed for "${name}": ${err.message?.slice(0, 60)}`);
            return { name, content: '' };
        }
    });

    const externalFetchPromises = uniqueExternalKeys.map(async (key): Promise<{ name: string; content: string }> => {
        const lib = contextMap.external_libraries[key];
        if (!lib) return { name: key, content: '' };

        try {
            if (!process.env.TAVILY_API_KEY) {
                throw new Error('No TAVILY_API_KEY set');
            }

            const { data } = await axios.post(
                'https://api.tavily.com/extract',
                {
                    api_key: process.env.TAVILY_API_KEY,
                    urls: [lib.crawl_url],
                },
                { timeout: 25000 }
            );

            const results = data?.results || [];
            if (results.length > 0 && results[0].raw_content) {
                const content = (results[0].raw_content as string).slice(0, 15000);
                console.log(`[context-3d] Tavily extract for "${key}": ${content.length} chars`);
                return { name: key, content };
            }

            throw new Error('Empty Tavily extract response');
        } catch (err: any) {
            console.warn(`[context-3d] Tavily extract failed for "${key}" (${err.message?.slice(0, 60)}), falling back to codesnippet`);
            const fallbackContent = [
                `# ${key}`,
                `Description: ${lib.description}`,
                `Dependencies: ${lib.dependencies}`,
                '',
                '## Code Reference',
                '```',
                lib.codesnippet,
                '```',
            ].join('\n');
            return { name: key, content: fallbackContent };
        }
    });

    const [threejsResults, externalResults] = await Promise.all([
        Promise.all(threejsFetchPromises),
        Promise.all(externalFetchPromises),
    ]);

    const threejsDocs = threejsResults.filter(r => r.content.length > 0);
    const externalDocs = externalResults.filter(r => r.content.length > 0);

    console.log(`[context-3d] Fetched ${threejsDocs.length}/${uniqueThreejsNames.length} Three.js docs, ${externalDocs.length}/${uniqueExternalKeys.length} external docs`);

    return { threejsDocs, externalDocs };
}

export function formatDocsForPrompt(resolved: ResolvedContext): string {
    const sections: string[] = [];

    if (resolved.threejsDocs.length > 0) {
        sections.push('=== THREE.JS DOCUMENTATION ===');
        sections.push('');
        for (const doc of resolved.threejsDocs) {
            sections.push(`--- ${doc.name} ---`);
            sections.push(doc.content);
            sections.push('');
        }
        sections.push('=== END THREE.JS DOCUMENTATION ===');
    }

    if (resolved.externalDocs.length > 0) {
        sections.push('');
        sections.push('=== EXTERNAL LIBRARY DOCUMENTATION ===');
        sections.push('');
        for (const doc of resolved.externalDocs) {
            sections.push(`--- ${doc.name} ---`);
            sections.push(doc.content);
            sections.push('');
        }
        sections.push('=== END EXTERNAL LIBRARY DOCUMENTATION ===');
    }

    const result = sections.join('\n');
    console.log(`[context-3d] Formatted documentation context: ${result.length} chars`);
    return result;
}