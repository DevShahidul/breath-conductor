import React from 'react'

const Radio = (props) => {
    return (
        <label className="radio-item">
            <input type="radio" name={props.name} value={props.value} checked={props.checked} onChange={props.onChange} />
            <div className={`box ${props.className}`}></div>
            <p>{props.lableText}</p>
        </label>
    )
}

export default Radio;