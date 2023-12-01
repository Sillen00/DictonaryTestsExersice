import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import WordContainer from "../src/WordContainer";

describe("FavoriteWords functionality tests", () => {
    it.only("should display favorite words", async () => {
        render(<WordContainer />);
        const user = userEvent.setup();

        const searchbar = screen.getByRole("textbox");
        await user.type(searchbar, "father");
        await waitFor(() => expect(searchbar).toHaveValue("father"));

        const searchButton = screen.getByRole("button", { name: "Search" });
        await user.click(searchButton);

        const favoriteButton = await screen.findByTestId("favoriteWordButton");
        await user.click(favoriteButton);

        // Search for another word to expect "father" to be the only text in the favorite list.
        await user.clear(searchbar);
        await user.type(searchbar, "hamster");
        await waitFor(() => expect(searchbar).toHaveValue("hamster"));
        await user.click(searchButton);

        // Expect the favorite word father to be displayed in the favorite list.
        const favoriteWords = await screen.findByText(/father/i);
        expect(favoriteWords).toBeInTheDocument();
    });

    it("should be able to remove favorite word with 💩 button", async () => {
        render(<WordContainer />);
        const user = userEvent.setup();

        const searchbar = screen.getByRole("textbox");
        await user.type(searchbar, "father");
        await waitFor(() => expect(searchbar).toHaveValue("father"));

        const searchButton = screen.getByRole("button", { name: "Search" });
        await user.click(searchButton);

        const favoriteButton = await screen.findByTestId("favoriteWordButton");
        await user.click(favoriteButton);

        const removeButton = await screen.findByRole("button", { name: "💩" });
        await user.click(removeButton);

        // Search for another word to expect "father" to not be in the favorite list or search field.
        await user.clear(searchbar);
        await user.type(searchbar, "hamster");
        await waitFor(() => expect(searchbar).toHaveValue("hamster"));

        await user.click(searchButton);

        await waitFor(() =>
            expect(screen.queryByText(/father/i)).not.toBeInTheDocument()
        );
    });
});
