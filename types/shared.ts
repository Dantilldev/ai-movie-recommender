import {z} from "zod";

// Film typ
export type Movie = {
  title: string;
  year: number;
  genre: string;
};

// Typ för prompt request
export type PromptRequest = {prompt: string};

// Enkelt schema för Movie
export const MovieObjectSchema = z.object({
  title: z.string(),
  year: z.number(),
  genre: z.string(),
});

// Schema för array av filmer
export const MovieArraySchema = z.array(MovieObjectSchema);

// Enkelt schema för PromptRequest
export const PromptRequestSchema = z.object({
  prompt: z.string(),
});

// Schema för AI-svar
export const AIResponseSchema = z.object({
  recommendations: MovieArraySchema,
  final_recommendation: MovieObjectSchema,
});

// Literal union för UI-states
// export type UIState = "idle" | "loading" | "error" | "success";

// använder z.infer för att undvika duplicering av typdefinitioner
// export type MovieZod = z.infer<typeof MovieSchema>;
// export type MovieArrayZod = z.infer<typeof MovieArraySchema>;
// export type AIResponseZod = z.infer<typeof AIResponseSchema>;
