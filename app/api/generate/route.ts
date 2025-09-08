import {GoogleGenerativeAI} from "@google/generative-ai";
import {AIResponseSchema} from "@/types/shared";

const apiKey = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey!);

export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `You are a movie recommendation engine.

When the user gives a prompt, reply only with valid JSON in this format:
{
  "recommendations": [
    { "title": "Inception", "year": 2010, "genre": "Sci-Fi" },
    { "title": "The Matrix", "year": 1999, "genre": "Sci-Fi" },
    { "title": "Arrival", "year": 2016, "genre": "Sci-Fi" }
  ],
  "final_recommendation": {
    "title": "Interstellar",
    "year": 2014,
    "genre": "Sci-Fi"
  }
}

Give exactly the number of recommendations the user asks for.
If the prompt is about a theme, topic, genre, or feeling, choose movies that match.
If the prompt has nothing to do with movies, do not give any recommendations.
Use short movie titles and genres.
Do not add text outside the JSON.
If the prompt is empty, return random movies.
Always include one final movie in "final_recommendation".`,
});

export async function POST(request: Request) {
  try {
    // Hämtar data från requesten
    const body = await request.json();
    const prompt = body.prompt || ""; // Hanterar promten eller om den är tom för att får random filmer enligt instruktionen

    // Anropa AI:n
    const result = await model.generateContent(prompt);
    const cleaned = result.response
      .text()
      .replace(/```[a-z]*|```/g, "")
      .trim();

    // Parsa och validera svaret
    const parsed = JSON.parse(cleaned);
    const validData = AIResponseSchema.parse(parsed);

    // Returnera framgångsrikt svar
    return Response.json({
      response: true,
      parsedOutPut: validData,
    });
  } catch (error) {
    // Felhantering
    console.error("Error in /api/generate: ", error);
    return Response.json(
      {
        response: false,
        error: "Kunde inte hämta filmer",
      },
      {status: 500}
    );
  }
}
