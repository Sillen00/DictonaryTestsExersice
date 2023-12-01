import React, { useContext } from "react";
import { ThemeContext } from "./App";
import "./Header.css";

function Header() {
    const { toggleTheme, theme } = useContext(ThemeContext);
    return (
        <header>
            <h1>Simon's Dictionary</h1>
            <nav>
                <ul>
                    {theme === "dark" ? (
                        <li onClick={toggleTheme}>🌚</li>
                    ) : (
                        <li onClick={toggleTheme}>🌞</li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
