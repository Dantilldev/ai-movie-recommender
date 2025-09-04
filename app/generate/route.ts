import {GoogleGenerativeAI} from "@google/generative-ai";

const apiKey = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey!);

export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `You are a movie recommendation engine.  
    You will suggest movies based on user preferences.  
    Always respond in valid JSON format like this:

    {
      "recommendations": [
        { "title": "Inception", "year": 2010, "genre": "Sci-Fi" },
        { "title": "The Matrix", "year": 1999, "genre": "Sci-Fi" }
      ],
      "final_recommendation": {
        "title": "Interstellar",
        "year": 2014,
        "genre": "Sci-Fi"
      }
    }

    Make sure to recommend a specific final movie at the end instead of being vague.`,
});

// Add this POST handler for the API route
export async function POST(request: Request) {
  try {
    const {prompt} = await request.json();

    const result = await model.generateContent(prompt);
    const output = result.response.text();

    return new Response(JSON.stringify({response: true, output}), {
      status: 200,
      headers: {"Content-Type": "application/json"},
    });
  } catch (error) {
    return new Response(
      JSON.stringify({response: false, error: error?.toString()}),
      {status: 500, headers: {"Content-Type": "application/json"}}
    );
  }
}
