import React, { useState } from "react";
import "./SearchBarWord.css";

function SearchBarWord({ onSearch, errorMessage }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
    };

    const handleSearchClick = () => {
        onSearch(searchTerm);
    };

    return (
        <>
            <div className="inputContainer">
                <div className="wordSearchFieldDiv">
                    <form action="#" onSubmit={handleSearchClick}>
                        <input
                            type="text"
                            placeholder="Search Words"
                            value={searchTerm}
                            onChange={handleInputChange}
                        />
                        <button type="submit">Search</button>
                    </form>
                </div>
            </div>
            {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        </>
    );
}

export default SearchBarWord;
