import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import userEvent from "@testing-library/user-event";
import WordCard from "../src/WordCard";
import WordContainer from "../src/WordContainer";

import mockWordArray from "./mockWordArray.json";

describe("WordCard functionality tests", () => {
    it("should display and play audio if present", async () => {
        const favoriteWords = ["example", "example2"];

        render(
            <WordCard
                searchResultWord={mockWordArray}
                favoriteWords={favoriteWords}
            />
        );
        const audioElement = screen.getByRole("audio");
        expect(audioElement).toBeInTheDocument();
        expect(audioElement).toHaveAttribute(
            "src",
            "https://api.dictionaryapi.dev/media/pronunciations/en/mother-au.mp3"
        );
    });

    it("should display the result values in the wordCard", async () => {
        render(<WordContainer />);
        const user = userEvent.setup();
        const searchbar = screen.getByRole("textbox");
        await user.type(searchbar, "strong");
        await waitFor(() => expect(searchbar).toHaveValue("strong"));

        const searchButton = screen.getByRole("button", { name: "Search" });
        await user.click(searchButton);

        const wordCardWords = await screen.findAllByText(/strong/i);
        expect(wordCardWords).toHaveLength(5);

        const wordCardDefinition = await screen.findByText(
            /Capable of producing great physical force./i
        );
        expect(wordCardDefinition).toBeInTheDocument();

        const wordCardExample = await screen.findByText(
            /a big strong man; Jake was tall and strong/i
        );
        expect(wordCardExample).toBeInTheDocument();

        const wordCardSynonym = await screen.findByText("powerful");
        expect(wordCardSynonym).toBeInTheDocument();

        const wordCardAntonym = await screen.findByText("forceless");
        expect(wordCardAntonym).toBeInTheDocument();
    });

    it("should be able to search and favorice a word, search another word then go back and it should still be favoriced", async () => {
        render(<WordContainer />);
        const user = userEvent.setup();

        const searchbar = screen.getByRole("textbox");
        await user.type(searchbar, "father");
        await waitFor(() => expect(searchbar).toHaveValue("father"));

        const searchButton = screen.getByRole("button", { name: "Search" });
        await user.click(searchButton);

        const favoriteButton = await screen.findAllByTestId(
            "favoriteWordButton"
        );
        await user.click(favoriteButton[0]);

        // Search for another word to expect "father" to be the only text in the favorite list.
        await user.clear(searchbar);
        await user.type(searchbar, "hamster");
        await waitFor(() => expect(searchbar).toHaveValue("hamster"));
        await user.click(searchButton);

        // Go back to the word "father" and expect it to still be favoriced.
        await user.clear(searchbar);
        await user.type(searchbar, "father");
        await waitFor(() => expect(searchbar).toHaveValue("father"));
        await user.click(searchButton);

        const favoriteWords2 = await screen.findAllByText(/🧡/i);
        expect(favoriteWords2).toHaveLength(2);
    });
});
