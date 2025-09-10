"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchMovieRec } from "@/lib/client";
import { Movie } from "@/types/shared";
import FavoriteButton from "@/components/FavoriteButton";
import MovieDetails from "@/components/MovieDetails";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [finalPick, setFinalPick] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);


  const handleGenerate = async () => {
    setLoading(true);
    setMovies([]);
    setFinalPick(null);

    try {
      setError(null);
      const response = await fetchMovieRec(prompt);

      if (!response.response) {
        setError(response.error || "❌ Något gick fel med API:et");
        return;
      }

      if (!response.parsedOutPut) {
        setError("❌ Ingen data mottogs");
        return;
      }

      setMovies(response.parsedOutPut.recommendations);
      setFinalPick(response.parsedOutPut.final_recommendation);
      setPrompt("");
    } catch (err) {
      setError("❌ Något gick fel. Försök igen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
      
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-yellow-400 via-transparent to-transparent opacity-30 pointer-events-none" />
      
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full bg-gradient-to-br from-black via-gray-900 to-black opacity-80" />
      </div>
      <div className="w-full max-w-2xl relative z-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          🎬 Movie Recommender
        </h1>

        {/* Input + Button */}
        <div className="flex gap-2 mb-6">
          <input
            autoFocus // User flow: Automatically focus the input field on page load
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your preferences..."
            disabled={loading}
            className="border rounded-lg px-4 py-2 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-900 text-yellow-200 placeholder-yellow-400"
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-yellow-400 text-gray-900 px-5 py-2 rounded-lg shadow-sm hover:bg-yellow-500 disabled:opacity-50 font-bold min-w-[120px]"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></span> //Loading spinner
            )}
            {loading ? "Generating..." : "Get"}
          </button>
        </div>

        {/* Favorites Button */}
        <div className="flex justify-end mb-8">
          <button
            onClick={() => router.push("/favorites")}
            className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg shadow hover:bg-yellow-500 transition font-bold"
          >
            Visa favoriter
          </button>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded bg-red-100 text-red-700 border border-red-300 flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={handleGenerate}
              className="ml-4 text-sm text-red-800 underline"
            > 
            {/* User Flow */}
              Försök igen 
            </button>
          </div>
        )}
        {/* Ready state (when nothing yet) */} 
        {!loading && !error && movies.length === 0 && !finalPick && (
          <p className="text-center text-gray-500 mt-10">
            👆 Enter your preferences above to get movie recommendations!
          </p>
)}
        {/* Recommendations */}
        {movies.length > 0 && (
          <div className="mb-8">
            <h2 className="font-semibold text-xl mb-4 text-white text-center">🎥 Recommendations</h2>
            <ul className="space-y-4">
              {movies.map((movie, idx) => (
                <li
                  key={idx}
                  className="border rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-lg">
                        {movie.title}{" "}
                        <span className="text-gray-500 text-sm">
                          ({movie.year})
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">{movie.genre}</p>
                    </div>
                    <FavoriteButton movie={movie} />
                  </div>
                  <MovieDetails movie={movie} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Final Pick */}
        {finalPick && (
          <div className="mb-10 border-t pt-6">
            <h3 className="font-semibold text-lg mb-2 text-white text-center">⭐ Final Pick</h3>
            <div className="border rounded-xl p-4 shadow bg-white">
              <p className="font-bold text-lg">
                {finalPick.title}{" "}
                <span className="text-gray-500 text-sm">
                  ({finalPick.year})
                </span>
              </p>
              <p className="text-sm text-gray-600">{finalPick.genre}</p>
              <div className="mt-3 flex gap-3">
                <FavoriteButton movie={finalPick} />
                <MovieDetails movie={finalPick} />
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-yellow-900 via-transparent to-transparent opacity-20 pointer-events-none" />
    </div>
  );
}