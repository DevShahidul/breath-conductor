import React from 'react'

const LibraryLinks = (props) => {
    return (
        <div className="library-top">
            <ul className="tabs">
                {props.children}
            </ul>
        </div>
    )
}

export default LibraryLinks;
