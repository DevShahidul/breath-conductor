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
                        <Radio className={optionName === option ? 'box checked' : 'box'} name={name} value={option} checked={optionName === option} onChange={handleChange} lableText={option} />
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