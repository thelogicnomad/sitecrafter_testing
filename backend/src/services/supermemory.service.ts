import axios from 'axios';

const SUPERMEMORY_API_URL = 'https://api.supermemory.ai/v3';

export class SupermemoryService {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.SUPERMEMORY_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('[Supermemory] No API key found. Supermemory features will be disabled.');
    }
  }

  async addDocument(content: string, metadata?: {
    containerTag?: string;
    customId?: string;
    metadata?: Record<string, string | number | boolean>;
  }): Promise<{ id: string; status: string } | null> {
    if (!this.apiKey) {
      console.log('[Supermemory] Skipping document add - no API key');
      return null;
    }

    try {
      const payload: any = {
        content,
        userId: 'system'
      };
      
      // Map containerTag to spaceId for consistency
      if (metadata?.containerTag) {
        payload.spaceId = metadata.containerTag;
      }
      if (metadata?.customId) {
        payload.customId = metadata.customId;
      }
      if (metadata?.metadata) {
        payload.metadata = metadata.metadata;
      }
      
      const response = await axios.post(
        `${SUPERMEMORY_API_URL}/documents`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('[Supermemory] Document added:', response.data.id);
      return response.data;
    } catch (error: any) {
      console.error('[Supermemory] Error adding document:', error.response?.data || error.message);
      return null;
    }
  }

  async addMultipleDocuments(documents: Array<{
    content: string;
    customId?: string;
    metadata?: Record<string, string | number | boolean>;
  }>, containerTag: string): Promise<void> {
    if (!this.apiKey) {
      console.log('[Supermemory] Skipping batch add - no API key');
      return;
    }

    console.log(`[Supermemory] Adding ${documents.length} documents to container: ${containerTag}`);
    
    for (const doc of documents) {
      await this.addDocument(doc.content, {
        containerTag,
        customId: doc.customId,
        metadata: doc.metadata
      });
    }

    console.log('[Supermemory] All documents added successfully');
  }

  async searchMemories(query: string, containerTag?: string): Promise<string> {
    if (!this.apiKey) {
      console.log('[Supermemory] Skipping search - no API key');
      return '';
    }

    try {
      // Try searching with just query first, then filter by spaceId if needed
      const searchParams: any = { 
        query,
        userId: 'system',
        limit: 10
      };
      
      // Only add spaceId if we have a containerTag
      if (containerTag) {
        searchParams.spaceId = containerTag;
      }

      console.log('[Supermemory] Searching with params:', JSON.stringify(searchParams, null, 2));

      const response = await axios.post(
        `${SUPERMEMORY_API_URL}/search`,
        searchParams,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('[Supermemory] Search response:', JSON.stringify(response.data, null, 2));

      const results = response.data.results || response.data.memories || response.data.data || [];
      
      if (results.length === 0) {
        console.log('[Supermemory] No results found in search response');
        return '';
      }

      const contextText = results.map((result: any, idx: number) => {
        return `[Memory ${idx + 1}]\n${result.content || result.text || result.body || ''}`;
      }).join('\n\n');

      console.log(`[Supermemory] Found ${results.length} relevant memories`);
      return contextText;
    } catch (error: any) {
      console.error('[Supermemory] Error searching memories:', error.response?.data || error.message);
      return '';
    }
  }

  async getBackendContext(containerTag: string): Promise<string> {
    console.log('[Supermemory] Retrieving backend context...');
    
    const queries = [
      'API routes and endpoints',
      'database models and schemas',
      'authentication and middleware',
      'backend architecture and services'
    ];

    const allContext: string[] = [];

    for (const query of queries) {
      const context = await this.searchMemories(query, containerTag);
      if (context) {
        allContext.push(context);
      }
    }

    const fullContext = allContext.join('\n\n');
    
    if (fullContext.length > 0) {
      console.log(`[Supermemory] Retrieved ${fullContext.length} chars of backend context`);
    }

    return fullContext;
  }
}
