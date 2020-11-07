import React from 'react'

const FormField = (props) => {
    const {icon, type, placeholder, name, required, onChange, value, label, reactIcon} = props;
    const ReactIcon = reactIcon;
    const getIcon = icon ? <img src={icon} alt={`${name} icon`}/> : '' || reactIcon ?  <ReactIcon /> : '' ;
    return (
        <label>
            {label ? <p>{label}</p> : ''}
            <div className="form-field">
                {getIcon ? (
                    <div className="form-icon">
                        {getIcon}
                    </div>
                ) : ''}
                <input type={type} required={required} placeholder={placeholder} name={name} onChange={onChange} value={value}/>
            </div>
        </label>
    )
}

export default FormField;
