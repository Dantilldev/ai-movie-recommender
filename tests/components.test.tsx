import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FavoriteButton from "@/components/FavoriteButton";
import '@testing-library/jest-dom';
import { FavoritesProvider } from "@/components/FavoritesContext";

describe("FavoriteButton", () => {
    it("renders button", () => {
        render(
            <FavoritesProvider>
                <FavoriteButton movie={{ title: "Inception", year: 2010, genre: "Sci-Fi" }} />
            </FavoritesProvider>
        );
        expect(screen.getByRole("button")).toBeInTheDocument();
    });
});
