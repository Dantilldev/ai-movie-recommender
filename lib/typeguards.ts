import {Movie} from "@/types/shared";

export function isMovie(obj: any): obj is Movie {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.title === "string" &&
    typeof obj.year === "number" &&
    typeof obj.genre === "string"
  );
}

export function isMovieArray(arr: any): arr is Movie[] {
  return Array.isArray(arr) && arr.every(isMovie);
}
