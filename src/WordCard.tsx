import React from "react";
import "./WordCard.css";

function WordCard({ searchResultWord }) {
    return (
        <div className="container">
            <div className="wordCard">
                {searchResultWord.map((wordObj) => (
                    <div key={wordObj.word}>
                        <h1>{wordObj.word}</h1>

                        <br />
                        <hr />
                        <br />

                        {/* Meanings */}
                        {wordObj.meanings.map((meaning, index) => (
                            <div key={index}>
                                <h5>{meaning.partOfSpeech}</h5>
                                <p>
                                    Definition:{" "}
                                    {meaning.definitions[0].definition}
                                </p>
                            </div>
                        ))}

                        <br />
                        <hr />
                        <br />

                        {/* Phonetics */}
                        {wordObj.phonetics.map((phonetic, index) => (
                            <div key={index}>
                                <p>Phonetic: {phonetic.text}</p>

                                {/* Audio */}
                                <audio controls>
                                    <source
                                        src={phonetic.audio}
                                        type="audio/mpeg"
                                    />
                                    Your browser does not support the audio
                                    element.
                                </audio>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WordCard;
