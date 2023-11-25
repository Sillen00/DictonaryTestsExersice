import { createContext, useState } from "react";
import "./App.css";
import Header from "./Header";
import WordContainer from "./WordContainer";

export const ThemeContext = createContext({
    theme: "light",
    toggleTheme: () => {},
});

function App() {
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme((curr) => (curr === "light" ? "dark" : "light"));
    };
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className="App" id={theme}>
                <Header />
                <WordContainer />
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
