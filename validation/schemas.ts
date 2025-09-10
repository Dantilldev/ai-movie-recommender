import {z} from "zod";

// Zod-schema för validering av en film, används i AIResponseSchema
export const MovieSchema = z.object({
  title: z.string(),
  year: z.number(),
  genre: z.string(),
});

// Zod-schema för validering av filmarray, används i AIResponseSchema
export const MovieArraySchema = z.array(MovieSchema);

// Zod-schema för validering av prompt, avänds i route.ts
export const PromptRequestSchema = z.object({
  prompt: z.string(),
});

// Zod-schema för validering av AI-svar, används i route.ts
export const AIResponseSchema = z.object({
  recommendations: MovieArraySchema,
  final_recommendation: MovieSchema,
});
