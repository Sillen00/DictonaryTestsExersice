import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import WordContainer from "../src/WordContainer";

describe("FavoriteWords functionality tests", () => {
    it("should call onRemoveFavoriteWord when clicking the remove button", async () => {
        render(<WordContainer />);
        const user = userEvent.setup();

        const searchbar = screen.getByRole("textbox");
        await user.type(searchbar, "mother");
        await waitFor(() => expect(searchbar).toHaveValue("mother"));

        const searchButton = screen.getByRole("button", { name: "Search" });
        await user.click(searchButton);

        const favoriteButton = await screen.findByTestId("favoriteWordButton");
        await user.click(favoriteButton);

        const removeButton = await screen.findByRole("button", { name: "💩" });
        await user.click(removeButton);

        // Search for another word to expect "mother" to not be in the favorite list or search field.
        await user.clear(searchbar);
        await user.type(searchbar, "hamster");
        await waitFor(() => expect(searchbar).toHaveValue("hamster"));

        await user.click(searchButton);

        const motherText = screen.queryByText("mother");
        await waitFor(() => expect(motherText).not.toBeInTheDocument());
    });

    it("should display favorite words", async () => {
        render(<WordContainer />);
        const user = userEvent.setup();

        const searchbar = screen.getByRole("textbox");
        await user.type(searchbar, "mother");
        await waitFor(() => expect(searchbar).toHaveValue("mother"));

        const searchButton = screen.getByRole("button", { name: "Search" });
        await user.click(searchButton);

        const favoriteButton = await screen.findByTestId("favoriteWordButton");
        await user.click(favoriteButton);

        // Search for another word to expect "mother" to be the only text.
        await user.clear(searchbar);
        await user.type(searchbar, "hamster");
        await waitFor(() => expect(searchbar).toHaveValue("hamster"));

        await user.click(searchButton);

        // Expect the favorite word mother to be displayed in the favorite list.
        const favoriteWords = await screen.findByText(/mother/i);
        expect(favoriteWords).toBeInTheDocument();
    });
});
