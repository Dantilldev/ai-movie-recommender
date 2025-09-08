import {MovieSchema, MovieArraySchema} from "@/types/shared";
import type {Movie} from "@/types/shared";

// Type guard för att kontrollera om en variabel är ett Movie-objekt
export function isMovie(obj: unknown): obj is Movie {
  return MovieSchema.safeParse(obj).success;
}

// Type guard för att kontrollera om en variabel är en array av Movie-objekt
export function isMovieArray(arr: unknown): arr is Movie[] {
  return MovieArraySchema.safeParse(arr).success;
}
