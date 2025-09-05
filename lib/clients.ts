import type {PromptRequest} from "@/types/shared";

export async function fetchMovieRec(prompt: string) {
  const req: PromptRequest = {prompt}; // typkontroll

  const res = await fetch("/generate", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(req),
  });

  return await res.json();
}
