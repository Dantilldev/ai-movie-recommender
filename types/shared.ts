// Grundläggande filmtyp - definierar strukturen för en film
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
