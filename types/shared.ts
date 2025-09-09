// Delade typer: PromptRequest, AIResponse, Movie, UI-states mm
export type Movie = {
  id: string;
  title: string;
  year: number;
};

export type PromptRequest = {
  prompt: string;
};

export type AIResponse = {
  movies: Movie[];
};
