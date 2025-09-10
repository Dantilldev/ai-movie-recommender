import { describe, it, expect } from "vitest";
import { AIResponseSchema } from "@/types/shared";

describe("AIResponseSchema", () => {
    it("accepts valid movie response", () => {
        const data = {
            recommendations: [
            { title: "Inception", year: 2010, genre: "Sci-Fi" },
            { title: "The Matrix", year: 1999, genre: "Sci-Fi" }
            ],
            final_recommendation: { title: "Interstellar", year: 2014, genre: "Sci-Fi" }
        };

        expect(() => AIResponseSchema.parse(data)).not.toThrow();
    });

    it("rejects invalid movie response", () => {
        const badData = {
            recommendations: [{ title: "Inception", year: "wrong-year", genre: "Sci-Fi" }],
            final_recommendation: { title: "Interstellar", year: 2014 }
        };

        expect(() => AIResponseSchema.parse(badData)).toThrow();
    });
});
