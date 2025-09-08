import type {PromptRequest} from "@/types/shared"; // Använder PromptRequest för att säkerställa rätt format som har {prompt: string}.

export async function fetchMovieRec(prompt: string) {
  const req: PromptRequest = {prompt};

  const res = await fetch("/generate", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(req),
  });

  return await res.json();
}
