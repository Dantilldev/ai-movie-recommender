"use client";
import {useState} from "react";
import {fetchMovieRec} from "@/lib/client";
import {Movie} from "@/types/shared";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [finalPick, setFinalPick] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    // Starta laddning och rensa tidigare resultat
    setLoading(true);
    setMovies([]);
    setFinalPick(null);

    try {
      // Hämta filmrekommendationer
      const response = await fetchMovieRec(prompt);

      // Kontrollerar om API:et returnerar
      if (!response.response) {
        alert(response.error || "Något gick fel med API:et");
        return;
      }

      // Kontrollerar om vi fick något svar
      if (!response.parsedOutPut) {
        alert("Ingen data mottogs");
        return;
      }

      // Använd data från API:et
      setMovies(response.parsedOutPut.recommendations); // filmer för listan
      setFinalPick(response.parsedOutPut.final_recommendation); // film för finalpick
      setPrompt("");
    } catch (err) {
      alert("Något gick fel. Försök igen.");
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
