"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [movies, setMovies] = useState([]); // store parsed movies
  const [finalPick, setFinalPick] = useState(null);
  const [loading, setLoading] = useState(false);

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
