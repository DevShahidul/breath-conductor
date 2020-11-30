import React from 'react'
import Radio from './Radio';

const PopUp = (props) => {
    const {title, selectOptions, optionName, name, handleChange} = props;
    const stopAction = (e) => {
        e.stopPropagation();
    }
    return (
        <div className="pop-up" onClick={stopAction}>
            <h4>{title}</h4>
            <ul>
                {selectOptions.map((option, index) => (
                    <li key={index}>
                        <Radio className={optionName === option.name ? 'box checked' : 'box'} name={name} value={option.name} checked={optionName === option.name} onChange={handleChange} lableText={option.name} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PopUp;