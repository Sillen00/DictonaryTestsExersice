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
        const user = userEvent.setup();
        const audioElement = screen.getByRole("audio");
        expect(audioElement).toBeInTheDocument();
        await user.click(audioElement);
        waitFor(() => {
            // Check if the audio is playing
            expect(audioElement).toHaveAttribute("playing", "");
        }, 1000);
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
        expect(wordCardWords.length).not.toEqual(0);

        const wordCardDefinition = await screen.findByText(
            /Capable of producing great physical force./i
        );
        expect(wordCardDefinition).toBeInTheDocument();

        const wordCardExample = await screen.findByText(
            /a big strong man; Jake was tall and strong/i
        );
        expect(wordCardExample).toBeInTheDocument();

        const wordCardSynonym = await screen.findByText(/powerful/i);
        expect(wordCardSynonym).toBeInTheDocument();

        const wordCardAntonym = await screen.findByText(/forceless/i);
        expect(wordCardAntonym).toBeInTheDocument();
    });
});
