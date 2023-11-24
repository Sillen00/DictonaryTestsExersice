import React from "react";
import "./WordCard.css";

function WordCard({ searchResultWord }) {
    const placeholder =
        searchResultWord.length === 0 ? "Search for a word" : "";

    return (
        <div className="container">
            <div className="wordCard">
                <h1>{placeholder}</h1>

                {searchResultWord.map((wordObj) => (
                    <div key={wordObj.word}>
                        <h1>{wordObj.word}</h1>

                        {/* Meanings */}
                        {wordObj.meanings.map((meaning, index) => (
                            <div key={index}>
                                <h5>{meaning.partOfSpeech}</h5>
                                <p>
                                    Definition:{" "}
                                    {meaning.definitions[0].definition}
                                </p>
                                {/* Additional information about the meaning */}
                            </div>
                        ))}

                        {/* Phonetics */}
                        {wordObj.phonetics.map((phonetic, index) => (
                            <div key={index}>
                                <p>Phonetic: {phonetic.text}</p>
                                {/* Additional information about the phonetic */}
                            </div>
                        ))}

                        {/* Other details like sourceUrls */}
                        {/* ... */}
                    </div>
                ))}

                {/* {sound && <button>{`Sound ${sound}🔊`}</button>} */}
            </div>
        </div>
    );
}

export default WordCard;
