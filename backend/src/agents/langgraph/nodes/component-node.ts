/**
 * Component Node - Generates UI and feature components
 * Uses Mem0 for persistent context between LLM calls
 * ENHANCED: Production-level UI with contrast rules and reliable images
 */

import { WebsiteState, GeneratedFile, createRegistryEntry, generateFileContext } from '../graph-state';
import { invokeLLM, parseChirActions, extractExports, extractImports } from '../llm-utils';
import { storeFileMemory, getAllFileMemories, FileMemory } from '../memory-utils';
import { notifyFileCreated, notifyPhaseChange } from '../website-graph';

export async function componentNode(state: WebsiteState): Promise<Partial<WebsiteState>> {
  console.log('\n🧩 ═══════════════════════════════════════════');
  console.log('🧩 NODE: COMPONENTS');
  console.log('🧩 ═══════════════════════════════════════════\n');

  // Notify phase change for streaming
  notifyPhaseChange('components');

  const blueprint = state.blueprint;
  if (!blueprint) {
    throw new Error('No blueprint available');
  }

  const files = new Map<string, GeneratedFile>();
  const registry = new Map(state.fileRegistry);

  // Get context from both registry AND Mem0
  const existingContext = generateFileContext(registry);
  const memoryContext = await getAllFileMemories(state.projectId);

  const systemPrompt = `You are a senior React developer generating PRODUCTION-READY, VISUALLY STUNNING components.

═══════════════════════════════════════════════════════════════════════════════
🎨 CRITICAL: VISUAL DESIGN RULES (ZERO TOLERANCE)
═══════════════════════════════════════════════════════════════════════════════

**COLOR CONTRAST (MANDATORY - 4.5:1 ratio minimum):**
- DARK backgrounds: Use text-white, text-slate-100, text-gray-100
- LIGHT backgrounds: Use text-slate-900, text-gray-900, text-black
- NEVER use gray text on gray backgrounds!
- NEVER use light text on light backgrounds!

**WEB-SAFE COLOR PALETTE:**
- Primary: bg-indigo-600, bg-blue-600, bg-violet-600 (vibrant, saturated)
- Accent: bg-emerald-500, bg-amber-500, bg-rose-500
- Neutral Dark: bg-slate-900, bg-gray-900, bg-zinc-900
- Neutral Light: bg-white, bg-slate-50, bg-gray-50
- Text on dark: text-white, text-slate-100
- Text on light: text-slate-900, text-gray-800

**RESPONSIVE DESIGN (ALL components MUST be responsive):**
- Mobile first: Default styles for mobile
- Tablet (md:768px): md:grid-cols-2, md:text-lg, md:p-6
- Desktop (lg:1024px): lg:grid-cols-3, lg:text-xl, lg:p-8
- Wide (xl:1280px): xl:grid-cols-4

**IMAGES - CRITICAL (Use picsum.photos - CORS-friendly):**

ALWAYS use picsum.photos format (NOT source.unsplash.com which has CORS issues!):
- https://picsum.photos/800/600?random=1
- https://picsum.photos/800/600?random=2  
- https://picsum.photos/400/300?random=3

Use different random numbers for different images to get variety!

MANDATORY IMAGE ERROR HANDLING in EVERY component with images:

const [imgError, setImgError] = useState(false);

{!imgError ? (
  <img
    src="https://picsum.photos/800/600?random=1"
    alt="Description"
    className="w-full h-full object-cover"
    onError={() => setImgError(true)}
  />
) : (
  <div className="w-full h-full bg-gradient-to-br from-indigo-200 to-purple-200 flex items-center justify-center">
    <span className="text-slate-500">Image unavailable</span>
  </div>
)}


═══════════════════════════════════════════════════════════════════════════════
📐 LAYOUT & SPACING RULES
═══════════════════════════════════════════════════════════════════════════════

**CONTAINER PATTERNS:**
- Section wrapper: container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl
- Card grids: grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8
- Flex layouts: flex flex-col md:flex-row items-center gap-4 md:gap-6

**CARD COMPONENTS:**
- Always use: rounded-xl shadow-lg hover:shadow-xl transition-all duration-300
- Padding: p-4 md:p-6 lg:p-8
- Equal heights in grids: h-full

**TEXT SIZING (Responsive):**
- H1: text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold
- H2: text-2xl md:text-3xl lg:text-4xl font-bold
- H3: text-xl md:text-2xl lg:text-3xl font-semibold
- Body: text-base md:text-lg leading-relaxed
- Small: text-sm md:text-base text-muted

═══════════════════════════════════════════════════════════════════════════════
🛠️ TECHNICAL REQUIREMENTS (ZERO ERROR TOLERANCE)
═══════════════════════════════════════════════════════════════════════════════

1. TypeScript with proper interfaces/types
2. ALWAYS define cn utility AT THE TOP of EVERY file that uses it:
   // cn utility - MUST be defined, not imported
   const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');
3. Use framer-motion for animations (hover, tap, entrance)
4. Use lucide-react for icons
5. Components must be COMPLETE - no placeholders
6. Named exports for UI components
7. React.forwardRef for form elements

CRITICAL OUTPUT FORMAT - Each file MUST use <chirAction> tags:

<chirAction type="file" filePath="src/components/ui/Button.tsx">
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
          variant === 'primary' && 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-lg shadow-indigo-500/25',
          variant === 'secondary' && 'bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-500',
          variant === 'outline' && 'border-2 border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-slate-500',
          variant === 'ghost' && 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
          size === 'sm' && 'h-9 px-4 text-sm',
          size === 'md' && 'h-11 px-6 text-base',
          size === 'lg' && 'h-14 px-8 text-lg',
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = 'Button';
</chirAction>

NEVER use markdown code blocks. ALWAYS use <chirAction> tags.`;

  // UI components from blueprint + standard required ones
  const uiComponents = blueprint.components.filter(c => c.type === 'ui');
  const featureComponents = blueprint.components.filter(c => c.type === 'feature');

  const userPrompt = `Generate ALL production-ready components for "${blueprint.projectName}":

${memoryContext}

EXISTING FILES (IMPORT FROM THESE):
${existingContext}

═══════════════════════════════════════════════════════════════════════════════
🎨 DESIGN SYSTEM FOR THIS PROJECT
═══════════════════════════════════════════════════════════════════════════════
- Primary Color: ${blueprint.designSystem.primaryColor} (use for CTAs, links, highlights)
- Secondary Color: ${blueprint.designSystem.secondaryColor} (use for secondary actions)
- Accent Color: ${blueprint.designSystem.accentColor} (use for badges, notifications)
- Style: ${blueprint.designSystem.style}
- Fonts: ${blueprint.designSystem.fonts.join(', ')}

COLOR CONTRAST RULES:
- On dark (slate-900/gray-900): ALWAYS use text-white or text-slate-100
- On light (white/slate-50): ALWAYS use text-slate-900 or text-gray-800
- Muted text: text-slate-400 on dark, text-slate-600 on light

═══════════════════════════════════════════════════════════════════════════════
📦 REQUIRED UI COMPONENTS (src/components/ui/)
═══════════════════════════════════════════════════════════════════════════════
${['Button', 'Card', 'Input', 'Modal', 'Badge', 'Avatar', 'Skeleton', 'Dropdown', 'Tabs', 'Container', 'Section'].map(c => `- ${c}.tsx`).join('\n')}
${uiComponents.map(c => `- ${c.name}.tsx: ${c.props?.join(', ') || 'standard props'}`).join('\n')}

Each Card MUST have:
- Visible text (high contrast)
- Proper padding (p-6)
- Shadow (shadow-lg)
- Rounded corners (rounded-xl)
- Responsive width

═══════════════════════════════════════════════════════════════════════════════
🚀 FEATURE COMPONENTS (src/components/features/)
═══════════════════════════════════════════════════════════════════════════════
${featureComponents.map(c => `- ${c.name}.tsx: ${c.description || c.props?.join(', ')}`).join('\n')}

Each feature component MUST:
- Be fully responsive (mobile/tablet/desktop)
- Have proper section spacing (py-12 md:py-16 lg:py-20)
- Use container mx-auto for centering
- Include real, meaningful content
- Work with provided design system colors

═══════════════════════════════════════════════════════════════════════════════
⚠️ ZERO TOLERANCE REQUIREMENTS
═══════════════════════════════════════════════════════════════════════════════
1. NO invisible text (verify contrast!)
2. NO placeholder content ("Lorem ipsum", "Sample text")
3. NO broken images (use Unsplash URLs or gradients)
4. NO fixed widths - everything responsive
5. ALL components must work on 320px to 2560px screens`;

  try {
    const response = await invokeLLM(systemPrompt, userPrompt, 0.7);
    const parsedFiles = parseChirActions(response);

    for (const { path, content } of parsedFiles) {
      await addFileWithMemory(files, registry, path, content, 'component', state.projectId);
    }

    console.log(`\n✅ Component files generated: ${files.size}`);
    files.forEach((_, path) => console.log(`   📄 ${path}`));

    return {
      files,
      fileRegistry: registry,
      currentPhase: 'component',
      messages: [`Components created: ${files.size} files`]
    };

  } catch (error: any) {
    console.error('❌ Component generation failed:', error.message);
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

  // Determine file type for Mem0
  let fileType: FileMemory['type'] = 'component';
  if (path.includes('/layout/')) fileType = 'layout';
  else if (path.includes('/pages/')) fileType = 'page';
  else if (path.includes('/lib/') || path.includes('/utils/')) fileType = 'util';

  // Store in Mem0
  await storeFileMemory(projectId, {
    path,
    exports,
    imports,
    type: fileType,
    phase,
    contentPreview: content.substring(0, 300)
  });
}
