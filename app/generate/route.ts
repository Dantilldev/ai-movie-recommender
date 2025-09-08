import {GoogleGenerativeAI} from "@google/generative-ai";

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

If the prompt is about a theme, topic, genre (like sports), or a feeling (like sad or happy), choose movies that match that idea.

If the prompt has nothing to do with movies, do not give any recommendations.

Use short and simple movie titles and genres.

Do not add any extra text outside the JSON.

If the prompt is empty, return random movies and a final recommendation.

Always include one clear final movie in "final_recommendation".`,
});

// Add this POST handler for the API route
export async function POST(request: Request) {
  try {
    // Hämta och validera indata
    const body = await request.json();

    // Enkel validering av prompt
    if (!body.prompt && typeof body.prompt !== "string") {
      return new Response(
        JSON.stringify({
          response: false,
          error: "En giltig söksträng krävs",
        }),
        {status: 400, headers: {"Content-Type": "application/json"}}
      );
    }

    // Hämta prompt och anropa AI-modellen
    const prompt = body.prompt;
    const result = await model.generateContent(prompt);
    const output = result.response.text();

    // Rensa output och parsa JSON
    const cleaned = output.replace(/```[a-z]*|```/g, "").trim();

    try {
      // Parsa JSON-svaret
      const parsed = JSON.parse(cleaned);

      // Validering av resultatet
      if (!parsed.recommendations || !parsed.final_recommendation) {
        return new Response(
          JSON.stringify({
            response: false,
            error: "AI:n returnerade inte rätt format",
            parsed: parsed,
          }),
          {status: 500, headers: {"Content-Type": "application/json"}}
        );
      }

      // Returnera svaret
      return new Response(
        JSON.stringify({response: true, parsedOutPut: parsed}),
        {status: 200, headers: {"Content-Type": "application/json"}}
      );
    } catch (err) {
      return new Response(
        JSON.stringify({
          response: false,
          error: "Kunde inte parsa svaret från AI:n",
          cleaned: cleaned,
        }),
        {status: 500, headers: {"Content-Type": "application/json"}}
      );
    }
  } catch (error) {
    return new Response(JSON.stringify({response: false, error: "Serverfel"}), {
      status: 500,
      headers: {"Content-Type": "application/json"},
    });
  }
}
