import React, { useEffect, useState } from "react";
import SearchBarWord from "./SearchBarWord";
import WordCard from "./WordCard";

const WordContainer = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [wordObj, setWordObj] = useState();

    useEffect(() => {
        // Fetch data from API based on searchTerm
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`)
            // Update the words state
            .then((response) => response.json())
            .then((data) => setWordObj(data || []))
            .catch((error) => console.error("Error fetching data:", error));
    }, [searchTerm]);

    console.log(wordObj);
    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
    };

    return (
        <div>
            <SearchBarWord onSearch={handleSearch} />
            <WordCard wordObj={wordObj} />
        </div>
    );
};

export default WordContainer;
