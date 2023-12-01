import React, { useEffect, useState } from "react";
import FavoriteWords from "./FavoriteWords";
import SearchBarWord from "./SearchBarWord";
import WordCard from "./WordCard";

const WordContainer = () => {
    const [searchResultWord, setSearchResultWord] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [favoriteWords, setFavoriteWords] = useState([] as string[]);

    useEffect(() => {
        try {
            const storedFavoriteWords = sessionStorage.getItem("favoriteWords");
            if (storedFavoriteWords) {
                setFavoriteWords(JSON.parse(storedFavoriteWords));
            }
        } catch (error) {
            console.error(
                "Error parsing favoriteWords from sessionStorage:",
                error
            );
        }
    }, [setFavoriteWords]);

    const handleSearch = async (searchTerm) => {
        try {
            const response = await fetch(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`
            );

            if (response.ok) {
                const data = await response.json();
                setSearchResultWord([]);

                setSearchResultWord(data);
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

    const handleFavoriteWord = (word) => {
        if (favoriteWords.includes(word)) {
            // setFavoriteWords(favoriteWords.filter((w) => w !== word));
            const updatedFavorites = favoriteWords.filter((w) => w !== word);
            setFavoriteWords(updatedFavorites);
            sessionStorage.setItem(
                "favoriteWords",
                JSON.stringify(updatedFavorites)
            );
        } else {
            // setFavoriteWords([...favoriteWords, word]);
            const updatedFavorites = [...favoriteWords, word];
            setFavoriteWords(updatedFavorites);
            sessionStorage.setItem(
                "favoriteWords",
                JSON.stringify(updatedFavorites)
            );
        }
    };

    const handleRemoveFavoriteWord = (word) => {
        const updatedFavorites = favoriteWords.filter((w) => w !== word);
        setFavoriteWords(updatedFavorites);
        sessionStorage.setItem(
            "favoriteWords",
            JSON.stringify(updatedFavorites)
        );
    };

    return (
        <div>
            <SearchBarWord
                errorMessage={errorMessage}
                onSearch={handleSearch}
            />

            <WordCard
                searchResultWord={searchResultWord}
                onFavoriteWord={handleFavoriteWord}
                favoriteWords={favoriteWords}
            />

            <FavoriteWords
                favoriteWords={favoriteWords}
                onRemoveFavoriteWord={handleRemoveFavoriteWord}
                onSearch={handleSearch}
            />
        </div>
    );
};

export default WordContainer;
