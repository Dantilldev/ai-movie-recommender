"use client";


import { useState, useEffect } from "react";
import Link from "next/link";


export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [movies, setMovies] = useState([]); // store parsed movies
  const [finalPick, setFinalPick] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);


  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);


  const handleGenerate = async () => {
    setLoading(true);
    setMovies([]);
    setFinalPick(null);


    try {
      const request = `Recommend movies based on: ${prompt}.
      Return ONLY valid JSON in this format:
      {
        "recommendations": [
          {"title": "Movie title", "year": 2000, "genre": "Comedy"},
          {"title": "Another title", "year": 2010, "genre": "Drama"}
        ],
        "final_recommendation": {"title": "Best Pick", "year": 1995, "genre": "Romance"}
      }`;


      const res = await fetch("/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: request }),
      });


      const data = await res.json();


      if (!data.output) {
        console.error("No output from AI:", data);
        return;
      }


      let responseText = data.output;


      // Clean unwanted fences safely
      const cleaned = responseText
        .toString()
        .trim()
        .replace(/^```json/, "")
        .replace(/^```/, "")
        .replace(/```$/, "");


      const parsed = JSON.parse(cleaned);


      if (parsed.recommendations && Array.isArray(parsed.recommendations)) {
        setMovies(parsed.recommendations);
      }
      if (parsed.final_recommendation) {
        setFinalPick(parsed.final_recommendation);
      }
    } catch (err) {
      console.error("Error parsing movie recommendations:", err);
      setMovies([]);
      setFinalPick(null);
    }


    setLoading(false);
  };


  const addToFavorites = (movie) => {
    if (!favorites.some(fav => fav.title === movie.title && fav.year === movie.year)) {
      const updated = [...favorites, movie];
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
    }
  };


  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-0 relative overflow-hidden home-bg"
    >
      {/* Overlay for dark cinema effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 opacity-80 pointer-events-none" />
      {/* Filmstrip top */}
      <div className="w-full flex justify-center mb-4 relative z-10">
        <div className="flex gap-2">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-6 h-2 bg-yellow-400 rounded-sm mx-0.5" />
          ))}
        </div>
      </div>
      {/* Header */}
      <div className="mb-8 w-full flex justify-center relative z-10">
        <div className="flex items-center gap-4">
          <span className="text-yellow-400 text-5xl drop-shadow-lg animate-pulse">🍿</span>
          <span className="text-white text-4xl font-extrabold tracking-widest drop-shadow-xl font-serif">BIO RECOMMENDER</span>
          <span className="text-yellow-400 text-5xl drop-shadow-lg animate-pulse">🎬</span>
        </div>
      </div>
      {/* Main Card */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black bg-opacity-90 rounded-2xl shadow-2xl p-10 w-full max-w-xl border-4 border-yellow-400 relative z-10">
        {/* Curtain effect */}
        <div className="absolute inset-0 pointer-events-none rounded-2xl border-4 border-yellow-400 curtain-effect" />
        <h1 className="text-3xl font-bold mb-6 text-yellow-400 text-center font-serif drop-shadow-lg">🎥 Välj din filmupplevelse</h1>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Vilken typ av film vill du se? (genre, år, skådespelare...)"
          className="border border-yellow-400 rounded px-4 py-3 w-full mb-4 bg-gray-900 text-white placeholder-yellow-300 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-yellow-400 hover:bg-yellow-300 transition text-black px-6 py-3 rounded font-bold w-full shadow-xl disabled:opacity-50 text-lg tracking-wide mb-4"
        >
          {loading ? "Genererar..." : "Få rekommendationer"}
        </button>
        {/* Snygg favorit-knapp */}
        <Link
          href="/favorites"
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-black font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition mb-6 w-full text-lg"
        >
          <span className="text-2xl">⭐</span>
          <span>Mina favoriter</span>
        </Link>
        {/* Recommendations */}
        {movies.length > 0 && (
          <div className="mt-8 p-6 border-2 border-yellow-400 rounded-xl bg-black bg-opacity-80 text-white font-mono">
            <h2 className="font-semibold mb-3 text-yellow-300 text-xl">AI rekommenderar:</h2>
            <ul className="space-y-3">
              {movies.map((movie, idx) => (
                <li key={idx} className="border p-3 rounded shadow-sm bg-gray-900 border-yellow-400 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-yellow-400">
                      {movie.title}{" "}
                      <span className="text-gray-300">({movie.year})</span>
                    </p>
                    <p className="text-sm text-yellow-200">{movie.genre}</p>
                  </div>
                  <button
                    onClick={() => addToFavorites(movie)}
                    className="ml-4 bg-yellow-400 hover:bg-yellow-300 text-black px-3 py-1 rounded font-bold shadow disabled:opacity-50"
                    disabled={favorites.some(fav => fav.title === movie.title && fav.year === movie.year)}
                  >
                    ⭐ Favorit
                  </button>
                </li>
              ))}
            </ul>
            <Link href="/favorites" className="block mt-6 text-yellow-300 underline text-center font-bold">
              Visa favoriter
            </Link>
          </div>
        )}
        {/* Final Pick */}
        {finalPick && (
          <div className="mt-5 border-t pt-3 w-full">
            <h3 className="font-semibold text-yellow-300 text-lg">⭐ Final Pick</h3>
            <p className="font-bold text-yellow-400">
              {finalPick.title}{" "}
              <span className="text-gray-300">({finalPick.year})</span>
            </p>
            <p className="text-sm text-yellow-200">{finalPick.genre}</p>
          </div>
        )}
      </div>
      {/* Filmstrip bottom */}
      <div className="w-full flex justify-center mt-8 relative z-10">
        <div className="flex gap-2">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-6 h-2 bg-yellow-400 rounded-sm mx-0.5" />
          ))}
        </div>
      </div>
      {/* Footer */}
      <footer className="mt-10 text-yellow-300 text-sm opacity-70 font-mono relative z-10">
        © {new Date().getFullYear()} BIO Recommender. Alla rättigheter förbehållna.
      </footer>
    </div>
  );
}

