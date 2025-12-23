import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();

// CORS and JSON middleware
app.use(cors());
app.use(express.json());

const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

interface ImageKeyword {
    keyword: string;
    description: string;
}

interface UnsplashImage {
    keyword: string;
    description: string;
    imageUrl: string;
    unsplashLink: string;
    photographer: string;
}

interface ImagesData {
    websiteType: string;
    generatedAt: string;
    images: UnsplashImage[];
}

// Generate keywords using LLM (single call for 25 images)
async function generateKeywords(description: string): Promise<ImageKeyword[]> {
    const client = ModelClient(
        endpoint,
        new AzureKeyCredential(process.env.openai_api || "")
    );

    const prompt = `You are an image keyword generator for website builders. Given a website description, generate exactly 25 image keywords that would be needed for that type of website.

For example, for a "cake selling website", you might need: chocolate cake, wedding cake, birthday cake, bakery interior, frosting close-up, pastry chef, cupcakes display, etc.

Return ONLY a valid JSON array with this exact structure (no markdown, no explanation):
[
  {"keyword": "chocolate cake", "description": "Decadent chocolate layer cake for product showcase"},
  {"keyword": "wedding cake", "description": "Elegant multi-tier wedding cake for special occasions section"}
]

Generate 25 unique and relevant image keywords for: "${description}"`;

    const response = await client.path("/chat/completions").post({
        body: {
            messages: [
                { role: "system", content: "You are a helpful assistant that generates JSON arrays. Return ONLY valid JSON, no markdown formatting." },
                { role: "user", content: prompt }
            ],
            temperature: 0.7,
            top_p: 1,
            model: model
        }
    });

    if (isUnexpected(response)) {
        throw new Error(`LLM Error: ${JSON.stringify(response.body)}`);
    }

    const content = response.body.choices[0].message.content || "[]";

    // Clean up the response - remove markdown code blocks if present
    let cleanContent = content.trim();
    if (cleanContent.startsWith("```json")) {
        cleanContent = cleanContent.slice(7);
    }
    if (cleanContent.startsWith("```")) {
        cleanContent = cleanContent.slice(3);
    }
    if (cleanContent.endsWith("```")) {
        cleanContent = cleanContent.slice(0, -3);
    }
    cleanContent = cleanContent.trim();

    try {
        return JSON.parse(cleanContent) as ImageKeyword[];
    } catch (e) {
        console.error("Failed to parse LLM response:", cleanContent);
        throw new Error("Failed to parse keywords from LLM response");
    }
}

// Fetch image from Unsplash
async function fetchUnsplashImage(keyword: string): Promise<{ url: string; link: string; photographer: string } | null> {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    if (!accessKey) {
        throw new Error("UNSPLASH_ACCESS_KEY not configured");
    }

    try {
        const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(keyword)}&per_page=1`,
            {
                headers: {
                    'Authorization': `Client-ID ${accessKey}`
                }
            }
        );

        if (!response.ok) {
            console.error(`Unsplash API error for "${keyword}": ${response.status}`);
            return null;
        }

        const data = await response.json() as {
            results?: Array<{
                urls: { regular: string };
                links: { html: string };
                user: { name: string };
            }>;
        };

        if (data.results && data.results.length > 0) {
            const photo = data.results[0];
            return {
                url: photo.urls.regular,
                link: photo.links.html,
                photographer: photo.user.name
            };
        }

        return null;
    } catch (error) {
        console.error(`Error fetching image for "${keyword}":`, error);
        return null;
    }
}

// Health check
app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'image-manager' });
});

// Generate images endpoint
app.post('/images/generate', async (req: Request, res: Response) => {
    try {
        const { description } = req.body;

        if (!description) {
            res.status(400).json({ error: "Description is required" });
            return;
        }

        console.log(`\n=== Generating images for: ${description} ===`);

        // Step 1: Generate keywords using LLM (single call)
        console.log("Step 1: Generating keywords with LLM...");
        const keywords = await generateKeywords(description);
        console.log(`Generated ${keywords.length} keywords`);

        // Step 2: Fetch images from Unsplash for each keyword
        console.log("Step 2: Fetching images from Unsplash...");
        const images: UnsplashImage[] = [];

        for (let i = 0; i < keywords.length; i++) {
            const kw = keywords[i];
            console.log(`  [${i + 1}/${keywords.length}] Fetching: ${kw.keyword}`);

            const unsplashData = await fetchUnsplashImage(kw.keyword);

            if (unsplashData) {
                images.push({
                    keyword: kw.keyword,
                    description: kw.description,
                    imageUrl: unsplashData.url,
                    unsplashLink: unsplashData.link,
                    photographer: unsplashData.photographer
                });
            }

            // Small delay to respect Unsplash rate limits (50 req/hour on free tier)
            await new Promise(resolve => setTimeout(resolve, 200));
        }

        console.log(`Step 3: Fetched ${images.length} images successfully`);

        // Step 3: Create the data structure
        const imagesData: ImagesData = {
            websiteType: description,
            generatedAt: new Date().toISOString(),
            images: images
        };

        // Step 4: Save to JSON file
        const jsonFilePath = path.join(__dirname, '..', 'images.json');
        fs.writeFileSync(jsonFilePath, JSON.stringify(imagesData, null, 2));
        console.log(`Step 4: Saved to ${jsonFilePath}`);

        // Step 5: Return response
        res.json({
            success: true,
            message: `Generated ${images.length} images for "${description}"`,
            data: imagesData
        });

    } catch (error) {
        console.error("Error generating images:", error);
        res.status(500).json({
            error: "Failed to generate images",
            details: error instanceof Error ? error.message : "Unknown error"
        });
    }
});

// Get current images
app.get('/images/current', (req: Request, res: Response) => {
    try {
        const jsonFilePath = path.join(__dirname, '..', 'images.json');

        if (!fs.existsSync(jsonFilePath)) {
            res.json({ images: [], message: "No images generated yet" });
            return;
        }

        const data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
        res.json(data);
    } catch (error) {
        console.error("Error reading images:", error);
        res.status(500).json({ error: "Failed to read images" });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`\n🖼️  Image Manager Server running on http://localhost:${PORT}`);
    console.log(`   POST /images/generate - Generate images for a website`);
    console.log(`   GET  /images/current  - Get current images\n`);
});
