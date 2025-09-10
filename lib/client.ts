import type {PromptRequest, MovieResponse} from "@/types/shared";
// Funktion för att anropa API
export async function fetchMovieRec(prompt: string): Promise<MovieResponse> {
  const req: PromptRequest = {prompt}; // Skapar request objekt

  // Anropar API:et
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(req),
  });

  return (await res.json()) as MovieResponse; // Returnerar svaret som MovieResponse
}
