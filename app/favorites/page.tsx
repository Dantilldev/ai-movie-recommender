"use client";


import { useEffect, useState } from "react";
import Link from "next/link";


export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);


  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      const parsed = JSON.parse(stored).filter(movie => movie && movie.title);
      setFavorites(parsed);
    }
  }, []);


  const removeFavorite = (idx) => {
    const updated = favorites
      .filter((_, i) => i !== idx)
      .filter(movie => movie && movie.title);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };


  const closePopup = () => setSelectedMovie(null);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-0 relative overflow-hidden home-bg">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 opacity-80 pointer-events-none" />
      <div className="mb-8 w-full flex justify-center relative z-10">
        <div className="flex items-center gap-4">
          <span className="text-yellow-400 text-5xl drop-shadow-lg animate-pulse">🍿</span>
          <span className="text-white text-4xl font-extrabold tracking-widest drop-shadow-xl font-serif">Mina Favoriter</span>
          <span className="text-yellow-400 text-5xl drop-shadow-lg animate-pulse">🎬</span>
        </div>
      </div>
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black bg-opacity-90 rounded-2xl shadow-2xl p-10 w-full max-w-xl border-4 border-yellow-400 relative z-10">
        <h1 className="text-3xl font-bold mb-6 text-yellow-400 text-center font-serif drop-shadow-lg">⭐ Favoritfilmer</h1>
        {favorites.length === 0 ? (
          <p className="text-yellow-300 text-center">Du har inga favoriter ännu.</p>
        ) : (
          <ul className="space-y-3">
            {favorites.map((movie, idx) => (
              <li
                key={idx}
                className="border p-3 rounded shadow-sm bg-gray-900 border-yellow-400 flex justify-between items-center cursor-pointer hover:bg-gray-800 transition"
                onClick={() => setSelectedMovie(movie)}
              >
                <div>
                  <p className="font-bold text-yellow-400">
                    {movie.title}{" "}
                    <span className="text-gray-300">({movie.year})</span>
                  </p>
                  <p className="text-sm text-yellow-200">{movie.genre}</p>
                </div>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    removeFavorite(idx);
                  }}
                  className="ml-4 bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded font-bold shadow"
                >
                  Ta bort
                </button>
              </li>
            ))}
          </ul>
        )}
        <Link href="/" className="block mt-6 text-yellow-300 underline text-center font-bold">
          Tillbaka till rekommendationer
        </Link>
      </div>
      {/* Popup */}
      {selectedMovie && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-900 border-4 border-yellow-400 rounded-2xl p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={closePopup}
              className="absolute top-3 right-3 text-yellow-400 text-2xl font-bold hover:text-yellow-300"
              aria-label="Stäng"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">{selectedMovie.title}</h2>
            <p className="text-white text-lg mb-2 text-center">
              <span className="font-semibold text-yellow-300">År:</span> {selectedMovie.year}
            </p>
            <p className="text-white text-lg mb-2 text-center">
              <span className="font-semibold text-yellow-300">Genre:</span> {selectedMovie.genre}
            </p>
            {/* Lägg till mer info här om du har, t.ex. skådespelare, beskrivning osv */}
          </div>
        </div>
      )}
    </div>
  );
}
