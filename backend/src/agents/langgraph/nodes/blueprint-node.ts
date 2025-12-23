/**
 * Blueprint Node - Generates project blueprint
 */

import { WebsiteState, ProjectBlueprint } from '../graph-state';
import { invokeLLM } from '../llm-utils';
import { storeBlueprintMemory, clearProjectMemory, generateProjectId } from '../memory-utils';

// Complete list of dependencies
const STANDARD_DEPENDENCIES: Record<string, string> = {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.1.1",
    "framer-motion": "^11.14.4",
    "lucide-react": "^0.460.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.5",
    "react-hook-form": "^7.54.0",
    "@hookform/resolvers": "^3.9.1",
    "zod": "^3.24.1",
    "zustand": "^5.0.2",
    "@tanstack/react-query": "^5.62.2",
    "axios": "^1.7.9",
    "sonner": "^1.7.3",
    "date-fns": "^4.1.0",
    "gsap": "^3.12.5"
};

const DEV_DEPENDENCIES: Record<string, string> = {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@types/node": "^22.10.2",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.2",
    "vite": "^6.0.5",
    "eslint": "^9.16.0"
};

export async function blueprintNode(state: WebsiteState): Promise<Partial<WebsiteState>> {
    console.log('\n📋 ═══════════════════════════════════════════');
    console.log('📋 NODE: BLUEPRINT');
    console.log('📋 ═══════════════════════════════════════════\n');

    const systemPrompt = `You are a senior software architect designing a modern React web application.

Generate a detailed project blueprint in JSON format.

IMPORTANT: Return ONLY valid JSON, no markdown, no explanations.`;

    const userPrompt = `Design a production-ready React application for:

"${state.userPrompt}"

Return a JSON object with this EXACT structure:
{
    "projectName": "kebab-case-name",
    "description": "Detailed description of the application",
    "features": [
        { "name": "Feature Name", "description": "What it does", "priority": "high|medium|low" }
    ],
    "pages": [
        { 
            "name": "PageName", 
            "route": "/route-path", 
            "description": "What this page shows",
            "sections": ["Hero", "Features", "CTA"],
            "components": ["ComponentName1", "ComponentName2"]
        }
    ],
    "components": [
        { "name": "ComponentName", "type": "ui|feature|layout", "props": ["prop1", "prop2"] }
    ],
    "designSystem": {
        "primaryColor": "#hexcode",
        "secondaryColor": "#hexcode",
        "accentColor": "#hexcode",
        "style": "modern|minimal|playful|corporate",
        "fonts": ["Inter", "system-ui"]
    }
}

REQUIREMENTS:
1. Include 5-7 pages: Home, About, Services/Products, Contact, 404, and 1-2 more relevant pages
2. Include these UI components: Button, Card, Input, Modal, Badge, Avatar, Skeleton
3. Include 3-5 feature components specific to this project
4. Make component and page names PascalCase with no spaces
5. Choose colors that match the project theme
6. Keep the design focused and cohesive`;

    try {
        const response = await invokeLLM(systemPrompt, userPrompt, 0.8);

        // Extract JSON from response
        let jsonStr = response;
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            jsonStr = jsonMatch[0];
        }

        const blueprint: ProjectBlueprint = JSON.parse(jsonStr);

        // Add standard dependencies
        blueprint.dependencies = { ...STANDARD_DEPENDENCIES };

        // Ensure page names are valid
        blueprint.pages = blueprint.pages.map(page => ({
            ...page,
            name: page.name.replace(/\s+/g, '')
        }));

        console.log(`✅ Blueprint created: ${blueprint.projectName}`);
        console.log(`   Pages: ${blueprint.pages.length}`);
        console.log(`   Components: ${blueprint.components.length}`);
        console.log(`   Features: ${blueprint.features.length}`);

        // Generate project ID for Mem0 tracking
        const projectId = generateProjectId(blueprint.projectName);
        console.log(`   🧠 Project ID: ${projectId}`);

        // Clear any previous memory for this project and store new blueprint
        await clearProjectMemory(projectId);
        await storeBlueprintMemory(projectId, blueprint);

        return {
            blueprint,
            projectId,
            currentPhase: 'blueprint',
            messages: [`Blueprint created: ${blueprint.projectName} with ${blueprint.pages.length} pages`]
        };

    } catch (error: any) {
        console.error('❌ Blueprint generation failed:', error.message);
        throw error;
    }
}

export { STANDARD_DEPENDENCIES, DEV_DEPENDENCIES };
