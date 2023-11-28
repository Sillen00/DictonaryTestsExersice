import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import userEvent from "@testing-library/user-event";
import App from "../src/App";
import Header from "../src/Header";
import SearchBarWord from "../src/SearchBarWord";
import WordCard from "../src/WordCard";
import WordContainer from "../src/WordContainer";

import { vi } from "vitest";

describe("Header functionality tests", () => {
    it("should have a h1 heading in header.", () => {
        render(<Header />);
        const headingText = screen.getByRole("heading", {
            name: "Simon's Dictionary",
        });
        expect(headingText).toBeInTheDocument();
    });

    it("should toggle theme when Switch is clicked", async () => {
        render(<App />);
        const user = userEvent.setup();
        const reactSwitch = screen.getByText("🌚");
        const app = screen.getByTestId("App");
        expect(app).toHaveAttribute("id", "dark");
        await user.click(reactSwitch);
        await waitFor(() => expect(app).toHaveAttribute("id", "light"));
    });
});

describe("Searchbar functionality tests", () => {
    it("should be able to search for a word", async () => {
        const handleSearch = vi.fn();

        render(<SearchBarWord onSearch={handleSearch} errorMessage={""} />);
        const user = userEvent.setup();
        const searchbar = screen.getByRole("textbox");
        await user.type(searchbar, "hello");
        await waitFor(() => expect(searchbar).toHaveValue("hello"));

        const searchButton = screen.getByRole("button", { name: "Search" });
        await user.click(searchButton);

        expect(handleSearch).toHaveBeenCalledWith("hello");
    });

    it("should show error message when search is empty or invalid", async () => {
        render(<WordContainer />);

        const user = userEvent.setup();
        const searchButton = screen.getByRole("button", { name: "Search" });
        await user.click(searchButton);

        const errorMessageElement = await screen.findByText(
            /No results found./i
        );
        expect(errorMessageElement).toBeInTheDocument();
    });
});

describe("WordCard functionality tests", () => {
    it("should display and play audio if present", async () => {
        const mockWord = {
            // Mock the necessary properties for a word with audio
            word: "mother",
            phonetics: [
                {
                    audio: "https://api.dictionaryapi.dev/media/pronunciations/en/mother-au.mp3",
                },
            ],
            meanings: [
                {
                    partOfSpeech: "noun",
                    definitions: [
                        {
                            definition: "a baby maschine",
                            example: "This is an example sentence.",
                        },
                    ],
                    synonyms: ["mom", "model", "boss"],
                    antonyms: ["opposite1", "opposite2", "opposite3"],
                },
            ],
        };

        const favoriteWords = ["example"];

        render(
            <WordCard
                searchResultWord={[mockWord]}
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
});
