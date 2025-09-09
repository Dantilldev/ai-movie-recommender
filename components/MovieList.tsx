"use client";
import { useFavorites } from "@/components/FavoritesContext";
import MovieDetails from "@/components/MovieDetails";
import { X, Trash2 } from "lucide-react";

export default function MovieList() {
  const { favorites, toggleFavorite, clearFavorites } = useFavorites();

  return (
    <div className="mt-8 w-full max-w-lg">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">❤️ Your Favorites</h2>
        {favorites.length > 0 && (
          <button
            onClick={clearFavorites}
            className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800 transition"
          >
            <Trash2 size={16} />
            Clear All
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <p className="text-gray-500">No favorites yet.</p>
      ) : (
        <ul className="space-y-4">
          {favorites.map((movie, idx) => (
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
                <button
                  onClick={() => toggleFavorite(movie)}
                  className="p-1 text-gray-400 hover:text-red-500 transition"
                  title="Remove from favorites"
                >
                  <X size={18} />
                </button>
              </div>
              <MovieDetails movie={movie} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
