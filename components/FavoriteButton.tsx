"use client";
import { Movie } from "@/types/shared";
import { Heart } from "lucide-react";
import { useFavorites } from "@/components/FavoritesContext";

export default function FavoriteButton({ movie }: { movie: Movie }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(movie);

  return (
    <button
      onClick={() => toggleFavorite(movie)}
      className={`flex items-center gap-1 px-3 py-1 rounded-lg transition ${
        fav ? "bg-red-500 text-white" : "bg-gray-200 hover:bg-gray-300"
      }`}
    >
      <Heart size={18} fill={fav ? "white" : "none"} className="transition" />
      {fav ? "Remove" : "Favorite"}
    </button>
  );
}
