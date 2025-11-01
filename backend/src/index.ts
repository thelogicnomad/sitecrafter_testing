import dotenv from "dotenv";
import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from 'express-session';
import passport from 'passport';
import { getSystemPrompt, BASE_PROMPT } from './prompts';
import { reactprompt } from "./deafult/react";
import { nodeprompt } from "./deafult/node";
import OpenAI from "openai";
import authRoutes from './routes/auth';
import googleAuthRoutes from './routes/googleAuth';
import './config/passport';
import { PlanningService } from './services/planning.service';

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

// Template endpoint - provides production-ready templates
app.post("/template", async (req, res) => {
  const prompt = req.body.prompt;
  
  if (!prompt) {
    res.status(400).json({ message: "Prompt is required" });
    return;
  }

  // Simplified project type detection - only for explicit backend-only projects
  const promptLower = prompt.toLowerCase();
  const explicitBackendOnly = (promptLower.includes('backend') || promptLower.includes('back-end') || 
                                promptLower.includes('api only') || promptLower.includes('server only')) &&
                               !promptLower.includes('frontend') && !promptLower.includes('ui') && 
                               !promptLower.includes('react') && !promptLower.includes('fullstack');
  
  let projectType: 'frontend' | 'backend' | 'fullstack';
  
  if (explicitBackendOnly) {
    projectType = 'backend';
  } else {
    // Default to fullstack for maximum capability
    projectType = 'fullstack';
  }

  console.log(`[Template] Project type: ${projectType} (Production-Level)`);

  // Return appropriate production-ready template
  if (projectType === 'backend') {
    res.json({
      prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${nodeprompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
      uiPrompts: [nodeprompt]
    });
    return;
  }
  
  // For frontend and fullstack, return production-ready React template
  res.json({
    prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactprompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
    uiPrompts: [reactprompt]
  });
  return;
});

// Planning endpoint
app.post("/planning", async (req, res) => {
  try {
    const { requirements } = req.body;

    if (!requirements) {
      res.status(400).json({ 
        success: false, 
        error: 'Requirements are required' 
      });
      return;
    }

    const result = await PlanningService.generateBlueprint(requirements);
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
