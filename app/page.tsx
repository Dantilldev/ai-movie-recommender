"use client";
import {useState} from "react";
import {fetchMovieRec} from "@/lib/client";
import {Movie} from "@/types/shared";
import {AIResponseSchema} from "@/types/shared";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [finalPick, setFinalPick] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setMovies([]);
    setFinalPick(null);

    try {
      // Hämta data från API
      const response = await fetchMovieRec(prompt);

      // kontroll av svaret
      if (!response || !response.parsedOutPut) {
        alert("Fick inget svar från API:et");
        return;
      }

      // Kontrollera rekommendationer
      if (response.parsedOutPut.recommendations?.length === 0) {
        alert("Hittade inga filmer för din sökning, försök igen senare.");
        return;
      }

      // Validering med Zod och använd data direkt
      const validData = AIResponseSchema.parse(response.parsedOutPut);
      setMovies(validData.recommendations);
      setFinalPick(validData.final_recommendation);
      setPrompt("");
    } catch (err) {
      console.error("Error:", err);
      alert("Funkar inte, försök igen senare.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">🎬 Movie Recommender</h1>

      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your preferences..."
        className="border rounded px-3 py-2 w-80 mb-3"
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Generating..." : "Get Recommendations"}
      </button>

      {/* Recommendations */}
      {movies.length > 0 && (
        <div className="mt-6 w-96">
          <h2 className="font-semibold mb-3">🎥 Recommendations:</h2>
          <ul className="space-y-3">
            {movies.map((movie, idx) => (
              <li key={idx} className="border p-3 rounded shadow-sm bg-gray-50">
                <p className="font-bold">
                  {movie.title}{" "}
                  <span className="text-gray-500">({movie.year})</span>
                </p>
                <p className="text-sm text-gray-600">{movie.genre}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Final Pick */}
      {finalPick && (
        <div className="mt-5 border-t pt-3 w-96">
          <h3 className="font-semibold">⭐ Final Pick</h3>
          <p className="font-bold">
            {finalPick.title}{" "}
            <span className="text-gray-500">({finalPick.year})</span>
          </p>
          <p className="text-sm text-gray-600">{finalPick.genre}</p>
        </div>
      )}
    </div>
  );
}
