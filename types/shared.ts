// Grundläggande filmtyp
export interface Movie {
  title: string;
  year: number;
  genre: string;
}

// Typ för förfrågan till API:et
export interface PromptRequest {
  prompt: string;
}

// AIresponsens struktur
export interface AIResponse {
  recommendations: Movie[];
  final_recommendation: Movie;
}

// API-svarets struktur
export interface MovieResponse {
  response: boolean;
  parsedOutPut?: AIResponse;
  error?: string;
}

// Omdbs filmuppgifter
export interface OmdbMovieDetails {
  Poster?: string;
  Plot?: string;
  Director?: string;
  Actors?: string;
  imdbRating?: string;
}

// UI state typ
export type UiState =
  | {status: "idle"}
  | {status: "loading"}
  | {status: "error"; message: string}
  | {status: "success"; movies: Movie[]; finalPick: Movie | null};
