import {z} from "zod";

// Grundläggande filmtyp - definierar strukturen för en film
export type Movie = {
  title: string;
  year: number;
  genre: string;
};

// Typ för förfrågan till API:et
export type PromptRequest = {
  prompt: string;
};

// Zod-schema för validering av en film
const MovieObjectSchema = z.object({
  title: z.string(),
  year: z.number(),
  genre: z.string(),
});

// Zod-schema för validering av filmarray
const MovieArraySchema = z.array(MovieObjectSchema);

// Zod-schema för validering av prompt
export const PromptRequestSchema = z.object({
  prompt: z.string(),
});

// Zod-schema för validering av AI-svar
export const AIResponseSchema = z.object({
  recommendations: MovieArraySchema,
  final_recommendation: MovieObjectSchema,
});

// Typ som genereras från Zod-schemat - har samma struktur
export type AIResponse = {
  recommendations: Movie[];
  final_recommendation: Movie;
};

// API-svarets struktur
export type MovieResponse = {
  response: boolean;
  parsedOutPut?: AIResponse;
  error?: string;
};
