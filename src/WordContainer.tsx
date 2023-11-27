import React, { useState } from "react";
import SearchBarWord from "./SearchBarWord";
import WordCard from "./WordCard";

const WordContainer = () => {
    const [searchResultWord, setSearchResultWord] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSearch = async (searchTerm) => {
        try {
            const response = await fetch(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`
            );

            if (response.ok) {
                const data = await response.json();
                setSearchResultWord(data);
                console.log(data);
                setErrorMessage("");
            } else {
                if (!searchTerm || searchTerm.trim() === "") {
                    setErrorMessage("No results found.");
                    setSearchResultWord([]);
                    return;
                }
                setErrorMessage("Word not found.");
                setSearchResultWord([]); // Clear previous results if there was an error
            }
        } catch (error) {
            console.error("Error fetching word:", error);
            setErrorMessage("Error fetching word");
            setSearchResultWord([]); // Clear previous results if there was an error
        }
    };

    return (
        <div>
            <SearchBarWord
                errorMessage={errorMessage}
                onSearch={handleSearch}
            />

            <WordCard searchResultWord={searchResultWord} />
        </div>
    );
};

export default WordContainer;
