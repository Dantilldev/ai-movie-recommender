import {GoogleGenerativeAI} from "@google/generative-ai";

const apiKey = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey!);

export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `You are a movie recommendation engine.
Given a user prompt, always respond ONLY with valid JSON in this format:
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
Return exactly the number of recommendations requested by the user.
If the user prompt is about a theme, topic, genre (such as sports), or a feeling/mood (such as sad, happy), recommend movies that fit that theme or mood.
If the prompt cannot be connected to movies at all, do not provide any recommendations.
Use short and clear movie titles and genres.
Do not include any extra text outside the JSON.
Handle empty prompts by returning random recommendations and a final_recommendation.
Always include a specific final movie in "final_recommendation".`,
});

// Add this POST handler for the API route
export async function POST(request: Request) {
  try {
    const {prompt} = await request.json();
    const result = await model.generateContent(prompt);
    const output = result.response.text();
    console.log("OUTPUT:", output);
    const cleaned = output.replace(/```[a-z]*|```/g, "").trim();
    console.log("CLEANED OUTPUT: ", cleaned);
    let parsed;

    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.error("JSON parse error:", err, cleaned);
      return new Response(
        JSON.stringify({response: false, error: "JSON parse error", cleaned}),
        {status: 500, headers: {"Content-Type": "application/json"}}
      );
    }

    return new Response(
      JSON.stringify({response: true, parsedOutPut: parsed}),
      {
        status: 200,
        headers: {"Content-Type": "application/json"},
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({response: false, error: error?.toString()}),
      {status: 500, headers: {"Content-Type": "application/json"}}
    );
  }
}
