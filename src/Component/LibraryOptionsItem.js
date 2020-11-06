import React from 'react'

const LibraryOptionsItem = (props) => {
    return (
        <div className="col-4">
            <div className="img-box">
                <img src={props.icon} alt={`${props.title} icon`} />
                <p>{props.title}</p>
            </div>
            <h4>{props.text}</h4>
        </div>
    )
}

export default LibraryOptionsItem;
