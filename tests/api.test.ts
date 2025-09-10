import { describe, it, expect, vi } from "vitest";
import { fetchMovieRec } from "@/lib/client";

global.fetch = vi.fn(() =>
    Promise.resolve({
        ok: true, 
        status: 200, 
        json: () =>
            Promise.resolve({
            response: true,
            parsedOutPut: {
                recommendations: [{ title: "Inception", year: 2010, genre: "Sci-Fi" }],
                final_recommendation: { title: "Interstellar", year: 2014, genre: "Sci-Fi" }
            }
            })
        } as Partial<Response> as Response) // 👈 safer casting
);

describe("fetchMovieRec", () => {
    it("returns parsed movie data", async () => {
        const res = await fetchMovieRec("sci-fi");
        expect(res.parsedOutPut).toBeDefined();
        expect(res.parsedOutPut!.recommendations[0].title).toBe("Inception");
    });
});
