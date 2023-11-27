import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import userEvent from "@testing-library/user-event";
import App from "../src/App";
import Header from "../src/Header";
import SearchBarWord from "../src/SearchBarWord";
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
