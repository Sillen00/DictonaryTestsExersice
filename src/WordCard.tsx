import React from "react";
import "./WordCard.css";

function WordCard({ searchResultWord, onFavoriteWord }) {
    return (
        <div className="container">
            <div className="wordCard">
                {searchResultWord.length > 0 && (
                    <div key={searchResultWord[0].word}>
                        <h1>{searchResultWord[0].word}</h1>

                        {/* Favorite button */}
                        <button
                            onClick={() =>
                                onFavoriteWord(searchResultWord[0].word)
                            }
                        >
                            🧡
                        </button>

                        <br />
                        <hr />
                        <br />

                        {/* Meanings*/}
                        {searchResultWord[0].meanings.length > 0 && (
                            <>
                                {/* Part of speech & definition */}
                                <div>
                                    <h5>
                                        {
                                            searchResultWord[0].meanings[0]
                                                .partOfSpeech
                                        }
                                    </h5>
                                    <p>
                                        Definition:{" "}
                                        {
                                            searchResultWord[0].meanings[0]
                                                .definitions[0].definition
                                        }
                                    </p>
                                    <br />
                                    <hr />
                                    <br />
                                </div>

                                {/* Word using example */}
                                <div>
                                    {searchResultWord.length > 0 &&
                                        searchResultWord[0].meanings[0]
                                            .definitions[0].example && (
                                            <>
                                                <p>
                                                    Example:{" "}
                                                    {
                                                        searchResultWord[0]
                                                            .meanings[0]
                                                            .definitions[0]
                                                            .example
                                                    }
                                                </p>
                                                <br />
                                                <hr />
                                                <br />
                                            </>
                                        )}
                                </div>

                                {/* Synonymer */}
                                <div>
                                    {searchResultWord.length > 0 &&
                                        searchResultWord[0].meanings[0].synonyms
                                            .length > 0 && (
                                            <>
                                                <p>
                                                    Synonyms:{" "}
                                                    {searchResultWord[0].meanings[0].synonyms.map(
                                                        (synonym, index) => (
                                                            <span key={index}>
                                                                {synonym}{" "}
                                                            </span>
                                                        )
                                                    )}
                                                </p>
                                                <br />
                                                <hr />
                                                <br />
                                            </>
                                        )}
                                </div>

                                {/* Motsats ord */}
                                <div>
                                    {searchResultWord.length > 0 &&
                                        searchResultWord[0].meanings[0].antonyms
                                            .length > 0 && (
                                            <>
                                                <p>
                                                    Antonyms:{" "}
                                                    {searchResultWord[0].meanings[0].synonyms.map(
                                                        (synonym, index) => (
                                                            <span key={index}>
                                                                {synonym}{" "}
                                                            </span>
                                                        )
                                                    )}
                                                </p>
                                                <br />
                                                <hr />
                                                <br />
                                            </>
                                        )}
                                </div>
                            </>
                        )}

                        {/* Phonetics */}
                        {searchResultWord.length > 0 &&
                            searchResultWord[0].phonetics.length > 0 && (
                                <div>
                                    <p>
                                        Phonetic:{" "}
                                        {searchResultWord[0].phonetics[0].text}
                                    </p>

                                    {/* Audio */}
                                    <audio controls>
                                        <source
                                            src={
                                                searchResultWord[0].phonetics[0]
                                                    .audio
                                            }
                                            type="audio/mpeg"
                                        />
                                        Your browser does not support the audio
                                        element.
                                    </audio>
                                </div>
                            )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default WordCard;
