import React from 'react'
import BackIcon from "../Assets/Image/back.svg";
import favoriteIcon from "../Assets/Image/like.svg";

const LibraryDetailTop = (props) => {
    return (
        <div className="details-top">
            <div className="back-section">
                <button onClick={props.onClick}><img src={BackIcon} alt="Back icon"/></button>
            </div>
            <div className="section-title">
                <h2>{props.title}</h2>
                {props.date ? <p>{props.date}</p> : ''}
            </div>
            {props.onAddFavorite ? (
                <div className="faborite-button">
                    <button onClick={ props.onAddFavorite }><img src={favoriteIcon} alt="Favorite icon"/></button>
                </div>
            ) : ''}
        </div>
    )
}

export default LibraryDetailTop;