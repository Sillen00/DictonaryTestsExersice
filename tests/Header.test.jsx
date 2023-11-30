import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import userEvent from "@testing-library/user-event";
import App from "../src/App";
import Header from "../src/Header";

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
