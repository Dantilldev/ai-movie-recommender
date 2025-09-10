"use client";
import {useState, useEffect} from "react";
import {Movie} from "@/types/shared";
import {OmdbMovieDetails} from "@/types/shared";

interface MovieDetailsProps {
  movie: Movie;
}

export default function MovieDetails({movie}: MovieDetailsProps) {
  const [details, setDetails] = useState<OmdbMovieDetails | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?t=${encodeURIComponent(
          movie.title
        )}&apikey=209bdbf3`
      );
      const data = await res.json();
      setDetails(data);
    } catch {
      alert("Failed to fetch details");
    } finally {
      setLoading(false);
    }
  };

  // Fetch movie details when component mounts
  useEffect(() => {
    fetchDetails();
  }, [movie.title]);

  return (
    <div className="mt-2">
      {loading && <p className="text-sm text-gray-500">Loading details...</p>}

      {details && (
        <div className="mt-3 text-sm bg-gray-50 p-3 rounded flex gap-4">
          {details.Poster && details.Poster !== "N/A" && (
            <img
              src={details.Poster}
              alt={`${movie.title} Poster`}
              className="w-32 h-auto rounded shadow"
            />
          )}
          <div>
            <p>
              <strong>Plot:</strong> {details.Plot}
            </p>
            <p>
              <strong>Director:</strong> {details.Director}
            </p>
            <p>
              <strong>Actors:</strong> {details.Actors}
            </p>
            <p>
              <strong>IMDB:</strong> ⭐ {details.imdbRating}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
