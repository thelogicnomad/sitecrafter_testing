import type { PlanningResponse, ProjectBlueprint } from '../types/planning.types';
import { OutputParser } from '../utils/parser.utils';
import { UIService } from './ui.service';
// Multiple Gemini instances
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI1 = new GoogleGenerativeAI(process.env.gemini);
const genAI2 = new GoogleGenerativeAI(process.env.gemini2);
const genAI3 = new GoogleGenerativeAI(process.env.gemini3);

const model1 = genAI1.getGenerativeModel({ model: "gemini-2.5-flash-lite-preview-09-2025" });
const model2 = genAI2.getGenerativeModel({ model: "gemini-2.5-flash-lite-preview-09-2025" });
const model3 = genAI3.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

let currentModel = 0;
function getNextModel() {
  const models = [model1, model2, model3];
  const model = models[currentModel % 3];
  currentModel++;
  console.log(`[Planning] Using model ${(currentModel - 1) % 3 + 1}`);
  return model;
}

const PLANNING_MODEL = "gemini-2.5-flash-lite-preview-09-2025"; // Use full flash model for better quality and longer outputs

interface ProjectAnalysis {
  type: 'frontend' | 'backend' | 'fullstack';
  nodeCount: number;
  complexity: 'complex';
}

export class PlanningService {

  private static async generateBackendContext(requirements: string, blueprint: ProjectBlueprint): Promise<string> {
    const backendPrompt = `Create ULTRA-DETAILED backend implementation specifications for:

"${requirements}"

Focus ONLY on backend architecture. Generate comprehensive specifications including:

1. **Complete Backend File Structure**
   - All routes, controllers, models, middleware, services
   - Exact file paths and purposes

2. **API Endpoint Specifications**
   - Every endpoint with HTTP method, path, description
   - Request/response schemas with TypeScript interfaces
   - Query parameters, path parameters, request bodies
   - Response status codes and error handling

3. **Database Models**
   - MongoDB schemas with all fields and types
   - Indexes, validation rules, relationships
   - Sample documents for each collection

4. **Authentication & Authorization**
   - JWT implementation details
   - Middleware specifications
   - Protected routes

5. **Business Logic Services**
   - Service layer methods with TypeScript signatures
   - Error handling and validation logic

6. **Dependencies**
   - Complete package.json with all backend dependencies
   - Express, Mongoose, bcrypt, jsonwebtoken, cors, etc.

Make this TypeScript-based Node.js/Express backend. Be extremely detailed with 8000+ words.`;

    const model = getNextModel();
    const result = await model.generateContent(`You are a backend architecture expert. Generate ultra-detailed TypeScript backend specifications.\n\n${backendPrompt}`);
    const response = await result.response;

    return response.text() || blueprint.detailedContext;
  }

  private static async generateFrontendContext(requirements: string, blueprint: ProjectBlueprint): Promise<string> {
    const frontendPrompt = `Create ULTRA-DETAILED frontend implementation specifications for:

"${requirements}"

Focus ONLY on React frontend. Generate comprehensive specifications including:

1. **Complete Frontend File Structure**
   - All pages, components, hooks, utils
   - Exact file paths and purposes

2. **Page-by-Page Specifications** (CRITICAL - 3000+ words)
   - Every page with exact content, components, layouts
   - Hero sections with exact heading text
   - Sample data for all grids/lists
   - Realistic content (no placeholders)

3. **Design System**
   - Beautiful color palette (HSL values)
   - Typography (2 font families)
   - Semantic tokens
   - Animations and transitions

4. **Component Specifications**
   - Props, state, TypeScript interfaces
   - Accessibility features

5. **Routing & Navigation**
   - React Router DOM configuration
   - All routes and protection rules

6. **Dependencies**
   - Complete package.json with React, Router, Framer Motion, etc.

Make this production-ready React 19 + TypeScript. Be extremely detailed with 8000+ words.`;

    const model = getNextModel();
    const result = await model.generateContent(`You are a frontend architecture expert. Generate ultra-detailed React specifications.\n\n${frontendPrompt}`);
    const response = await result.response;

    let frontendContext = response.text() || blueprint.detailedContext;

    // Add UI components
    console.log('   - Selecting UI components...');
    const uiSelection = await UIService.selectComponents(requirements);
    if (uiSelection.selectedComponents.length > 0) {
      frontendContext += uiSelection.formattedForPrompt;
      console.log(`   - Added ${uiSelection.selectedComponents.length} UI components`);
    }

    return frontendContext;
  }

  private static analyzeProject(requirements: string): ProjectAnalysis {
    const reqLower = requirements.toLowerCase();
    
    // IMPROVED project type detection (matches index.ts logic)
    
    // Check for explicit frontend indicators
    const isFrontendOnly = (reqLower.includes('frontend only') || 
                            reqLower.includes('ui only') || 
                            reqLower.includes('react app') ||
                            reqLower.includes('react only')) &&
                           !reqLower.includes('backend') && 
                           !reqLower.includes('api');
    
    // Check for explicit backend indicators
    const isBackendOnly = (reqLower.includes('backend') || 
                           reqLower.includes('back-end') ||
                           reqLower.includes('api') ||
                           reqLower.includes('server') ||
                           reqLower.includes('node.js') ||
                           reqLower.includes('express') ||
                           reqLower.includes('database')) &&
                          !reqLower.includes('frontend') && 
                          !reqLower.includes('react') &&
                          !reqLower.includes('ui component');
    
    // Check for fullstack indicators
    const isFullstack = reqLower.includes('fullstack') || 
                        reqLower.includes('full-stack') ||
                        reqLower.includes('full stack') ||
                        (reqLower.includes('frontend') && reqLower.includes('backend'));
    
    let type: 'frontend' | 'backend' | 'fullstack';
    let nodeCount: number;
    
    // Determine project type with clear priority
    if (isBackendOnly) {
      type = 'backend';
      nodeCount = 30; // Production-level backend architecture
      console.log('[Planning] Detected BACKEND project');
    } else if (isFullstack) {
      type = 'fullstack';
      nodeCount = 40; // Production-level fullstack architecture
      console.log('[Planning] Detected FULLSTACK project');
    } else {
      // Default to frontend for UI/website projects
      type = 'frontend';
      nodeCount = 35; // Production-level frontend with MULTIPLE pages
      console.log('[Planning] Detected/Defaulted to FRONTEND project');
    }
    
    // Always use complex/production-level
    const complexity: 'complex' = 'complex';
    
    return {
      type,
      nodeCount,
      complexity
    };
  }

  private static generateSystemPrompt(analysis: ProjectAnalysis): string {
    const { type: projectType, nodeCount, complexity } = analysis;
    const typeInstructions = {
      frontend: `
FRONTEND-ONLY PROJECT (MULTI-PAGE REQUIRED):
- Design MULTI-PAGE frontend architecture with React Router DOM
- MINIMUM 3-5 pages: Home/Landing + 2-3 feature pages + About/Contact
- Include: Multiple pages, reusable components, state management, routing, navigation
- Focus on: Page components, UI components, state, routing, navigation header/sidebar
- Node types: page, component, state, router, navigation
- Categories: Frontend only
- Create ${nodeCount} nodes for comprehensive multi-page frontend
- Example pages: Home, Features, Pricing, About, Contact, Dashboard, Profile`,
      
      backend: `
BACKEND-ONLY PROJECT:
- Design ONLY backend architecture (APIs, services, database, authentication)
- DO NOT include frontend pages or UI components
- Focus on: REST APIs, business logic services, database schema, authentication, middleware
- Node types: api, service, database, auth, middleware
- Categories: Backend, Database, Auth
- Create ${nodeCount} nodes for backend architecture`,
      
      fullstack: `
FULLSTACK PROJECT:
- Design COMPLETE architecture with both frontend AND backend
- Include: Frontend (pages, components) + Backend (APIs, services) + Database
- Frontend: React pages and components
- Backend: Node.js APIs and services
- Database: MongoDB collections
- Create ${nodeCount} nodes covering the entire stack`
    };

    return `You are a world-class software architect, senior full-stack developer, and UX/UI design expert with deep expertise in building production-ready, enterprise-grade web applications. Your mission is to create comprehensive architectural blueprints for applications that non-technical users can build and deploy with confidence.

=== CORE MISSION ===

Create PRODUCTION-LEVEL, ENTERPRISE-GRADE, FEATURE-RICH applications with:
- Complex, professional architecture (NEVER minimal or basic)
- Web-safe design systems with semantic tokens
- Rich feature sets that exceed user expectations
- Perfect responsiveness across all devices
- Accessibility compliance (WCAG 2.1 AA)
- SEO optimization built-in
- Production-ready code quality

PROJECT COMPLEXITY: ${complexity.toUpperCase()} (ALWAYS PRODUCTION-READY)
ARCHITECTURE SCALE: ${nodeCount} nodes for comprehensive system design

${typeInstructions[projectType]}

=== WEB-SAFE DESIGN SYSTEM SPECIFICATION ===

**CRITICAL: Design System is EVERYTHING - Specify COMPLETE system in detailedContext**

The design system is the SOUL of the application. Make it BEAUTIFUL and UNIQUE.

**You MUST specify in detailedContext:**
1. Exact colors with HSL values that match project vision
2. Typography choices (2 fonts max) with sizes and line-heights
3. Semantic token names for ALL colors, fonts, spacing
4. Animation specifications (transitions, hover effects)
5. Shadow and depth specifications
6. Unique design elements that make THIS project stand out

**Color Palette (Web-Safe):**
Specify EXACTLY 3-5 colors with HSL values:
- 1 Primary brand color (choose based on project type/industry)
- 2-3 Neutrals (background, foreground, muted variations)
- 1-2 Accent colors (for CTAs, highlights)
- Ensure 4.5:1 minimum contrast ratio for text
- NO gradients unless explicitly requested
- ALL colors must be defined as semantic CSS variables
- Example: Primary hsl(221.2, 83.2%, 53.3%) for professional blue, Background hsl(0, 0%, 100%) for white, Foreground hsl(222.2, 84%, 4.9%) for text, Muted hsl(210, 40%, 96.1%) for subtle backgrounds, Accent hsl(142.1, 76.2%, 36.3%) for CTAs

**Typography (Web-Safe):**
Specify EXACTLY 2 font families:
- 1 for headings (can use multiple weights)
- 1 for body text
- Choose from: Inter, Roboto, Open Sans, Lato, Montserrat, Poppins, Source Sans Pro, system-ui
- Include: font sizes, line heights, letter spacing
- Line-height: 1.4-1.6 for body text

**Layout System (CRITICAL - PREVENTS ALIGNMENT ISSUES):**

CONTAINER STRUCTURE:
- Page wrapper: container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl
- Section spacing: py-12 md:py-16 lg:py-20

CARD/GRID LAYOUTS (MANDATORY PATTERNS):
- Cards: grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8
- NEVER use absolute positioning - causes misalignment
- Cards MUST have h-full for equal heights

FLEXBOX PATTERNS:
- Header: flex items-center justify-between gap-4
- Centered: flex items-center justify-center
- Lists: flex flex-col gap-4 or space-y-4

TEXT HANDLING:
- Responsive: text-2xl md:text-3xl lg:text-4xl
- Prevent overflow: truncate or line-clamp-2
- Word wrap: break-words

RESPONSIVE BREAKPOINTS:
- Mobile (base): single column
- Tablet (sm:640px, md:768px): 2 columns
- Desktop (lg:1024px, xl:1280px): 3-4 columns

Semantic HTML required

=== INTELLIGENT FEATURE INFERENCE ===

Analyze the user's request DEEPLY and add features they need but didn't mention:

**Blog/Content Sites:** search functionality, filters by category/tag, pagination, reading time estimate, author profiles, related posts, comments section, social sharing, RSS feed

**E-commerce:** shopping cart, wishlist, product reviews/ratings, advanced filters, sorting options, related products, stock indicators, size guides, checkout flow, order tracking

**Dashboards:** interactive charts (line, bar, pie), date range filters, data export (CSV/PDF), real-time updates, notifications center, activity logs, user preferences, responsive tables, pagination

**Social Apps:** user profiles, activity feeds, like/follow systems, notifications, messaging, user discovery, content moderation, privacy settings, blocking/reporting

**Forms:** multi-step progression, autosave drafts, field validation with real-time feedback, file upload with preview, progress tracking, confirmation screens

**Authentication:** password strength meter, email verification, forgot password flow, session management, remember me option, account settings, profile management

=== PACKAGE SELECTION INTELLIGENCE ===

Based on project requirements, intelligently select from:

**Animations & Interactions:**
- framer-motion (primary choice for React animations)
- @react-spring/web (physics-based animations)
- react-intersection-observer (scroll triggers)

**Forms & Validation:**
- react-hook-form (performant form handling)
- zod (schema validation)
- @hookform/resolvers (integration)

**State Management:**
- zustand (lightweight global state)
- @tanstack/react-query (server state, caching, data fetching)
- jotai (atomic state management)
- swr (data fetching alternative)

**UI Components:**
- @radix-ui/react-* (accessible primitives)
- @headlessui/react (unstyled components)
- sonner or react-hot-toast (notifications)
- recharts (charts and data visualization)

**Routing & Navigation:**
- react-router-dom (multi-page apps)
- wouter (lightweight alternative)

**Utilities:**
- clsx ^2.1.1 + tailwind-merge ^2.6.0 (className management)
- date-fns ^4.1.0 or dayjs (date manipulation)
- lucide-react ^0.460.0 (icon library)
- lodash-es (utility functions, only when needed)

**Latest Package Versions:**
- react: ^19.0.0
- react-dom: ^19.0.0
- react-router-dom: ^7.1.1
- framer-motion: ^11.11.17
- @tanstack/react-query: ^5.62.7
- react-hook-form: ^7.54.2
- zod: ^3.24.1
- zustand: ^5.0.2
- sonner: ^1.7.3

**File Handling:**
- react-dropzone (file uploads)
- filepond (advanced file uploads)

=== MANDATORY PRODUCTION FEATURES ===

Include these in EVERY project:

1. **Animations**: Page transitions, hover effects, scroll animations, micro-interactions, loading animations
2. **Responsive Design**: Mobile (320px+), Tablet (768px+), Desktop (1024px+) - all tested
3. **Accessibility**: 
   - Keyboard navigation (Tab, Enter, Escape)
   - Screen reader support (ARIA labels, roles, live regions)
   - Focus indicators on all interactive elements
   - Semantic HTML (header, nav, main, article, section, footer)
   - WCAG 2.1 AA compliance
4. **SEO Optimization**:
   - Title tags (under 60 characters, include main keyword)
   - Meta descriptions (160 characters with target keyword)
   - Single H1 per page matching primary intent
   - Semantic HTML structure
   - Image alt attributes with descriptive keywords
   - JSON-LD structured data (for products, articles, FAQs)
   - Lazy loading for images below the fold
   - Canonical tags
   - Open Graph and Twitter Card meta tags
5. **Loading States**: Skeletons, spinners, progress bars, optimistic UI updates
6. **Error Handling**: Error boundaries, fallback UI, user-friendly error messages, retry mechanisms
7. **Empty States**: Beautiful no-data designs with helpful CTAs and illustrations
8. **Form Validation**: Real-time feedback, clear error messages, success confirmations
9. **Notifications**: Toast system (sonner) for success, error, info, warning states
10. **Performance**: Code splitting, lazy loading, image optimization, memoization, virtual scrolling
11. **Security**: Input sanitization, XSS protection, CSRF tokens, secure headers, rate limiting

=== ARCHITECTURE EXCELLENCE ===

**Code Structure:**
- Small, focused components (max 200-300 lines each)
- Separation of concerns: components/, hooks/, utils/, lib/, types/
- Co-location of related files
- Custom hooks for shared logic
- Reusable component library
- Prop drilling avoided (context/state management)

**TypeScript Quality:**
- Strict mode enabled
- Proper interfaces for all props and state
- Type all API responses and external data
- Avoid 'any' - use 'unknown' or proper types
- Leverage type inference

**Best Practices:**
- Named exports for components (export const ComponentName)
- Default exports for pages (export default function PageName)
- Consistent naming: camelCase (variables/functions), PascalCase (components)
- Error handling with try-catch
- No console.logs in production
- ESLint and Prettier compatible
- Comments only for complex business logic

=== SPECIAL REQUIREMENTS ===

**NEVER include:**
- Emojis in code (components, comments, variable names)
- README.md files (unless explicitly requested)
- Direct color classes (text-white, bg-black, etc. - use semantic tokens)
- Default shadcn/ui styles (always customize)
- More than 2 font families
- More than 5 colors
- Browser built-ins (alert, confirm, prompt - use dialogs)

**ALWAYS include:**
- Complete design system specification in detailedContext
- Web-safe fonts and colors
- Semantic design tokens
- Rich feature set (go beyond basic requirements)
- Mobile-first responsive design
- Accessibility features
- SEO optimization
- Loading, error, and empty states
- Professional, production-ready architecture

REMEMBER: Think like a senior architect building for a real client with a real budget. Make it production-ready, feature-rich, accessible, beautiful, and ready to deploy. The user should feel they received more value than they expected.


=== 🚨 CRITICAL: detailedContext STRING FORMATTING 🚨 ===

The "detailedContext" field MUST be a SINGLE, CONTINUOUS STRING on ONE LINE.

✅ CORRECT FORMAT:
"detailedContext": "Section 1: File Structure. Create these files: src/App.tsx for main app, src/components/Header.tsx for header component. Section 2: Components. The Header component takes props: title (string), onMenuClick (function). It should render a nav element with Tailwind classes. Section 3: (continue for 3000+ words)..."

❌ WRONG - DO NOT DO THIS:
"detailedContext": "Section 1: File Structure
Create these files:
- src/App.tsx
- src/components/Header.tsx"

⚠️ CRITICAL RULES FOR detailedContext:
1. Write the ENTIRE 3000+ word guide as ONE continuous string
2. NO actual line breaks - write it all in one line
3. Use periods and commas to separate sections, NOT newlines
4. DO NOT use \\n escape sequences either - just write continuously
5. Remove ALL emojis, tabs, and special characters
6. Use only: letters, numbers, spaces, periods, commas, hyphens, parentheses
7. Think of it like writing a very long paragraph

⚠️ GENERAL JSON RULES:
- NO trailing commas before } or ]
- Use double quotes for all strings
- Ensure all brackets/braces are properly paired



CRITICAL CONSTRAINTS:
1. Use ONLY React + TypeScript for frontend (if applicable)
2. Use ONLY Node.js + Express for backend (if applicable)
3. Use ONLY MongoDB for database (if applicable)
4. Avoid external APIs that require API keys (use mock data if needed)
5. Design for Vercel serverless deployment
6. Ensure mobile-responsive design with Tailwind CSS
7. Follow accessibility best practices (WCAG 2.1)

YOUR OUTPUT MUST CONTAIN EXACTLY 2 THINGS:

1. WORKFLOW VISUALIZATION (nodes + edges)
2. DETAILED IMPLEMENTATION PROMPT (for code generation)

WORKFLOW DESIGN PRINCIPLES:
- Create exactly ${nodeCount} nodes
- Each node must have a clear, specific purpose
- Connect nodes with edges showing data/control flow
- Use appropriate node types and categories
- Keep labels SHORT (2-3 words max)

OUTPUT FORMAT (PURE JSON - NO MARKDOWN):
{
  "projectName": "Descriptive Name",
  "description": "Brief description",
  "techStack": {
    "frontend": ["React", "TypeScript", "Tailwind"],
    "backend": ["Node.js", "Express"],
    "database": ["MongoDB"],
    "external": ["minimal external services"]
  },
  "features": ["feature1", "feature2"],
  "workflow": {
    "nodes": [
      {
        "id": "unique-kebab-case-id",
        "type": "page|component|api|service|database|auth",
        "label": "Short Name",
        "category": "Frontend|Backend|Database|Auth"
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "source-node-id",
        "target": "target-node-id",
        "label": "action description",
        "type": "http|database|event"
      }
    ]
  },
  "detailedContext": "ULTRA-DETAILED PRODUCTION-LEVEL IMPLEMENTATION GUIDE - This is ONE continuous string. Include: SECTION 1 (Complete File Structure with all paths), SECTION 2 (Design System Specification - colors HSL values, typography fonts and sizes, spacing scale, semantic tokens), SECTION 3 (Component Specifications - props, state, hooks, styling), SECTION 4 (Page Layouts - structure, responsive breakpoints), SECTION 5 (API Integration - endpoints if applicable), SECTION 6 (State Management - global state, local state, data fetching), SECTION 7 (Routing Configuration - all routes, navigation structure), SECTION 8 (Animation Specifications - transitions, micro-interactions), SECTION 9 (Accessibility Requirements - ARIA labels, keyboard nav, screen reader), SECTION 10 (SEO Implementation - title tags, meta descriptions, structured data), SECTION 11 (Dependencies List - all packages with versions and usage), SECTION 12 (Performance Optimizations - lazy loading, code splitting, memoization), SECTION 13 (Rich Features to Include - inferred features beyond requirements), SECTION 14 (Node/Edge Implementation Details - comprehensive specs for each node and edge), SECTION 15 (Production Checklist - final requirements). Make it 4000+ words with EVERY architectural detail, design token, component spec, and implementation instruction needed for generating production-ready code. Use web-safe fonts and colors. No emojis. Be comprehensive and specific."
}

CRITICAL RULES:
1. Create EXACTLY ${nodeCount} nodes (no more, no less) - comprehensive architecture
2. Every node must have a clear, specific, production-ready purpose
3. Every edge must show actual data/control flow with proper protocols
4. Labels must be SHORT (2-3 words max) but descriptive
5. Output PURE JSON (no markdown, no comments, no code blocks)
6. Start with { and end with } - valid JSON only
7. NO TRAILING COMMAS anywhere in the JSON
8. Use double quotes for all strings
9. The detailedContext must be ULTRA-DETAILED (4000+ words minimum)
10. Include COMPLETE design system specification (colors, fonts, spacing)
11. Specify ALL semantic tokens and web-safe colors/fonts
12. Include EVERY feature (including inferred features)
13. Detail ALL components with props, state, styling
14. Provide COMPREHENSIVE implementation instructions
15. Make it production-ready, feature-rich, accessible, and beautiful
16. NO emojis anywhere in the output
17. Use web-safe fonts and color combinations

REMEMBER: The detailedContext is passed to code generation AI. It must be SO comprehensive that the AI can generate PERFECT, PRODUCTION-READY, ERROR-FREE code with rich features, professional design, and complete functionality. Think enterprise-grade SaaS application quality.

🚨 FINAL CHECK BEFORE RETURNING:
1. Is detailedContext ONE continuous line with NO line breaks?
2. Have you included all 13 sections in detailedContext?
3. Is it at least 3000 words?
4. Are there NO trailing commas in the JSON?
5. Did you include details for EVERY node and edge in Section 12?`;

}

  static async generateBlueprint(
    requirements: string,
    retryCount: number = 0,
    projectTypeFromFrontend?: 'frontend' | 'backend' | 'fullstack'
  ): Promise<PlanningResponse> {
    const MAX_RETRIES = 3;

    try {
      // Use projectType from frontend if provided, otherwise analyze
      let projectType: 'frontend' | 'backend' | 'fullstack';
      let nodeCount: number;
      let complexity: 'complex';
      
      if (projectTypeFromFrontend) {
        // Use frontend selection (no keyword detection)
        projectType = projectTypeFromFrontend;
        const analysis = this.analyzeProject(requirements);
        nodeCount = analysis.nodeCount;
        complexity = analysis.complexity;
        console.log(`\n🔍 PROJECT ANALYSIS (FROM FRONTEND):`);
        console.log(`  Type: ${projectType.toUpperCase()} [User Selected]`);
      } else {
        // Fallback to keyword detection
        const analysis = this.analyzeProject(requirements);
        projectType = analysis.type;
        nodeCount = analysis.nodeCount;
        complexity = analysis.complexity;
        console.log(`\n🔍 PROJECT ANALYSIS (DETECTED):`);
        console.log(`  Type: ${projectType.toUpperCase()} [Auto-Detected]`);
      }
      console.log(`  Complexity: ${complexity.toUpperCase()} (PRODUCTION-LEVEL)`);
      console.log(`  Nodes: ${nodeCount}`);
      console.log(`  LLM will intelligently determine all features and packages needed`);
      console.log(`\n📝 Generating production-level blueprint (attempt ${retryCount + 1}/${MAX_RETRIES + 1})...`);

      // Create analysis object for system prompt
      const analysisForPrompt = {
        type: projectType,
        nodeCount,
        complexity
      };

      const model = getNextModel();
      const systemPrompt = this.generateSystemPrompt(analysisForPrompt);
      const userPrompt = `Create a ${projectType.toUpperCase()} project blueprint for:

"${requirements}"

=== YOUR MISSION ===

Design a PRODUCTION-READY, ENTERPRISE-GRADE, FEATURE-RICH application that WOWS users. Think professional SaaS product worthy of real deployment, not tutorial project.

${projectType === 'backend' ? `
**BACKEND-ONLY PROJECT:**
DO NOT include any frontend/UI components. Focus ONLY on:
- RESTful API endpoints (routes, controllers)
- Business logic services
- Database models and schemas
- Authentication and authorization middleware
- Validation and error handling
- API documentation
- Security features (CORS, rate limiting, sanitization)
` : `
**CRITICAL FIRST IMPRESSION:**
This is the first version - make it AMAZING:
- Think about what BEAUTIFUL designs this evokes
- List features you'll implement in this first version
- Choose inspiring colors, fonts, animations
- Make it MEMORABLE and UNIQUE

**ALWAYS CREATE MULTIPLE PAGES:**
Even for simple requests, design 3-5 pages minimum:
- Home/Landing page (compelling hero, features)
- Feature/Product pages (2-3 pages)
- About/Contact page (when appropriate)
- Dashboard/App page (for interactive projects)
- Use React Router DOM for navigation
- Include navigation header/sidebar
`}

=== COMPREHENSIVE SPECIFICATIONS REQUIRED ===

1. **Deep Requirements Analysis:**
   - Core features (stated requirements)
   - Inferred features (what users need but didn't mention)
   - User personas and use cases
   - Edge cases and error scenarios
   - Opportunities for exceptional UX

2. **Architecture Design (EXACTLY ${nodeCount} nodes):**
   - Each node: specific, production-ready purpose
   - Data flows and relationships mapped
   - Error handling and recovery nodes
   - Loading/optimistic update patterns
   - Security and validation layers

3. **ULTRA-DETAILED Implementation Guide (8000+ words minimum - NO MAXIMUM):**
   
   **SECTION 1: Complete File Structure**
   - Every file with full paths
   - Purpose and responsibility of each file
   - Folder organization rationale
   
${projectType === 'backend' ? `
   **SECTION 2: API Endpoint Specifications (THE MOST CRITICAL SECTION)**
   - List ALL endpoints with HTTP methods, paths, descriptions
   - Request body schemas (TypeScript interfaces)
   - Response schemas with status codes
   - Query parameters and path parameters
   - Authentication requirements
   - Rate limiting and validation rules
   - Error responses (400, 401, 404, 500 with examples)
   
   **SECTION 3: Database Schema Specifications**
   - All MongoDB collections/models with field types
   - Indexes and relationships
   - Validation rules and constraints
   - Sample documents for each collection
   - Migration considerations
   
   **SECTION 4: SERVICE LAYER SPECIFICATIONS**
   - Business logic services (ProductService, UserService, etc.)
   - Methods with TypeScript signatures
   - Error handling and validation
   - Integration with database models
   - Authentication/authorization logic
` : `
   **SECTION 2: Design System Specification (THE MOST CRITICAL SECTION)**
   - BEAUTIFUL, UNIQUE color palette: 3-5 colors with exact HSL values
   - Choose colors that match project vision and evoke right emotions
   - Typography: 2 font families (Inter, Roboto, etc.) with sizes, weights, line-heights
   - Spacing scale: consistent spacing values (gap-4, gap-6, p-4, etc.)
   - Semantic tokens: ALL design tokens defined (bg-background, text-foreground, bg-primary, etc.)
   - Animations: transitions, hover effects, shadows specifications
   - NO direct color classes - ONLY semantic tokens
   - Make design system ambitious and unique - not boring defaults
   
   **SECTION 3: Component Specifications**
   - Each component: props (TypeScript interfaces), state, hooks
   - Styling approach (semantic tokens only)
   - Accessibility features (ARIA, keyboard nav)
   - Usage examples and integration points
   
   **SECTION 4: PAGE-BY-PAGE COMPREHENSIVE SPECIFICATIONS (MOST CRITICAL FOR QUALITY)**
   
   FOR EACH PAGE, YOU MUST SPECIFY:
   
   **A. EXACT CONTENT STRUCTURE:**
   - Hero/Header section: EXACT heading text, subheading text, CTA button text
   - Main content sections: List ALL sections with EXACT content to include
   - Components to use: Specify EXACT components (CourseCard, TestimonialSlider, PricingTable, etc.)
   - Sample data/content: Provide REALISTIC sample data (not "content goes here")
   - Call-to-actions: EXACT CTA text and placement
   
   **B. VISUAL LAYOUT:**
   - Section order from top to bottom
   - Grid/Flexbox structure for each section
   - Responsive breakpoints (mobile 320px+, tablet 768px+, desktop 1024px+)
   - Spacing between sections
   - Background treatments (solid, gradient, image, etc.)
   
   **C. ANIMATIONS FOR THIS PAGE:**
   - Entrance animations (fade-in, slide-up, etc.)
   - Scroll-triggered animations
   - Hover effects on elements
   - Transition durations and easing
   
   **D. SEO FOR THIS PAGE:**
   - Title tag (under 60 chars with main keyword)
   - Meta description (160 chars with target keyword)
   - H1 tag (matching page intent)
   - Open Graph tags
   
   **EXAMPLE PAGE SPECIFICATION (DO THIS FOR EVERY PAGE):**
   
   === HOME PAGE (/): ===
   Hero Section:
   - H1: "Transform Your Career with Expert-Led Online Courses" (use animated gradient text)
   - Subheading: "Learn from industry professionals. Build real projects. Get hired."
   - CTA: "Browse Courses" (primary button, animated hover, links to /courses)
   - Background: Animated gradient with floating particles
   - Components: HeroSection, AnimatedText, CTAButton
   
   Featured Courses Section:
   - H2: "Featured Courses"
   - Grid: 3 columns desktop, 2 tablet, 1 mobile
   - Components: CourseCard (with image, title, instructor, price, rating, enroll button)
   - Sample Data: List 6 realistic courses (e.g., "Full-Stack Web Development", "UI/UX Design Mastery", etc.)
   - Animations: Cards fade-in on scroll with stagger effect
   
   Testimonials Section:
   - H2: "Success Stories"
   - Components: TestimonialSlider (auto-play carousel)
   - Sample Data: 5 realistic testimonials with names, photos, job titles
   - Animations: Smooth slide transitions
   
   Stats Section:
   - Grid: 4 columns (Students Enrolled, Courses Available, Expert Instructors, Success Rate)
   - Components: StatCard with animated counter
   - Animations: Count-up animation on scroll into view
   
   CTA Section:
   - H2: "Ready to Start Learning?"
   - CTA: "Sign Up Now" button
   - Background: Accent color with subtle pattern
   
   === COURSES PAGE (/courses): ===
   Header Section:
   - H1: "Comprehensive Course Catalog"
   - Subheading: "Explore our collection of expert-led courses"
   - Components: PageHeader with breadcrumbs
   
   Filter/Search Section:
   - Components: SearchBar, FilterDropdowns (Category, Level, Price)
   - Functionality: Real-time filtering with state management
   - Position: Sticky below header
   
   Course Grid Section:
   - Grid: 3 columns desktop, 2 tablet, 1 mobile
   - Components: CourseCard (detailed with duration, lessons, students enrolled)
   - Sample Data: List 12-15 realistic courses with full details:
     * "Full-Stack Web Development" - $99 - 40 lessons - 2,341 students - 4.8 rating
     * "React & TypeScript Mastery" - $79 - 32 lessons - 1,823 students - 4.9 rating
     * "UI/UX Design Fundamentals" - $89 - 28 lessons - 1,542 students - 4.7 rating
     (List 9-12 more with REAL details)
   - Animations: Cards fade-in with stagger, hover scale effect
   - Pagination: Show pagination component at bottom
   
   === ABOUT PAGE (/about): ===
   Mission Section:
   - H1: "About [Platform Name]"
   - Paragraph: FULL mission statement (3-4 sentences about democratizing education)
   - Components: MissionStatement with accent border
   
   Story Section:
   - H2: "Our Story"
   - Content: 2-3 paragraphs about company founding, growth, vision
   - Image: Team photo or office photo
   - Layout: Text left, image right (reverse on mobile)
   
   Team Section:
   - H2: "Meet Our Team"
   - Grid: 4 columns desktop, 2 tablet, 1 mobile
   - Components: TeamMemberCard (photo, name, role, bio, social links)
   - Sample Data: 8 team members with realistic names, roles, bios
   - Animations: Cards fade-in with stagger
   
   Values Section:
   - H2: "Our Values"
   - Grid: 3 columns
   - Components: ValueCard (icon, title, description)
   - Sample Data: Excellence, Innovation, Accessibility, Community, Impact, Integrity
   
   === CONTACT PAGE (/contact): ===
   Header:
   - H1: "Get in Touch"
   - Subheading: "Have questions? We're here to help."
   
   Contact Form Section:
   - Components: ContactForm with validation (react-hook-form + zod)
   - Fields: Name, Email, Subject, Message (all with proper labels)
   - Validation: Required fields, email format, min/max lengths
   - Submit: Show loading state, success toast, error handling
   - Layout: Form on left (60%), contact info on right (40%)
   
   Contact Info Section:
   - Components: ContactInfoCard
   - Content: Email, Phone, Address (with icons)
   - Map: Embedded Google Maps or illustration
   
   === DASHBOARD PAGE (/dashboard): ===
   Stats Overview:
   - Grid: 4 columns
   - Components: StatCard (Enrolled Courses, Completed, In Progress, Certificates)
   - Animations: Count-up on mount
   
   Current Courses Section:
   - H2: "Continue Learning"
   - Components: CourseProgressCard (thumbnail, title, progress bar, resume button)
   - Sample Data: 3-4 courses with progress percentages
   
   Recommended Section:
   - H2: "Recommended for You"
   - Grid: 3 columns
   - Components: CourseCard
   - Sample Data: 6 courses based on user interests
   
   Activity Feed:
   - H2: "Recent Activity"
   - Components: ActivityItem (icon, description, timestamp)
   - Sample Data: 10 recent activities
   
   **YOU MUST CREATE THIS LEVEL OF DETAIL FOR EVERY SINGLE PAGE!**
`}
   
   **SECTION 5: API Integration (if applicable)**
   - Endpoint specifications with full schemas
   - Request/response formats
   - Error handling patterns
   - Loading states
   
   **SECTION 6: State Management**
   - Global state structure (Zustand/Jotai)
   - Server state (React Query)
   - Local component state
   - Data flow patterns
   
   **SECTION 7: Routing Configuration**
   - All routes with protection rules
   - Navigation structure
   - Route parameters and nesting
   - Redirects and fallbacks
   
   **SECTION 8: Animation Specifications**
   - Page transitions (Framer Motion)
   - Micro-interactions (hover, click, scroll)
   - Loading animations
   - Timing and easing functions
   
   **SECTION 9: Accessibility Requirements**
   - WCAG 2.1 AA compliance checklist
   - ARIA labels and roles for all interactive elements
   - Keyboard navigation (Tab, Enter, Escape patterns)
   - Screen reader announcements
   - Focus indicators
   
   **SECTION 10: SEO Implementation**
   - Title tags for each page (under 60 chars, main keyword)
   - Meta descriptions (160 chars with target keyword)
   - H1 tags matching page intent
   - Image alt attributes
   - Structured data (JSON-LD) if applicable
   - Open Graph and Twitter Card tags
   
   **SECTION 11: Dependencies & Packages (CRITICAL - NO MISSING PACKAGES)**
   - SCAN PHASE: Go through EVERY file and list ALL imports
   - Complete dependency list with exact versions
   - Usage justification for each package
   - chirAction format specification: <chirAction type="file" filePath="package.json">{...}</chirAction>
   - DOUBLE CHECK: Did you miss ANY package? Count imports vs dependencies
   - Latest versions: react ^19.0.0, react-dom ^19.0.0, react-router-dom ^7.1.1, etc.
   - VERIFY: Project must run WITHOUT npm install errors
   
   **SECTION 12: Performance Optimizations**
   - Code splitting strategy
   - Lazy loading patterns
   - Image optimization
   - Memoization opportunities
   - Bundle size considerations
   
   **SECTION 13: Rich Features to Include**
   - Inferred features beyond basic requirements
   - Unique touches and creative elements
   - Micro-interactions and delightful details
   - Edge case handling
   - Empty states and error scenarios
   
   **SECTION 14: Node/Edge Implementation Details**
   - Comprehensive specs for EVERY node
   - Implementation details for EVERY edge
   - Data protocols and formats
   
   **SECTION 15: Production Checklist**
   - Security measures (XSS, CSRF protection)
   - Error boundaries and fallback UI
   - Loading states throughout
   - Toast notifications for user feedback
   - Mobile responsiveness verified
   - Accessibility tested
   - SEO optimized

4. **Feature Richness (GO BEYOND REQUIREMENTS):**
   - Add 5+ inferred features users need but didn't mention
   - Include search, filters, sorting where applicable
   - Add pagination for lists
   - Include empty states with helpful CTAs
   - Add loading skeletons (not just spinners)
   - Include error recovery mechanisms
   - Add success celebrations/confirmations
   - Include user preferences/settings
   - Add tooltips and help text
   - Include keyboard shortcuts where useful

5. **Design Excellence:**
   - Choose web-safe color palette (HSL values, proper contrast)
   - Select 2 web-safe fonts (Inter, Roboto, Open Sans, etc.)
   - Design custom animations (specific motion descriptions)
   - Create unique UI patterns (not generic templates)
   - Add personality through thoughtful copy
   - Ensure visual hierarchy and white space
   - NO emojis in code

6. **Quality Standards:**
   - Every package justified with usage
   - Every component fully specified
   - All data flows documented
   - Error states handled everywhere
   - Loading states for all async operations
   - Mobile-first responsive design
   - WCAG 2.1 AA accessibility
   - Production-ready code quality

=== OUTPUT REQUIREMENTS ===

- Pure JSON (no markdown, no comments, no code blocks)
- Start with { and end with }
- NO trailing commas anywhere
- detailedContext: 8000+ words minimum (NO MAXIMUM - longer is better!)
- Include ALL 15 sections with EXHAUSTIVE details
- SECTION 4 (Page-by-Page) must be 3000+ words alone with EVERY page fully specified
- Web-safe fonts and colors specified
- Semantic tokens defined (no direct colors)
- Rich features included (not minimal)
- NO emojis anywhere

=== FINAL VALIDATION ===

Before returning, ensure:
- Design system FULLY specified with BEAUTIFUL, UNIQUE colors (not boring defaults)
- All 15 sections included and COMPREHENSIVELY detailed
- 8000+ words MINIMUM of implementation instructions (NO MAXIMUM)
- SECTION 4 (Page-by-Page) has 3000+ words with EVERY page FULLY specified
- Web-safe color palette with exact HSL values
- 2 font families specified (Inter, Roboto, Open Sans, etc.)
- Rich features beyond basic requirements (search, filters, pagination, etc.)
- MULTIPLE pages specified (3-5 minimum)
- React Router DOM routing configuration
- Accessibility (WCAG 2.1 AA) and SEO included
- NO emojis anywhere
- chirAction format for package.json with ALL dependencies
- SCAN verification: ALL imports have corresponding dependencies
- Production-ready specifications worthy of real deployment
- Unique design elements that make THIS project stand out

**CRITICAL - NO PLACEHOLDERS ALLOWED:**
- EVERY page must have REALISTIC sample content specified
- NEVER say "content goes here" or "will be displayed"
- Provide ACTUAL text for headings, paragraphs, button labels
- List SPECIFIC sample data (e.g., "12 courses with titles, prices, descriptions")
- Specify EXACT components to use on EACH page
- Give REAL examples, not generic descriptions

**REMEMBER:** The AI will implement EXACTLY what you specify. If you say "course listing will be displayed", it will create a placeholder. If you say "Display 12 CourseCard components in a 3-column grid with these specific courses: [list them]", it will create production-level content!

REMEMBER: This blueprint must enable generation of ENTERPRISE-GRADE, PRODUCTION-READY code. Think professional SaaS application. Make it comprehensive, beautiful, accessible, and feature-rich!`;

      const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;
      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      const rawOutput = response.text();
      console.log(rawOutput);
      if (!rawOutput) {
        throw new Error('No response from AI');
      }

      console.log('Received response, parsing...');
      const blueprint = OutputParser.extractProjectBlueprint(rawOutput);
      
      if (!blueprint) {
        if (retryCount < MAX_RETRIES) {
          console.log(`Parsing failed, retrying (${retryCount + 1}/${MAX_RETRIES})...`);
          await new Promise(resolve => setTimeout(resolve, 1500));
          return this.generateBlueprint(requirements, retryCount + 1, projectTypeFromFrontend);
        }
        
        throw new Error('Failed to parse blueprint after multiple attempts');
      }

      console.log('Blueprint generated successfully');
      console.log(`Nodes: ${blueprint.workflow.nodes.length} | Edges: ${blueprint.workflow.edges.length}`);

      // Add projectType to blueprint
      blueprint.projectType = projectType;

      // For FULLSTACK projects, generate TWO separate contexts
      if (projectType === 'fullstack') {
        console.log('\n🔄 FULLSTACK PROJECT: Generating separate backend and frontend contexts...');
        
        // Generate backend context
        console.log('\n📦 Generating BACKEND context...');
        const backendContext = await this.generateBackendContext(requirements, blueprint);
        blueprint.backendContext = backendContext;
        console.log(`✅ Backend context: ${backendContext.length} chars`);
        
        // Generate frontend context (will be enriched with backend knowledge later)
        console.log('\n🎨 Generating FRONTEND context...');
        const frontendContext = await this.generateFrontendContext(requirements, blueprint);
        blueprint.frontendContext = frontendContext;
        console.log(`✅ Frontend context: ${frontendContext.length} chars`);
        
        // Set detailedContext to backend for now (Builder will use it first)
        blueprint.detailedContext = backendContext;
        
      } else if (projectType === 'frontend') {
        console.log('\n🎨 Selecting UI components to enrich the blueprint...');
        
        const detailedContextLengthBefore = blueprint.detailedContext.length;
        console.log(`📊 detailedContext length BEFORE appending UI: ${detailedContextLengthBefore} chars`);
        
        const uiSelection = await UIService.selectComponents(requirements);
        
        if (uiSelection.selectedComponents.length > 0) {
          // Append UI components to detailedContext at the end
          blueprint.detailedContext += uiSelection.formattedForPrompt;
          
          const detailedContextLengthAfter = blueprint.detailedContext.length;
          console.log(`\n✅ APPEND OPERATION COMPLETE:`);
          console.log(`   - Added ${uiSelection.selectedComponents.length} UI components to detailedContext`);
          console.log(`   - Selected components: ${uiSelection.selectedComponents.map(c => c.name).join(', ')}`);
          console.log(`   - detailedContext length BEFORE: ${detailedContextLengthBefore} chars`);
          console.log(`   - detailedContext length AFTER: ${detailedContextLengthAfter} chars`);
          console.log(`   - UI components added: ${detailedContextLengthAfter - detailedContextLengthBefore} chars`);
          
          // Show last 500 chars to verify UI components are at the end
          console.log(`\n📋 LAST 500 CHARS OF detailedContext (showing UI components):}`);
          console.log('─'.repeat(80));
          console.log(blueprint.detailedContext.slice(-500));
          console.log('─'.repeat(80));
        } else {
          console.log('⚠️ No UI components selected (or selection failed)');
        }
      }

      return {
        success: true,
        data: { blueprint, rawOutput }
      };

    } catch (error: any) {
      console.error('Error:', error.message);
      
      if (retryCount < MAX_RETRIES) {
        console.log(`Error occurred, retrying (${retryCount + 1}/${MAX_RETRIES})...`);
        await new Promise(resolve => setTimeout(resolve, 1500));
        return this.generateBlueprint(requirements, retryCount + 1, projectTypeFromFrontend);
      }
      
      return { 
        success: false, 
        error: `Failed after ${MAX_RETRIES + 1} attempts: ${error.message}` 
      };
    }
  }

  static createDetailedPromptFromBlueprint(blueprint: ProjectBlueprint): string {
    // Return detailedContext directly without any modifications
    // It already contains all the comprehensive implementation instructions
    return blueprint.detailedContext;
  }
}
