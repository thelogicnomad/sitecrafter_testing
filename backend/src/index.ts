import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from 'express-session';
import passport from 'passport';
import { getSystemPrompt, BASE_PROMPT } from './prompts';
import { reactprompt } from "./deafult/react";
import { COMPLETE_REACT_TEMPLATE } from "./deafult/react-complete";
import { nodeprompt } from "./deafult/node";
import { QUALITY_REQUIREMENTS, FRONTEND_QUALITY_CHECKLIST, BACKEND_QUALITY_CHECKLIST } from './prompts/quality-enforcement';
import { parseBackendCode, generateAPISpecification } from './utils/backend-parser';
import OpenAI from "openai";
import authRoutes from './routes/auth';
import googleAuthRoutes from './routes/googleAuth';
import './config/passport';
import { PlanningService } from './services/planning-fixed.service';

dotenv.config();

const app: Application = express();

const client = new OpenAI({
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
  apiKey: process.env.gemini
});

// Enhanced CORS configuration
app.use(cors({
  origin: true,
  credentials: true
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless'); // Less restrictive
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups'); // Allows authentication flows
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});

app.use(express.json());

// Session and Passport middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Auth routes
app.use('/auth', authRoutes);
app.use('/auth', googleAuthRoutes);

// Gemini AI setup
const { GoogleGenerativeAI } = require("@google/generative-ai");
const systemPrompt = getSystemPrompt();

// const genAI = new GoogleGenerativeAI(process.env.gemini);
// const model = genAI.getGenerativeModel({
//   model: "gemini-2.5-flash",
//   systemInstruction: getSystemPrompt(),
// });

// Template endpoint - uses projectType from frontend (no keyword detection)
app.post("/template", async (req: any, res: any) => {
  const { prompt, projectType } = req.body;
  
  if (!prompt) {
    res.status(400).json({
      error: 'Prompt is required'
    });
    return;
  }

  // Use projectType from frontend, fallback to 'frontend' if not provided
  const finalProjectType: 'frontend' | 'backend' | 'fullstack' = projectType || 'frontend';
  
  console.log(`[Template] Project type from frontend: ${finalProjectType}`);
  console.log(`[Template] Prompt: "${prompt.substring(0, 50)}..."`);

  // Return appropriate production-ready template based on frontend selection
  if (finalProjectType === 'backend') {
    res.json({
      prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${nodeprompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
      uiPrompts: [nodeprompt]
    });
    return;
  }
  
  // For frontend and fullstack, return production-ready React template with quality requirements
  res.json({
    prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${COMPLETE_REACT_TEMPLATE}\n\n${QUALITY_REQUIREMENTS}\n\n${FRONTEND_QUALITY_CHECKLIST}\n\nThis is the base template. You MUST include ALL these config files plus any additional files needed for the project.`],
    uiPrompts: [COMPLETE_REACT_TEMPLATE]
  });
  return;
});

// Planning endpoint
app.post("/planning", async (req, res) => {
  try {
    const { requirements, projectType } = req.body;

    if (!requirements) {
      res.status(400).json({ 
        success: false, 
        error: 'Requirements are required' 
      });
      return;
    }

    console.log(`[Planning] Project type from frontend: ${projectType || 'not provided'}`);
    const result = await PlanningService.generateBlueprint(requirements, 0, projectType);
    res.json(result);

  } catch (error: any) {
    console.error('Planning route error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    interface Message {
      role: string;
      content: string;
    }

    const messages = req.body.messages;
    
    console.log('\n🔵 /CHAT ENDPOINT CALLED');
    console.log(`📨 Received ${messages.length} messages from frontend`);
    
    // Log each message to see if detailedContext (with UI components) is included
    messages.forEach((msg: Message, index: number) => {
      console.log(`\n📬 Message ${index + 1}:`);
      console.log(`   Role: ${msg.role}`);
      console.log(`   Content length: ${msg.content?.length || 0} chars`);
      
      // Check if this message contains UI components
      if (msg.content && msg.content.includes('COMPULSORY USE ALL THESE UI COMPONENTS')) {
        console.log('   ✅ CONTAINS UI COMPONENTS!');
        console.log('   📋 Last 500 chars of this message:');
        console.log('   ' + '─'.repeat(76));
        console.log('   ' + String(msg.content).slice(-500).split('\n').join('\n   '));
        console.log('   ' + '─'.repeat(76));
      }
    });
    
    const chatMessages = [
      { role: "system", content: getSystemPrompt() },
      ...messages.map((msg: Message) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];
    
    console.log(`\n🤖 Sending ${chatMessages.length} messages to LLM...\n`);
    
    const response = await client.chat.completions.create({
      model: "gemini-2.5-pro",
      messages: chatMessages,
    });

    const responseContent = response.choices[0].message.content;
    console.log(responseContent);

    res.json({ response: responseContent });
  } catch (error) {
    console.error("Error processing chat request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Test endpoint removed - using direct context passing instead of Supermemory
// Supermemory is a memory router for LLM calls, not a document storage API
/*
app.post("/test/supermemory", async (req: Request, res: Response) => {
  try {
    console.log('\n🧪 TESTING SUPERMEMORY...\n');
    
    const supermemory = new SupermemoryService();
    const testProjectId = `test_${Date.now()}`;
    
    // Test 1: Add a document
    console.log('📝 Test 1: Adding document...');
    const testContent = `
    API Endpoint: POST /api/products
    Description: Create a new product
    Request Body: { name: string, price: number, category: string }
    Response: { id: string, name: string, price: number, category: string, createdAt: Date }
    
    API Endpoint: GET /api/products
    Description: Get all products
    Response: Array of products
    
    Database Model: Product
    Fields: { name: String, price: Number, category: String, inStock: Boolean }
    `;
    
    const addResult = await supermemory.addDocument(testContent, {
      containerTag: testProjectId,
      customId: `${testProjectId}_test_doc`,
      metadata: {
        type: 'backend',
        test: true
      }
    });
    
    if (addResult) {
      console.log('✅ Document added successfully');
      console.log('   Document ID:', addResult.id);
    } else {
      console.log('❌ Failed to add document (check API key)');
      res.json({
        success: false,
        message: 'Failed to add document. Check if SUPERMEMORY_API_KEY is set in .env',
        tests: {
          addDocument: false,
          search: false
        }
      });
      return;
    }
    
    // Wait a bit for indexing
    console.log('\n⏳ Waiting 3 seconds for indexing...');
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Test 2: Search for content
    console.log('\n🔍 Test 2: Searching for "API endpoints"...');
    const searchResult = await supermemory.searchMemories('API endpoints for products', testProjectId);
    
    if (searchResult && searchResult.length > 0) {
      console.log('✅ Search successful');
      console.log('   Found:', searchResult.substring(0, 200) + '...');
    } else {
      console.log('❌ Search failed or returned no results');
    }
    
    // Test 3: Get backend context
    console.log('\n📦 Test 3: Getting backend context...');
    const backendContext = await supermemory.getBackendContext(testProjectId);
    
    if (backendContext && backendContext.length > 0) {
      console.log('✅ Backend context retrieved');
      console.log('   Length:', backendContext.length, 'chars');
    } else {
      console.log('❌ Backend context retrieval failed');
    }
    
    console.log('\n🎉 SUPERMEMORY TEST COMPLETE\n');
    
    res.json({
      success: true,
      message: 'Supermemory is working correctly!',
      tests: {
        addDocument: !!addResult,
        search: searchResult.length > 0,
        getBackendContext: backendContext.length > 0
      },
      results: {
        documentId: addResult?.id,
        searchResultLength: searchResult.length,
        backendContextLength: backendContext.length,
        searchPreview: searchResult.substring(0, 200)
      },
      projectId: testProjectId
    });
    
  } catch (error: any) {
    console.error('❌ Supermemory test error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      hint: 'Make sure SUPERMEMORY_API_KEY is set in .env file'
    });
  }
});
*/

// TEST: Separate Backend/Frontend Generation (No Context Sharing)
app.post("/build/separate", async (req: Request, res: Response) => {
  try {
    const { backendContext, frontendContext, projectId } = req.body;
    
    console.log('\n🧪 /BUILD/SEPARATE ENDPOINT CALLED (TEST MODE)');
    console.log(`📦 Backend context: ${backendContext?.length || 0} chars`);
    console.log(`🎨 Frontend context: ${frontendContext?.length || 0} chars`);
    console.log(`🆔 Project ID: ${projectId}`);
    
    // Step 1: Generate Backend Code (Independent)
    console.log('\n📦 STEP 1: Generating backend code (independent)...');
    
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
15. **MANDATORY**: Create a seed.js or seed.ts file that populates the database with sample data
16. The seed file should include realistic, complete data for ALL models
17. Include at least 10-20 sample records for main entities
18. Seed file should be runnable with: node seed.js or npm run seed`;

    const backendMessages = [
      { role: "system" as const, content: getSystemPrompt() },
      { role: "user" as const, content: BASE_PROMPT },
      { role: "user" as const, content: `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${nodeprompt}\n\nThis is the base template. You MUST include ALL these files plus any additional files needed for the project.` },
      { role: "user" as const, content: enhancedBackendContext }
    ];

    const backendResponse = await client.chat.completions.create({
      model: "gemini-2.5-pro",
      messages: backendMessages as any,
    });
    
    const backendCode = backendResponse.choices[0].message.content || '';
    console.log(`✅ Backend code generated: ${backendCode.length} chars`);
    
    // Step 2: Generate Frontend Code (Independent - NO BACKEND CONTEXT)
    console.log('\n🎨 STEP 2: Generating frontend code (independent - no backend context)...');
    
    const independentFrontendContext = `${QUALITY_REQUIREMENTS}

${FRONTEND_QUALITY_CHECKLIST}

USER REQUIREMENTS:
${frontendContext}

CRITICAL INSTRUCTIONS:
1. Create a beautiful, modern React application
2. Use TypeScript with strict mode enabled
3. Use Tailwind CSS for styling
4. Create ALL config files (tsconfig.json, tsconfig.node.json, vite.config.ts, postcss.config.js, tailwind.config.js)
5. Include ALL dependencies in package.json
6. Implement ALL pages fully - NO placeholders
7. Use professional, web-safe color schemes
8. Make the UI responsive and accessible
9. Add loading states and error handling
10. NO README - DO NOT CREATE README.md FILES
11. NO ERRORS - code must work perfectly after npm install && npm run dev
12. Use reliable image URLs from Unsplash only
13. Create mock data for now (since no backend integration in this test)
14. Focus on beautiful UI and user experience`;
    
    const frontendMessages = [
      { role: "system" as const, content: getSystemPrompt() },
      { role: "user" as const, content: BASE_PROMPT },
      { role: "user" as const, content: `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${COMPLETE_REACT_TEMPLATE}\n\nThis is the base template. You MUST include ALL these config files plus any additional files needed for the project.` },
      { role: "user" as const, content: independentFrontendContext }
    ];
    
    const frontendResponse = await client.chat.completions.create({
      model: "gemini-2.5-pro",
      messages: frontendMessages as any,
    });
    
    const frontendCode = frontendResponse.choices[0].message.content || '';
    console.log(`✅ Frontend code generated: ${frontendCode.length} chars`);
    
    // Debug: Check what we're actually returning
    if (!frontendCode || frontendCode.length === 0) {
      console.error('❌ WARNING: Frontend code is empty!');
      console.error('Frontend response structure:', JSON.stringify(frontendResponse, null, 2).substring(0, 1000));
    }
    
    console.log('\n✅ SEPARATE GENERATION COMPLETE!\n');
    console.log(`📦 Backend: ${backendCode.length} chars`);
    console.log(`🎨 Frontend: ${frontendCode.length} chars`);
    
    // Return both backend and frontend code
    res.json({
      backend: backendCode,
      frontend: frontendCode
    });
    
  } catch (error: any) {
    console.error("Error processing separate build:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

// Fullstack Build endpoint - handles backend first, then frontend with direct context
app.post("/build/fullstack", async (req: Request, res: Response) => {
  try {
    const { backendContext, frontendContext, projectId } = req.body;
    
    console.log('\n🔄 /BUILD/FULLSTACK ENDPOINT CALLED');
    console.log(`📦 Backend context: ${backendContext?.length || 0} chars`);
    console.log(`🎨 Frontend context: ${frontendContext?.length || 0} chars`);
    console.log(`🆔 Project ID: ${projectId}`);
    
    // Step 1: Generate Backend Code
    console.log('\n📦 STEP 1: Generating backend code...');
    
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
15. **MANDATORY**: Create a seed.js or seed.ts file that populates the database with sample data
16. The seed file should include realistic, complete data for ALL models
17. Include at least 10-20 sample records for main entities
18. Seed file should be runnable with: node seed.js or npm run seed`;
    
    const backendMessages = [
      { role: "system" as const, content: getSystemPrompt() },
      { role: "user" as const, content: BASE_PROMPT },
      { role: "user" as const, content: `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${nodeprompt}\n\nThis is the base Node.js/Express template.` },
      { role: "user" as const, content: enhancedBackendContext }
    ];
    
    const backendResponse = await client.chat.completions.create({
      model: "gemini-2.5-pro",
      messages: backendMessages as any,
    });
    
    const backendCode = backendResponse.choices[0].message.content || '';
    console.log(`✅ Backend code generated: ${backendCode.length} chars`);
    
    // Step 2: Extract API information from backend code
    console.log('\n🔍 STEP 2: Extracting API context from backend code...');
    
    // Parse backend code into structured specification
    console.log('   - Parsing backend code into API specification...');
    const backendSpec = parseBackendCode(backendCode);
    const apiSpecification = generateAPISpecification(backendSpec);
    
    console.log(`   - Found ${backendSpec.endpoints.length} API endpoints`);
    console.log(`   - Found ${backendSpec.models.length} database models`);
    console.log(`   - Authentication: ${backendSpec.authentication.enabled ? 'Enabled' : 'Disabled'}`);
    console.log(`   - Features: ${backendSpec.features.join(', ')}`);
    
    // Step 3: Create enriched frontend context with backend knowledge
    console.log('\n🎨 STEP 3: Generating frontend with backend knowledge...');
    
    // Send structured API specification instead of raw code
    // This avoids Gemini's content filter while providing complete integration details
    const backendSummary = apiSpecification;

    const enrichedFrontendContext = `${QUALITY_REQUIREMENTS}

${FRONTEND_QUALITY_CHECKLIST}

${backendSummary}

USER REQUIREMENTS:
${frontendContext}

CRITICAL INSTRUCTIONS:
1. **MANDATORY BACKEND INTEGRATION** - You MUST use the backend APIs listed above
2. Create complete API service files for EVERY endpoint (src/api/*.ts)
3. NO MOCK DATA ALLOWED - Fetch everything from the backend
4. Create .env file with VITE_API_URL=http://localhost:5000
5. Implement ALL pages fully - NO placeholders or "coming soon" messages
6. Use professional, web-safe color schemes with good contrast
7. Ensure EVERY dependency is in package.json
8. Include ALL config files (tsconfig.json, tsconfig.node.json, vite.config.ts, postcss.config.js, tailwind.config.js)
9. Make the UI beautiful, modern, and responsive
10. Add loading states, error states, and empty states everywhere
11. Implement full authentication flow if backend has auth endpoints
12. NO ERRORS - code must work perfectly after npm install && npm run dev
13. NO README - DO NOT CREATE README.md FILES
14. Use reliable image URLs from Unsplash (https://images.unsplash.com/) - NO broken image links`;
    
    const frontendMessages = [
      { role: "system" as const, content: getSystemPrompt() },
      { role: "user" as const, content: BASE_PROMPT },
      { role: "user" as const, content: `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${COMPLETE_REACT_TEMPLATE}\n\nThis is the base template. You MUST include ALL these config files plus any additional files needed for the project.` },
      { role: "user" as const, content: enrichedFrontendContext }
    ];
    
    const frontendResponse = await client.chat.completions.create({
      model: "gemini-2.5-pro",
      messages: frontendMessages as any,
    });
    
    const frontendCode = frontendResponse.choices[0].message.content || '';
    console.log(`✅ Frontend code generated: ${frontendCode.length} chars`);
    
    // Debug: Check what we're actually returning
    if (!frontendCode || frontendCode.length === 0) {
      console.error('❌ WARNING: Frontend code is empty!');
      console.error('Frontend response structure:', JSON.stringify(frontendResponse, null, 2).substring(0, 1000));
    }
    
    console.log('\n✅ FULLSTACK GENERATION COMPLETE!\n');
    console.log(`📦 Sending backend: ${backendCode.length} chars`);
    console.log(`🎨 Sending frontend: ${frontendCode.length} chars`);
    
    // Return both backend and frontend code
    res.json({
      backend: backendCode,
      frontend: frontendCode
    });
    
  } catch (error: any) {
    console.error("Error processing fullstack build:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

// Helper function to extract API routes from backend code
function extractAPIRoutes(code: string): string[] {
  const routes: string[] = [];
  
  // Match Express route definitions
  const routePatterns = [
    /router\.(get|post|put|delete|patch)\(['"]([^'"]+)['"]/gi,
    /app\.(get|post|put|delete|patch)\(['"]([^'"]+)['"]/gi,
  ];
  
  routePatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(code)) !== null) {
      routes.push(`${match[1].toUpperCase()} ${match[2]}`);
    }
  });
  
  return routes.length > 0 ? routes : ['No explicit routes found - check backend code'];
}

// Helper function to extract database models from backend code
function extractDatabaseModels(code: string): string[] {
  const models: string[] = [];
  
  // Match Mongoose schema definitions
  const schemaPattern = /const\s+(\w+Schema)\s*=\s*new\s+mongoose\.Schema/gi;
  const modelPattern = /mongoose\.model\(['"](\w+)['"]/gi;
  
  let match;
  while ((match = schemaPattern.exec(code)) !== null) {
    models.push(`Schema: ${match[1]}`);
  }
  
  while ((match = modelPattern.exec(code)) !== null) {
    models.push(`Model: ${match[1]}`);
  }
  
  return models.length > 0 ? models : ['No explicit models found - check backend code'];
}

// Helper function to extract backend structure
function extractBackendStructure(code: string): string {
  const structure: string[] = [];
  
  // Check for authentication
  if (code.includes('jwt') || code.includes('JWT') || code.includes('jsonwebtoken')) {
    structure.push('✅ Authentication: JWT-based auth detected');
  }
  if (code.includes('bcrypt')) {
    structure.push('✅ Password Hashing: bcrypt detected');
  }
  
  // Check for validation
  if (code.includes('zod') || code.includes('Zod')) {
    structure.push('✅ Validation: Zod schema validation');
  }
  if (code.includes('joi') || code.includes('Joi')) {
    structure.push('✅ Validation: Joi schema validation');
  }
  
  // Check for architecture
  if (code.includes('controller') || code.includes('Controller')) {
    structure.push('✅ Architecture: MVC/Layered (controllers detected)');
  }
  if (code.includes('service') || code.includes('Service')) {
    structure.push('✅ Architecture: Service layer detected');
  }
  
  // Check for middleware
  if (code.includes('middleware') || code.includes('Middleware')) {
    structure.push('✅ Middleware: Custom middleware detected');
  }
  
  // Check for database
  if (code.includes('mongoose')) {
    structure.push('✅ Database: MongoDB with Mongoose');
  }
  
  return structure.length > 0 ? structure.join('\n') : 'Backend structure analysis pending...';
}

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('MONGODB_URI is not defined in .env file.');
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(3000, () => {
      console.log(` Server running on http://localhost:3000`);
    });
  })
  .catch((err) => {
    console.error(' MongoDB connection error:', err);
    process.exit(1);
  });
