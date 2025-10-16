
import { GoogleGenAI, Type } from '@google/genai';
import type { ProjectData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        projectName: { type: Type.STRING },
        overview: {
            type: Type.OBJECT,
            properties: {
                summary: { type: Type.STRING },
                keyConcepts: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                },
            },
            required: ['summary', 'keyConcepts'],
        },
        carousels: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    slides: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                type: { type: Type.STRING, enum: ['definition', 'analogy', 'technical', 'code', 'usecase'] },
                                title: { type: Type.STRING },
                                content: { type: Type.STRING },
                                diagram: { type: Type.STRING, nullable: true, description: "Optional: A Mermaid.js syntax diagram if applicable." },
                                codeLanguage: { type: Type.STRING, nullable: true },
                            },
                            required: ['type', 'title', 'content'],
                        },
                    },
                },
                required: ['title', 'slides'],
            },
        },
        flashcards: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    term: { type: Type.STRING },
                    icon: { type: Type.STRING, description: "A simple noun to represent the term, e.g., 'Lock', 'Bridge', 'Tree'" },
                    explanations: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                level: { type: Type.STRING, enum: ['Beginner', 'Intermediate', 'Advanced'] },
                                text: { type: Type.STRING },
                            },
                            required: ['level', 'text'],
                        },
                    },
                    codeExample: { type: Type.STRING, nullable: true },
                },
                required: ['term', 'icon', 'explanations'],
            },
        },
        scenarios: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    steps: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                title: { type: Type.STRING },
                                content: { type: Type.STRING },
                                code: { type: Type.STRING, nullable: true },
                            },
                            required: ['title', 'content'],
                        },
                    },
                },
                required: ['title', 'steps'],
            },
        },
        glossary: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    term: { type: Type.STRING },
                    definition: { type: Type.STRING },
                },
                required: ['term', 'definition'],
            },
        },
    },
    required: ['projectName', 'overview', 'carousels', 'flashcards', 'scenarios', 'glossary'],
};


export async function generateEducationalContent(projectName: string): Promise<ProjectData> {
    const prompt = `
        Act as a world-class Web3 technical educator. Your task is to analyze the provided Web3 project or concept, "${projectName}", and generate a comprehensive set of educational materials in a structured JSON format. You must break down complex topics into digestible, engaging, and multi-layered content suitable for various learning styles.

        **Instructions:**
        1.  **Analyze the Core Concepts:** Deeply understand the key technical aspects, architecture, and purpose of "${projectName}".
        2.  **Generate Structured JSON:** Create a complete JSON object that strictly adheres to the provided schema. The JSON should be a single, complete object.
        3.  **Create Diverse Learning Modules:**
            *   **Overview:** Provide a concise summary and a list of the most important concepts.
            *   **Carousels:** For 2-3 core concepts, create a 5-slide carousel for each. Each carousel should follow this sequence: Definition, Real-world Analogy, Technical Breakdown, Code Example (if applicable), and Use Case.
            *   **Flashcards:** Generate 4-6 flashcards for key terms. Each flashcard must have three levels of explanation: Beginner (ELI5), Intermediate (for a developer), and Advanced (deep technical details).
            *   **Scenarios:** Create 1-2 narrative learning scenarios. Each scenario should walk the user through a problem-solving journey related to the topic.
            *   **Glossary:** Compile a list of important terms and their simple definitions.
        4.  **Content Quality:** Ensure all content is accurate, clear, and well-written. Analogies should be simple and intuitive. Technical explanations should be precise. Code examples should be relevant and concise.

        **Example of a good analogy for "Smart Contract":** A smart contract is like a digital vending machine. You put in a specific coin (cryptocurrency), and the machine is programmed to automatically give you a specific snack (a digital asset or service) without needing a person to operate it. The rules are coded directly into the machine and can't be changed.

        Now, please generate the complete educational module for "${projectName}".
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const jsonText = response.text;
        const data = JSON.parse(jsonText);
        
        // Basic validation
        if (!data.projectName || !data.carousels || data.carousels.length === 0) {
            throw new Error("Generated content is missing required fields.");
        }

        return data as ProjectData;

    } catch (error) {
        console.error("Error generating content from Gemini:", error);
        throw new Error("Failed to parse or retrieve valid educational content from the AI model.");
    }
}
