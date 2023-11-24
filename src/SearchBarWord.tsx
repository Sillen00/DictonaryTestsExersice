import React from "react";
import "./SearchBarWord.css";

function SearchBarWord() {
    return (
        <div className="inputContainer">
            <input
                className="wordSearchField"
                type="text"
                placeholder="Search Word's"
            />
        </div>
    );
}

export default SearchBarWord;
