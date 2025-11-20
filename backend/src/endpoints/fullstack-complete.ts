/**
 * Complete Fullstack Generation with Backend Analysis
 * 1. Generate backend completely
 * 2. Analyze backend with gemini-2.5-flash-lite-preview-09-2025
 * 3. Create detailed backend analysis prompt
 * 4. Merge with frontend requirements
 * 5. Generate integrated frontend
 */

import { Request, Response } from "express";
import { getSystemPrompt, BASE_PROMPT } from '../prompts';
import { QUALITY_REQUIREMENTS, BACKEND_QUALITY_CHECKLIST, FRONTEND_QUALITY_CHECKLIST } from '../prompts/quality-enforcement';
import { nodeprompt } from "../deafult/node";
import { COMPLETE_REACT_TEMPLATE } from "../deafult/react-complete";
import OpenAI from "openai";

// Client for backend generation (gemini-2.5-pro)
const backendClient = new OpenAI({
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
  apiKey: process.env.gemini3
});

// Client for analysis (gemini-2.5-flash-lite-preview-09-2025)
const analysisClient = new OpenAI({
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
  apiKey: process.env.gemini
});

// Client for frontend generation (gemini-2.5-pro)
const frontendClient = new OpenAI({
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
  apiKey: process.env.gemini2
});

export async function generateCompleteFullstack(req: Request, res: Response) {
  try {
    const { backendContext, frontendContext, projectId } = req.body;

    console.log('\n\n╔════════════════════════════════════════════════════════════╗');
    console.log('║   🚀 COMPLETE FULLSTACK GENERATION (NEW APPROACH)         ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    console.log(`📦 Backend Context: ${backendContext?.length || 0} chars`);
    console.log(`🎨 Frontend Context: ${frontendContext?.length || 0} chars`);
    console.log(`🆔 Project ID: ${projectId}\n`);

    // ============================================================
    // STEP 1: GENERATE BACKEND COMPLETELY
    // ============================================================
    console.log('═'.repeat(60));
    console.log('STEP 1: GENERATING COMPLETE BACKEND');
    console.log('═'.repeat(60) + '\n');

    const enhancedBackendContext = `${QUALITY_REQUIREMENTS}

${BACKEND_QUALITY_CHECKLIST}

USER REQUIREMENTS:
${backendContext}

CRITICAL INSTRUCTIONS:
1. Use TypeScript with strict mode enabled
2. Implement proper error handling everywhere
3. Use Zod or Joi for input validation
4. Implement authentication with JWT
5. Hash passwords with bcrypt
6. Use mongoose for MongoDB with proper schemas and indexes
7. Follow layered architecture (routes -> controllers -> services -> models)
8. Include .env.example with ALL environment variables
9. NO README - DO NOT CREATE README.md FILES
10. NO ERRORS - code must compile and run perfectly
11. Use proper HTTP status codes
12. Implement rate limiting and security headers
13. Add proper logging
14. Follow RESTful API conventions
15. Create a seed.js or seed.ts file that populates the database with sample data
16. The seed file should include realistic, complete data for ALL models
17. Include at least 10-20 sample records for main entities
18. Seed file should be runnable with: node seed.js or npm run seed`;

    const backendMessages = [
      { role: "system" as const, content: getSystemPrompt() },
      { role: "user" as const, content: BASE_PROMPT },
      { role: "user" as const, content: `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${nodeprompt}\n\nThis is the base template. You MUST include ALL these files plus any additional files needed for the project.` },
      { role: "user" as const, content: enhancedBackendContext }
    ];

    const backendResponse = await backendClient.chat.completions.create({
      model: "gemini-2.5-pro",
      messages: backendMessages as any,
    });

    const backendCode = backendResponse.choices[0].message.content || '';
    console.log(`✅ Backend code generated: ${backendCode.length} chars\n`);

    if (!backendCode || backendCode.length === 0) {
      throw new Error('Backend generation failed - no code returned');
    }

    // ============================================================
    // STEP 2: ANALYZE BACKEND WITH gemini-2.5-flash-lite
    // ============================================================
    console.log('═'.repeat(60));
    console.log('STEP 2: ANALYZING BACKEND WITH gemini-2.5-flash-lite');
    console.log('═'.repeat(60) + '\n');

    const analysisPrompt = `You are a backend architecture expert. Analyze this backend code and provide a DETAILED analysis.

BACKEND CODE:
${backendCode}

PROVIDE DETAILED ANALYSIS OF:

1. **ROUTES & ENDPOINTS**:
   - List ALL routes/endpoints with HTTP methods and paths
   - Example: GET /api/v1/users, POST /api/v1/users, etc.

2. **CONTROLLERS**:
   - List all controllers and their methods
   - What each controller does
   - Example: UserController.register(), UserController.login(), etc.

3. **MODELS & DATABASE**:
   - List all database models/schemas
   - Fields in each model
   - Relationships between models
   - Example: User model has fields: email, password, name, etc.

4. **AUTHENTICATION & AUTHORIZATION**:
   - How authentication works (JWT, sessions, etc.)
   - Protected routes
   - User roles/permissions if any

5. **FEATURES IMPLEMENTED**:
   - List all features: user auth, CRUD operations, validation, etc.
   - What users can do with this backend

6. **API SPECIFICATION**:
   - For each endpoint: method, path, what it does, required fields, response format
   - Authentication required: yes/no
   - Example: POST /api/v1/users/register - Creates new user, requires email and password

7. **VALIDATION & ERROR HANDLING**:
   - What validation is implemented
   - Error codes and messages
   - How errors are handled

8. **SERVICES & BUSINESS LOGIC**:
   - What services exist
   - What business logic is implemented

PROVIDE THIS ANALYSIS IN A STRUCTURED FORMAT THAT FRONTEND DEVELOPER CAN UNDERSTAND.`;

    const analysisMessages = [
      {
        role: "system" as const,
        content: "You are a backend architecture expert. Analyze backend code and provide detailed, structured analysis for frontend developers."
      },
      {
        role: "user" as const,
        content: analysisPrompt
      }
    ];

    console.log('📊 Analyzing backend with gemini-2.5-flash-lite-preview-09-2025...\n');

    const analysisResponse = await analysisClient.chat.completions.create({
      model: "gemini-2.5-flash-lite-preview-09-2025",
      messages: analysisMessages as any,
    });

    const backendAnalysis = analysisResponse.choices[0].message.content || '';
    console.log(`✅ Backend analysis completed: ${backendAnalysis.length} chars\n`);

    if (!backendAnalysis || backendAnalysis.length === 0) {
      throw new Error('Backend analysis failed - no analysis returned');
    }

    // ============================================================
    // STEP 3: CREATE DETAILED MERGED PROMPT
    // ============================================================
    console.log('═'.repeat(60));
    console.log('STEP 3: CREATING DETAILED MERGED PROMPT');
    console.log('═'.repeat(60) + '\n');

    const mergedPrompt = `${QUALITY_REQUIREMENTS}

${FRONTEND_QUALITY_CHECKLIST}

=== BACKEND ANALYSIS & SPECIFICATION ===

${backendAnalysis}

=== FRONTEND REQUIREMENTS FROM USER ===

${frontendContext}

=== CRITICAL FRONTEND GENERATION INSTRUCTIONS ===

YOU ARE CREATING A FRONTEND THAT INTEGRATES WITH THE BACKEND DESCRIBED ABOVE.

1. **UNDERSTAND THE BACKEND FIRST**:
   - Read the backend analysis above carefully
   - Understand all routes, controllers, models, and features
   - Frontend MUST use these exact routes and features

2. **USE REACT HOOKS PROPERLY**:
   - Use useState for component state
   - Use useEffect for API calls and side effects
   - Use useContext for global state (auth, user info)
   - Use useCallback for memoized functions
   - Use useMemo for expensive computations
   - Create custom hooks for reusable logic

3. **API INTEGRATION (CRITICAL)**:
   - Create an API service/utility file (api.ts or apiClient.ts)
   - Use fetch or axios for HTTP requests
   - For each backend endpoint, create a corresponding function
   - Example: if backend has POST /api/v1/users/register, create registerUser() function
   - Handle loading states, errors, and success responses
   - Store JWT token in localStorage after login
   - Send Authorization header with every request

4. **AUTHENTICATION PAGES (IF BACKEND HAS AUTH)**:
   - Create Login page (/login) with email/password form
   - Create Signup page (/signup) with email/password/confirm password
   - Use useEffect to check if user is logged in
   - Redirect to login if not authenticated
   - Store token in localStorage
   - Create logout functionality

5. **PAGES & COMPONENTS FOR EACH BACKEND FEATURE**:
   - For each backend model/feature, create corresponding frontend pages
   - Example: if backend has User model with CRUD, create:
     * User list page (GET /api/v1/users)
     * User detail page (GET /api/v1/users/:id)
     * Create user page (POST /api/v1/users)
     * Edit user page (PUT /api/v1/users/:id)
     * Delete user button (DELETE /api/v1/users/:id)

6. **STATE MANAGEMENT**:
   - Use useState for local component state
   - Use useContext for global state (auth, user, theme)
   - Use useEffect for fetching data from backend
   - Use useCallback to prevent unnecessary re-renders

7. **FORMS & VALIDATION**:
   - Create forms for creating/updating data
   - Use react-hook-form for form handling
   - Use zod for validation
   - Show validation errors to user
   - Show loading state while submitting

8. **DATA DISPLAY**:
   - Create lists/grids for displaying data from backend
   - Use useEffect to fetch data when component mounts
   - Show loading skeleton while fetching
   - Show error message if fetch fails
   - Show empty state if no data

9. **NAVIGATION**:
   - Use React Router DOM for routing
   - Create navigation header with links to all pages
   - Show user info in header if logged in
   - Show logout button in header

10. **DESIGN & STYLING**:
    - Use Tailwind CSS for styling
    - Create consistent design system
    - Make responsive for mobile, tablet, desktop
    - Use semantic colors and tokens

11. **ERROR HANDLING**:
    - Handle API errors gracefully
    - Show user-friendly error messages
    - Handle 401 (unauthorized) by redirecting to login
    - Handle 403 (forbidden) by showing permission error
    - Handle 500 (server error) by showing retry option

12. **LOADING & EMPTY STATES**:
    - Show loading skeleton while fetching data
    - Show empty state when no data available
    - Show error state when API call fails
    - Show success message after creating/updating/deleting

REMEMBER: This frontend MUST be fully integrated with the backend. Every page should interact with backend APIs using proper React hooks. Every feature in the backend should have a corresponding frontend page/component.`;

    console.log(`📝 Merged prompt created: ${mergedPrompt.length} chars\n`);

    // ============================================================
    // STEP 4: GENERATE FRONTEND WITH MERGED PROMPT
    // ============================================================
    console.log('═'.repeat(60));
    console.log('STEP 4: GENERATING INTEGRATED FRONTEND');
    console.log('═'.repeat(60) + '\n');

    const frontendMessages = [
      { role: "system" as const, content: getSystemPrompt() },
      { role: "user" as const, content: BASE_PROMPT },
      { role: "user" as const, content: `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${COMPLETE_REACT_TEMPLATE}\n\nThis is the base template. You MUST include ALL these config files plus any additional files needed for the project.` },
      { role: "user" as const, content: mergedPrompt }
    ];

    console.log('🎨 Generating frontend with merged prompt...\n');

    const frontendResponse = await frontendClient.chat.completions.create({
      model: "gemini-2.5-pro",
      messages: frontendMessages as any,
    });

    const frontendCode = frontendResponse.choices[0].message.content || '';
    const finishReason = frontendResponse.choices[0].finish_reason;

    console.log(`✅ Frontend code generated: ${frontendCode.length} chars`);
    console.log(`   Finish reason: ${finishReason}\n`);

    if (!frontendCode || frontendCode.length === 0) {
      if (finishReason && finishReason.toString().includes('content_filter')) {
        console.error('❌ RECITATION FILTER TRIGGERED!');
        console.error('   Retrying with simplified prompt...\n');

        // Retry with simplified prompt
        const simplifiedPrompt = `${QUALITY_REQUIREMENTS}

${FRONTEND_QUALITY_CHECKLIST}

Backend has these features:
${backendAnalysis.substring(0, 2000)}

User wants:
${frontendContext}

Create a React frontend that:
1. Uses useState, useEffect, useContext hooks
2. Integrates with backend APIs
3. Has login/signup if backend has auth
4. Has pages for each backend feature
5. Uses Tailwind CSS
6. Is fully responsive
7. Has proper error handling and loading states`;

        const retryMessages = [
          { role: "system" as const, content: getSystemPrompt() },
          { role: "user" as const, content: BASE_PROMPT },
          { role: "user" as const, content: `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${COMPLETE_REACT_TEMPLATE}\n\nThis is the base template. You MUST include ALL these config files plus any additional files needed for the project.` },
          { role: "user" as const, content: simplifiedPrompt }
        ];

        const retryResponse = await frontendClient.chat.completions.create({
          model: "gemini-2.5-pro",
          messages: retryMessages as any,
        });

        const retryFrontendCode = retryResponse.choices[0].message.content || '';
        console.log(`✅ Frontend code generated (retry): ${retryFrontendCode.length} chars\n`);

        if (!retryFrontendCode || retryFrontendCode.length === 0) {
          throw new Error('Frontend generation failed after retry');
        }

        // Return with retry result
        console.log('═'.repeat(60));
        console.log('STEP 5: FULLSTACK GENERATION COMPLETE');
        console.log('═'.repeat(60) + '\n');

        console.log(`📦 Backend: ${backendCode.length} chars`);
        console.log(`📊 Backend Analysis: ${backendAnalysis.length} chars`);
        console.log(`🎨 Frontend: ${retryFrontendCode.length} chars`);
        console.log(`✅ Total: ${backendCode.length + retryFrontendCode.length} chars\n`);

        console.log('╔════════════════════════════════════════════════════════════╗');
        console.log('║   ✅ COMPLETE FULLSTACK GENERATION SUCCESSFUL             ║');
        console.log('╚════════════════════════════════════════════════════════════╝\n');

        res.json({
          success: true,
          backend: backendCode,
          frontend: retryFrontendCode,
          backendAnalysis: backendAnalysis,
          metadata: {
            projectId,
            backendSize: backendCode.length,
            frontendSize: retryFrontendCode.length,
            analysisSize: backendAnalysis.length,
            note: 'Frontend generated with retry due to content filter'
          }
        });
        return;
      }

      throw new Error('Frontend generation failed - no code returned');
    }

    // ============================================================
    // STEP 5: RETURN COMPLETE FULLSTACK
    // ============================================================
    console.log('═'.repeat(60));
    console.log('STEP 5: FULLSTACK GENERATION COMPLETE');
    console.log('═'.repeat(60) + '\n');

    console.log(`📦 Backend: ${backendCode.length} chars`);
    console.log(`📊 Backend Analysis: ${backendAnalysis.length} chars`);
    console.log(`🎨 Frontend: ${frontendCode.length} chars`);
    console.log(`✅ Total: ${backendCode.length + frontendCode.length} chars\n`);

    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║   ✅ COMPLETE FULLSTACK GENERATION SUCCESSFUL             ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    res.json({
      success: true,
      backend: backendCode,
      frontend: frontendCode,
      backendAnalysis: backendAnalysis,
      metadata: {
        projectId,
        backendSize: backendCode.length,
        frontendSize: frontendCode.length,
        analysisSize: backendAnalysis.length
      }
    });

  } catch (error: any) {
    console.error('\n❌ ERROR:', error.message);
    res.status(500).json({
      success: false,
      error: error.message || "Complete fullstack generation failed"
    });
  }
}
