/**
 * Blueprint Agent (Phase 1)
 * Generates project blueprint with autonomous feature ideation
 */

import { BaseAgent } from './base-agent';
import { AgentResult, ProjectBlueprint } from './types';
import { ProjectStateManager } from './state-manager';

export class BlueprintAgent extends BaseAgent {
  constructor(stateManager: ProjectStateManager) {
    super(stateManager, 'blueprint');
  }

  protected getSystemPrompt(): string {
    return `You are an autonomous AI project architect. Your task is to create a comprehensive blueprint for a production-level web application.

You must think like a senior product manager and architect combined. Given a simple user prompt, you will:
1. Ideate 8-12 unique features that would make this project exceptional
2. Design a complete page structure with clear navigation
3. Define all components needed with their dependencies
4. Create a cohesive design system

CRITICAL: Be creative and comprehensive. The user only provides a simple prompt - YOU must think of all the features a production app would need.

OUTPUT FORMAT: Return ONLY valid JSON matching this structure:
{
  "projectName": "string",
  "projectType": "frontend",
  "description": "Detailed project description",
  "features": [
    {
      "name": "Feature Name",
      "description": "What this feature does",
      "priority": "high|medium|low",
      "components": ["ComponentName1", "ComponentName2"]
    }
  ],
  "pages": [
    {
      "name": "PageName",
      "route": "/route-path",
      "description": "What this page shows",
      "sections": ["Hero", "Features", "CTA"],
      "components": ["Component1", "Component2"]
    }
  ],
  "components": [
    {
      "name": "ComponentName",
      "type": "ui|layout|feature|shared",
      "props": ["prop1", "prop2"],
      "dependencies": ["OtherComponent"]
    }
  ],
  "designSystem": {
    "primaryColor": "#hex",
    "secondaryColor": "#hex",
    "fontFamily": "Font Name",
    "style": "modern|minimal|playful|elegant|bold"
  },
  "dependencies": ["package-name"]
}`;
  }

  protected getUserPrompt(): string {
    const state = this.stateManager.getState();
    return `Create a comprehensive blueprint for this project:

USER REQUEST: ${state.userPrompt}

PROJECT TYPE: ${state.projectType}

Requirements:
1. Generate 8-12 unique, interesting features that go beyond the obvious
2. Create 5-8 pages with clear purposes and routes
3. Define 15-25 components organized by type
4. Design a cohesive, professional design system
5. List all npm dependencies needed

Think creatively! If the user says "cake website", think about:
- Custom cake builder/configurator
- Flavor gallery with beautiful images
- Order tracking system
- Customer reviews and testimonials
- Special occasions section
- Delivery scheduling
- And more!

Return ONLY the JSON blueprint, no explanations.`;
  }

  async execute(): Promise<AgentResult> {
    console.log('\n📋 ═══════════════════════════════════════════');
    console.log('📋 PHASE 1: BLUEPRINT AGENT');
    console.log('📋 ═══════════════════════════════════════════\n');

    try {
      // Use DIRECT call to avoid conversation context - Blueprint needs pure JSON
      const response = await this.callLLMDirect(
        this.getSystemPrompt(),
        this.getUserPrompt(),
        0.8 // Higher temperature for creativity
      );

      // Parse JSON response - handle multiple formats
      let blueprint: ProjectBlueprint;
      try {
        let cleanedResponse = response;

        // If response is wrapped in chirAction, extract the content
        const chirActionMatch = response.match(/<chirAction[^>]*>([\s\S]*?)<\/chirAction>/);
        if (chirActionMatch) {
          cleanedResponse = chirActionMatch[1];
        }

        // Remove markdown code blocks if present
        cleanedResponse = cleanedResponse
          .replace(/```json\s*/gi, '')
          .replace(/```\s*/g, '')
          .trim();

        // Try to find JSON object in the response
        const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          cleanedResponse = jsonMatch[0];
        }

        blueprint = JSON.parse(cleanedResponse);
      } catch (parseError) {
        console.error('Failed to parse blueprint JSON:', parseError);
        console.error('Raw response preview:', response.substring(0, 500));
        return this.errorResult('Failed to parse blueprint JSON from LLM response');
      }

      // Validate blueprint has required fields
      if (!blueprint.features || !blueprint.pages || !blueprint.components) {
        return this.errorResult('Blueprint missing required fields');
      }

      // Store blueprint in state
      this.stateManager.setBlueprint(blueprint);

      console.log(`\n✅ Blueprint created:`);
      console.log(`   Project: ${blueprint.projectName}`);
      console.log(`   Features: ${blueprint.features.length}`);
      console.log(`   Pages: ${blueprint.pages.length}`);
      console.log(`   Components: ${blueprint.components.length}`);
      console.log(`   Dependencies: ${blueprint.dependencies?.length || 0}`);

      return this.successResult([], 'structure');

    } catch (error: any) {
      console.error('Blueprint agent error:', error);
      return this.errorResult(`Blueprint generation failed: ${error.message}`);
    }
  }
}
