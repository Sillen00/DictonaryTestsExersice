import React, { useContext } from "react";
import ReactSwitch from "react-switch";
import { ThemeContext } from "./App";
import "./Header.css";

function Header() {
    const { toggleTheme, theme } = useContext(ThemeContext);
    return (
        <header>
            <h1>Simon's Dictionary</h1>
            <nav>
                <ul>
                    {theme === "dark" ? <li>🌚</li> : <li>🌞</li>}
                    <li>
                        <ReactSwitch
                            onChange={toggleTheme}
                            checked={theme === "dark"}
                        />
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
