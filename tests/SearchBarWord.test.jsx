import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SearchBarWord from "../src/SearchBarWord";
import WordContainer from "../src/WordContainer";

import userEvent from "@testing-library/user-event";

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
