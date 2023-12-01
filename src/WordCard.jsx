import React from "react";
import "./WordCard.css";

function WordCard({ searchResultWord, onFavoriteWord, favoriteWords }) {
    return (
        <div className="container">
            {searchResultWord.length > 0 && (
                <>
                    <div className="wordCard">
                        <div key={searchResultWord[0].word}>
                            <h1>{searchResultWord[0].word}</h1>

                            {/* Favorite button */}
                            <button
                                className="favoriteWordButton"
                                data-testid="favoriteWordButton"
                                onClick={() =>
                                    onFavoriteWord(searchResultWord[0].word)
                                }
                            >
                                {favoriteWords.includes(
                                    searchResultWord[0].word
                                )
                                    ? "🧡"
                                    : "🩶"}
                            </button>

                            <br />
                            <hr />
                            <br />

                            {/* Meanings*/}
                            {searchResultWord[0].meanings.length > 0 && (
                                <>
                                    {/* Part of speech & definition */}
                                    <div>
                                        <p>
                                            Part of speech:{" "}
                                            {
                                                searchResultWord[0].meanings[0]
                                                    .partOfSpeech
                                            }
                                        </p>

                                        <br />
                                        <hr />
                                        <br />

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
                                            searchResultWord[0].meanings[0]
                                                .synonyms.length > 0 && (
                                                <>
                                                    <p>
                                                        Synonyms:{" "}
                                                        {searchResultWord[0].meanings[0].synonyms.map(
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

                                    {/* Motsats ord */}
                                    <div>
                                        {searchResultWord.length > 0 &&
                                            searchResultWord[0].meanings[0]
                                                .antonyms.length > 0 && (
                                                <>
                                                    <p>
                                                        Antonyms:{" "}
                                                        {searchResultWord[0].meanings[0].antonyms.map(
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
                            {searchResultWord.length > 0 &&
                                searchResultWord[0].phonetics.length > 0 && (
                                    <div>
                                        <p>
                                            Phonetic:{" "}
                                            {
                                                searchResultWord[0].phonetics[0]
                                                    .text
                                            }
                                        </p>

                                        {/* Audio */}
                                        <audio controls>
                                            <source
                                                role="audio"
                                                src={
                                                    searchResultWord[0]
                                                        .phonetics[0].audio
                                                }
                                                type="audio/mpeg"
                                            />
                                            Your browser does not support the
                                            audio element.
                                        </audio>
                                    </div>
                                )}
                        </div>
                    </div>

                    {searchResultWord[0].meanings.length > 0 &&
                        searchResultWord[0].meanings
                            .slice(1)
                            .map((meaning, meaningIndex) => (
                                <div className="wordCard" key={meaningIndex}>
                                    <div key={searchResultWord[0].word}>
                                        <h1>{searchResultWord[0].word}</h1>

                                        {/* Favorite button */}
                                        <button
                                            className="favoriteWordButton"
                                            data-testid="favoriteWordButton"
                                            onClick={() =>
                                                onFavoriteWord(
                                                    searchResultWord[0].word
                                                )
                                            }
                                        >
                                            {favoriteWords.includes(
                                                searchResultWord[0].word
                                            )
                                                ? "🧡"
                                                : "🩶"}
                                        </button>

                                        <br />
                                        <hr />
                                        <br />

                                        <div>
                                            {/* Part of speech & definition */}
                                            <div>
                                                <p>
                                                    Part of speech:{" "}
                                                    {meaning.partOfSpeech}
                                                </p>
                                                <br />
                                                <hr />
                                                <br />

                                                <p>
                                                    Definition:{" "}
                                                    {
                                                        meaning.definitions[0]
                                                            .definition
                                                    }
                                                </p>
                                                <br />
                                                <hr />
                                                <br />
                                            </div>

                                            {/* Word using example */}
                                            <div>
                                                {meaning.definitions[0]
                                                    .example && (
                                                    <>
                                                        <p>
                                                            Example:{" "}
                                                            {
                                                                meaning
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
                                                {meaning.synonyms.length >
                                                    0 && (
                                                    <>
                                                        <p>
                                                            Synonyms:{" "}
                                                            {meaning.synonyms.map(
                                                                (
                                                                    synonym,
                                                                    index
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {
                                                                            synonym
                                                                        }{" "}
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
                                                {meaning.antonyms.length >
                                                    0 && (
                                                    <>
                                                        <p>
                                                            Antonyms:{" "}
                                                            {meaning.antonyms.map(
                                                                (
                                                                    antonym,
                                                                    index
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {
                                                                            antonym
                                                                        }{" "}
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
                                        </div>
                                    </div>
                                </div>
                            ))}
                </>
            )}
        </div>
    );
}

export default WordCard;
