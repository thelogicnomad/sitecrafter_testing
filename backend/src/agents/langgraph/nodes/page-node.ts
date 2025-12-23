/**
 * Page Node - Generates page components
 * Uses Mem0 for persistent context between LLM calls
 * ENHANCED: Production-level UI with full feature implementation
 */

import { WebsiteState, GeneratedFile, createRegistryEntry, generateFileContext } from '../graph-state';
import { invokeLLM, parseChirActions, extractExports, extractImports } from '../llm-utils';
import { storeFileMemory, getAllFileMemories, FileMemory } from '../memory-utils';
import { notifyFileCreated, notifyPhaseChange } from '../website-graph';

export async function pageNode(state: WebsiteState): Promise<Partial<WebsiteState>> {
  console.log('\n📄 ═══════════════════════════════════════════');
  console.log('📄 NODE: PAGES');
  console.log('📄 ═══════════════════════════════════════════\n');

  // Notify phase change for streaming
  notifyPhaseChange('pages');

  const blueprint = state.blueprint;
  if (!blueprint) {
    throw new Error('No blueprint available');
  }

  const files = new Map<string, GeneratedFile>();
  const registry = new Map(state.fileRegistry);

  // Get FULL context from both registry AND Mem0
  const existingContext = generateFileContext(registry);
  const memoryContext = await getAllFileMemories(state.projectId);

  console.log(`   🧠 Memory context loaded: ${memoryContext.length} chars`);

  const systemPrompt = `You are a SENIOR FRONTEND ARCHITECT generating PRODUCTION-READY page components that look STUNNING.

═══════════════════════════════════════════════════════════════════════════════
🎨 CRITICAL: VISUAL DESIGN RULES (ZERO TOLERANCE FOR POOR UI)
═══════════════════════════════════════════════════════════════════════════════

**COLOR CONTRAST IS MANDATORY:**

Dark Mode Sections (bg-slate-900, bg-gray-900):
- Heading text: text-white or text-slate-50
- Body text: text-slate-300 or text-gray-300
- Muted text: text-slate-400

Light Mode Sections (bg-white, bg-slate-50):
- Heading text: text-slate-900 or text-gray-900
- Body text: text-slate-700 or text-gray-700
- Muted text: text-slate-500

❌ NEVER DO THIS:
- text-gray-300 on bg-white (invisible!)
- text-slate-200 on bg-slate-100 (no contrast!)
- text-gray-400 on bg-gray-100 (can't read!)

✅ ALWAYS DO THIS:
- text-white on bg-slate-900 ✓
- text-slate-900 on bg-white ✓
- text-slate-300 on bg-gray-800 ✓

═══════════════════════════════════════════════════════════════════════════════
📐 RESPONSIVE LAYOUT PATTERNS (MANDATORY)
═══════════════════════════════════════════════════════════════════════════════

**SECTION STRUCTURE:**
<section className="py-16 md:py-20 lg:py-24 bg-white">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    {/* Content */}
  </div>
</section>

**HERO SECTIONS:**
<section className="relative min-h-[80vh] flex items-center py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6">
      Main Heading Here
    </h1>
    <p className="text-lg md:text-xl lg:text-2xl text-slate-300 max-w-3xl mb-8">
      Subheading with good contrast
    </p>
  </div>
</section>

**CARD GRIDS:**
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
  {items.map(item => (
    <Card key={item.id} className="h-full" />
  ))}
</div>

**TEXT SIZING (Responsive):**
- Hero H1: text-4xl md:text-5xl lg:text-6xl xl:text-7xl
- Section H2: text-3xl md:text-4xl lg:text-5xl
- Card H3: text-xl md:text-2xl
- Body: text-base md:text-lg lg:text-xl
- Small: text-sm md:text-base

═══════════════════════════════════════════════════════════════════════════════
🖼️ IMAGES - MANDATORY (Use picsum.photos - CORS-friendly!)
═══════════════════════════════════════════════════════════════════════════════

**NEVER use source.unsplash.com - it has CORS issues!**

ALWAYS use picsum.photos format:
- https://picsum.photos/800/600?random=1
- https://picsum.photos/800/600?random=2
- https://picsum.photos/400/300?random=3

Use different random numbers for different images to get variety!

**MANDATORY IMAGE ERROR HANDLING in EVERY component with images:**

const [imgError, setImgError] = useState(false);

<div className="relative h-48 bg-gradient-to-br from-indigo-100 to-purple-100 overflow-hidden">
  {!imgError ? (
    <img
      src="https://picsum.photos/800/600?random=1"
      alt="Description"
      className="w-full h-full object-cover"
      onError={() => setImgError(true)}
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-200 to-purple-200">
      <span className="text-slate-500 text-sm">Image unavailable</span>
    </div>
  )}
</div>

**MANDATORY cn utility - define at top of EVERY file that uses conditional classes:**
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

═══════════════════════════════════════════════════════════════════════════════

CRITICAL OUTPUT FORMAT - Each file MUST use <chirAction> tags:

<chirAction type="file" filePath="src/pages/HomePage.tsx">
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero with VISIBLE text */}
      <section className="min-h-[80vh] flex items-center bg-gradient-to-br from-slate-900 to-indigo-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Clear Visible Heading
          </motion.h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl">
            Visible subheading with good contrast on dark background
          </p>
          <Button size="lg">Get Started</Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
</chirAction>

NEVER use markdown. ALWAYS use <chirAction> tags.`;

  const userPrompt = `Generate ALL page components for "${blueprint.projectName}":

═══════════════════════════════════════════════════════════════════════════════
🧠 MEMORY CONTEXT (Previously Generated Components)
═══════════════════════════════════════════════════════════════════════════════
${memoryContext}

═══════════════════════════════════════════════════════════════════════════════
📦 AVAILABLE COMPONENTS (IMPORT AND USE THESE)
═══════════════════════════════════════════════════════════════════════════════
${existingContext}

IMPORT PATTERNS:
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Star } from 'lucide-react';

═══════════════════════════════════════════════════════════════════════════════
🎨 DESIGN SYSTEM
═══════════════════════════════════════════════════════════════════════════════
- Primary: ${blueprint.designSystem.primaryColor}
- Secondary: ${blueprint.designSystem.secondaryColor}
- Accent: ${blueprint.designSystem.accentColor}
- Style: ${blueprint.designSystem.style}

MANDATORY COLOR USAGE:
- Dark sections: bg-slate-900 with text-white headings, text-slate-300 body
- Light sections: bg-white with text-slate-900 headings, text-slate-700 body
- CTAs: bg-indigo-600 hover:bg-indigo-700 text-white
- Cards: bg-white shadow-lg rounded-xl with text-slate-900

═══════════════════════════════════════════════════════════════════════════════
📋 BLUEPRINT FEATURES TO IMPLEMENT
═══════════════════════════════════════════════════════════════════════════════
${blueprint.features.map(f => `✅ ${f.name}: ${f.description} [Priority: ${f.priority}]`).join('\n')}

ALL of these features MUST be visible and implemented in the pages!

═══════════════════════════════════════════════════════════════════════════════
📄 PAGES TO GENERATE
═══════════════════════════════════════════════════════════════════════════════
${blueprint.pages.map(page => `
═══ ${page.name} (src/pages/${page.name.replace(/\s+/g, '')}.tsx) ═══
Route: ${page.route}
Description: ${page.description}

REQUIRED SECTIONS (3-5 minimum):
${page.sections?.map((s, i) => `${i + 1}. ${s}`).join('\n') || '1. Hero Section\n2. Features Grid\n3. Content Section\n4. CTA Section'}

Uses components: ${page.components?.join(', ') || 'Button, Card, Badge'}

MUST INCLUDE:
- Responsive layout (mobile/tablet/desktop)
- High contrast text (readable on all backgrounds)
- Working images (use Unsplash URLs)
- Real content (no lorem ipsum)
- Export: export default ${page.name.replace(/\s+/g, '')};
`).join('\n')}

═══════════════════════════════════════════════════════════════════════════════
⚠️ CRITICAL REQUIREMENTS (ZERO TOLERANCE)
═══════════════════════════════════════════════════════════════════════════════
1. VISIBLE TEXT: All text must be readable. Dark bg = light text, Light bg = dark text
2. RESPONSIVE: Every element must work from 320px to 4K screens
3. WORKING IMAGES: Use provided Unsplash URLs or gradient fallbacks
4. REAL CONTENT: No placeholder text, create meaningful content for ${blueprint.projectName}
5. ALL FEATURES: Implement every feature from blueprint
6. PROPER IMPORTS: Import components from @/components/ui/ and @/components/features/
7. DEFAULT EXPORT: Each page must have export default PageName;
8. NO APPLAYOUT WRAPPER: Pages render inside AppLayout via Outlet`;

  try {
    const response = await invokeLLM(systemPrompt, userPrompt, 0.7);
    const parsedFiles = parseChirActions(response);

    for (const { path, content } of parsedFiles) {
      await addFileWithMemory(files, registry, path, content, 'page', state.projectId);
    }

    console.log(`\n✅ Page files generated: ${files.size}`);
    files.forEach((_, path) => console.log(`   📄 ${path}`));

    return {
      files,
      fileRegistry: registry,
      currentPhase: 'page',
      messages: [`Pages created: ${files.size} files`]
    };

  } catch (error: any) {
    console.error('❌ Page generation failed:', error.message);
    throw error;
  }
}

async function addFileWithMemory(
  files: Map<string, GeneratedFile>,
  registry: Map<string, any>,
  path: string,
  content: string,
  phase: string,
  projectId: string
) {
  const exports = extractExports(content);
  const imports = extractImports(content);

  const file: GeneratedFile = { path, content, phase, exports, imports };
  files.set(path, file);
  registry.set(path, createRegistryEntry(file));

  // Stream file to frontend
  notifyFileCreated(file);

  // Store in Mem0
  await storeFileMemory(projectId, {
    path,
    exports,
    imports,
    type: 'page',
    phase,
    contentPreview: content.substring(0, 300)
  });
}
