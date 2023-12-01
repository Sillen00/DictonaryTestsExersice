import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SearchBarWord from "../src/SearchBarWord";
import WordContainer from "../src/WordContainer";

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

    it("should show error message when search is empty", async () => {
        render(<WordContainer />);

        const user = userEvent.setup();
        const searchButton = screen.getByRole("button", { name: "Search" });
        await user.click(searchButton);

        const errorMessageElement = await screen.findByText(
            /No results found./i
        );
        expect(errorMessageElement).toBeInTheDocument();
    });

    it("should show error message when search is invalid", async () => {
        render(<WordContainer />);

        const user = userEvent.setup();
        const searchbar = screen.getByRole("textbox");
        await user.type(searchbar, "invalidddooooooo");

        const searchButton = screen.getByRole("button", { name: "Search" });
        await user.click(searchButton);

        const errorMessageElement = await screen.findByText(/Word not found./i);
        expect(errorMessageElement).toBeInTheDocument();
    });

    it("should be able to do search by pressing enter", async () => {
        const handleSearch = vi.fn();

        render(<SearchBarWord onSearch={handleSearch} errorMessage={""} />);
        const user = userEvent.setup();
        const searchbar = screen.getByRole("textbox");
        await user.type(searchbar, "hello");
        await waitFor(() => expect(searchbar).toHaveValue("hello"));

        await user.type(searchbar, "{enter}");

        expect(handleSearch).toHaveBeenCalledWith("hello");
    });
});
