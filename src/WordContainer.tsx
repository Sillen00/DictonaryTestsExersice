import React, { useEffect, useState } from "react";
import SearchBarWord from "./SearchBarWord";
import WordCard from "./WordCard";

const WordContainer = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResultWord, setSearchResultWord] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!searchTerm || searchTerm.trim() === "") {
            setSearchResultWord([]);
            return;
        }

        // Fetch data from API based on searchTerm
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(
                    "Data fetched with searchterm:",
                    searchTerm,
                    "data:",
                    data
                );
                setSearchResultWord(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setErrorMessage("Error fetching data.");
            });
    }, [searchTerm]);

    const handleSearch = (searchTerm) => {
        if (!searchTerm || searchTerm.trim() === "") {
            setErrorMessage("No results found.");
            setSearchResultWord([]);
            return;
        }
        setErrorMessage("");
        setSearchTerm(searchTerm);
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
