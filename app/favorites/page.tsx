"use client";
import { useFavorites } from "@/components/FavoritesContext";
import FavoriteButton from "@/components/FavoriteButton";
import MovieDetails from "@/components/MovieDetails";
import { Trash2 } from "lucide-react";

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-0 relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
      
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-yellow-400 via-transparent to-transparent opacity-30 pointer-events-none" />
      
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full bg-gradient-to-br from-black via-gray-900 to-black opacity-80" />
      </div>
      
      <div className="mb-8 w-full flex justify-center relative z-10">
        <div className="flex items-center gap-4">
          <span className="text-yellow-400 text-5xl drop-shadow-lg animate-pulse">🍿</span>
          <span className="text-white text-4xl font-extrabold tracking-widest drop-shadow-xl font-serif">Mina Favoriter</span>
          <span className="text-yellow-400 text-5xl drop-shadow-lg animate-pulse">🎬</span>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black bg-opacity-90 rounded-2xl shadow-2xl p-10 w-full max-w-6xl border-4 border-yellow-400 relative z-10">
        <h1 className="text-3xl font-bold mb-6 text-yellow-400 text-center font-serif drop-shadow-lg">⭐ Favoritfilmer</h1>
        <div className="flex justify-end mb-4">
          <button
            onClick={clearFavorites}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold shadow"
          >
            <Trash2 size={16} />
            Clear All
          </button>
        </div>
        <div className="flex flex-row gap-8 overflow-x-auto pb-4">
          {favorites.length === 0 && (
            <div className="text-yellow-300 text-center font-semibold w-full">Inga favoriter ännu.</div>
          )}
          {favorites.map((movie) => (
            <div
              key={movie.title}
              className="min-w-[340px] max-w-sm border rounded-xl p-6 shadow bg-gray-900 border-yellow-400 flex flex-col justify-between items-center hover:bg-gray-800 transition"
            >
              <div className="w-full">
                <p className="font-bold text-yellow-400 text-xl font-serif text-center">
                  {movie.title} <span className="text-gray-300">({movie.year})</span>
                </p>
                <p className="text-base text-yellow-200 text-center">{movie.genre}</p>
                <MovieDetails movie={movie} />
              </div>
              <div className="mt-6">
                <FavoriteButton movie={movie} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-yellow-300 underline font-bold hover:text-yellow-400 transition"
          >
            Tillbaka till rekommendationer
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-yellow-900 via-transparent to-transparent opacity-20 pointer-events-none" />
       </div>
  );
}