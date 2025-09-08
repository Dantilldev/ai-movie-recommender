import {z} from "zod";

// Film typ
export type Movie = {
  title: string;
  year: number;
  genre: string;
};

// Typ för prompt request
export type PromptRequest = {prompt: string};

// Schema för Movie
export const MovieObjectSchema = z.object({
  title: z.string(),
  year: z.number(),
  genre: z.string(),
});

// Schema för array av filmer
export const MovieArraySchema = z.array(MovieObjectSchema);

// Schema för PromptRequest
export const PromptRequestSchema = z.object({
  prompt: z.string(),
});

// Schema för AI-svar
export const AIResponseSchema = z.object({
  recommendations: MovieArraySchema,
  final_recommendation: MovieObjectSchema,
});

// Infererad typ från AIResponseSchema
export type AIResponse = z.infer<typeof AIResponseSchema>;

// API-svarets typ (som kommer från /api/generate)
export type MovieResponse = {
  response: boolean;
  parsedOutPut?: AIResponse;
  error?: string;
};
