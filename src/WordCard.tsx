import React from "react";
import "./WordCard.css";

function WordCard() {
    return (
        <div className="container">
            <div className="wordCard">
                <h5 className="wordCard-title">Word</h5>
                <p className="card-text">Definition of the word</p>

                <button>Sound🔊</button>
            </div>
        </div>
    );
}

export default WordCard;
