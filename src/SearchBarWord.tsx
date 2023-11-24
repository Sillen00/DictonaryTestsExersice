import React, { useState } from "react";
import "./SearchBarWord.css";

function SearchBarWord({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
    };

    const handleSearchClick = () => {
        onSearch(searchTerm);
    };

    return (
        <div className="inputContainer">
            <div className="wordSearchFieldDiv">
                <input
                    type="text"
                    placeholder="Search Words"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <button onClick={handleSearchClick}>Search</button>
            </div>
        </div>
    );
}

export default SearchBarWord;
