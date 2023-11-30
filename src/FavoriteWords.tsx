import React from "react";
import "./FavoriteWords.css";

function FavoriteWords({ favoriteWords, onRemoveFavoriteWord, onSearch }) {
    return (
        // Favorite words list
        <div className="favoritsContainer">
            <div className="favoritsListDiv">
                <h3>Favorite words:</h3>
                <ul>
                    {/* Loop out favorite words. */}
                    {favoriteWords.length > 0 &&
                        favoriteWords
                            .map((word, index) => (
                                <li onClick={() => onSearch(word)} key={index}>
                                    <p>{word}</p>
                                    <button
                                        onClick={() =>
                                            onRemoveFavoriteWord(word)
                                        }
                                    >
                                        💩
                                    </button>
                                </li>
                            ))
                            .reverse()}
                </ul>
            </div>
        </div>
    );
}

export default FavoriteWords;
