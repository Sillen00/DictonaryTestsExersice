import React from "react";
import "./WordCard.css";

function WordCard({ searchResultWord, onFavoriteWord, favoriteWords }) {
    return (
        <div className="container">
            <div className="wordCard">
                {searchResultWord.length > 0 && (
                    <>
                        {searchResultWord.map((wordObj, index) => (
                            <div key={index}>
                                <h1>{wordObj.word}</h1>

                                {/* Favorite button */}
                                <button
                                    className="favoriteWordButton"
                                    data-testid={`favoriteWordButton`}
                                    onClick={() => onFavoriteWord(wordObj.word)}
                                >
                                    {favoriteWords.includes(wordObj.word)
                                        ? "🧡"
                                        : "🩶"}
                                </button>

                                <br />
                                <hr />
                                <br />

                                {/* Meanings */}
                                {wordObj.meanings.length > 0 && (
                                    <>
                                        {/* Part of speech & definition */}
                                        <div>
                                            <p>
                                                Part of speech:{" "}
                                                {
                                                    wordObj.meanings[0]
                                                        .partOfSpeech
                                                }
                                            </p>

                                            <br />
                                            <hr />
                                            <br />

                                            <p>
                                                Definition:{" "}
                                                {
                                                    wordObj.meanings[0]
                                                        .definitions[0]
                                                        .definition
                                                }
                                            </p>
                                            <br />
                                            <hr />
                                            <br />
                                        </div>

                                        {/* Word using example */}
                                        <div>
                                            {wordObj.meanings[0].definitions[0]
                                                .example && (
                                                <>
                                                    <p>
                                                        Example:{" "}
                                                        {
                                                            wordObj.meanings[0]
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

                                        {/* Synonyms */}
                                        <div>
                                            {wordObj.meanings[0].synonyms
                                                .length > 0 && (
                                                <>
                                                    <p>
                                                        Synonyms:{" "}
                                                        {wordObj.meanings[0].synonyms.map(
                                                            (
                                                                synonym,
                                                                index
                                                            ) => (
                                                                <span
                                                                    key={index}
                                                                >
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

                                        {/* Antonyms */}
                                        <div>
                                            {wordObj.meanings[0].antonyms
                                                .length > 0 && (
                                                <>
                                                    <p>
                                                        Antonyms:{" "}
                                                        {wordObj.meanings[0].antonyms.map(
                                                            (
                                                                antonym,
                                                                index
                                                            ) => (
                                                                <span
                                                                    key={index}
                                                                >
                                                                    {antonym}{" "}
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
                                {wordObj.phonetics.length > 0 && (
                                    <div>
                                        <p>
                                            Phonetic:{" "}
                                            {wordObj.phonetics[0].text}
                                        </p>

                                        {/* Audio */}
                                        <audio controls>
                                            <source
                                                role="audio"
                                                src={wordObj.phonetics[0].audio}
                                                type="audio/mpeg"
                                            />
                                            Your browser does not support the
                                            audio element.
                                        </audio>
                                    </div>
                                )}
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}

export default WordCard;
