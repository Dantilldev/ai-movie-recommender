"use client";
import { useState } from "react";
import { fetchMovieRec } from "@/lib/client";
import { Movie } from "@/types/shared";
import FavoriteButton from "@/components/FavoriteButton";
import MovieDetails from "@/components/MovieDetails";
import MovieList from "@/components/MovieList";

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
      const response = await fetchMovieRec(prompt);

      if (!response.response) {
        alert(response.error || "Något gick fel med API:et");
        return;
      }

      if (!response.parsedOutPut) {
        alert("Ingen data mottogs");
        return;
      }

      setMovies(response.parsedOutPut.recommendations);
      setFinalPick(response.parsedOutPut.final_recommendation);
      setPrompt("");
    } catch (err) {
      alert("Något gick fel. Försök igen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          🎬 Movie Recommender
        </h1>

        {/* Input + Button */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your preferences..."
            className="border rounded-lg px-4 py-2 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-sm hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Get"}
          </button>
        </div>

        {/* Recommendations */}
        {movies.length > 0 && (
          <div className="mb-8">
            <h2 className="font-semibold text-xl mb-4">🎥 Recommendations</h2>
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
            <h3 className="font-semibold text-lg mb-2">⭐ Final Pick</h3>
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

        {/* Favorites */}
        <MovieList />
      </div>
    </div>
  );
}
