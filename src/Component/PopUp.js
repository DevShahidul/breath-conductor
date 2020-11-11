import React from 'react'
import Radio from './Radio';

const PopUp = (props) => {
    const {title, selectOptions, optionName, name, handleChange, handlePopUpAction} = props;
    return (
        <div className="pop-up">
            <h4>{title}</h4>
            <ul>
                {selectOptions.map((option, index) => (
                    <li key={index}>
                        <Radio className={optionName === option.name ? 'box checked' : 'box'} name={name} value={option.name} checked={optionName === option.name} onChange={handleChange} lableText={option.name} />
                    </li>
                ))}
            </ul>
            <div className="button-row">
                <button onClick={() => handlePopUpAction('Cancel')}>Cancel</button>
                <button onClick={() => handlePopUpAction('Done')}>Done</button>
            </div>
        </div>
    )
}

export default PopUp;