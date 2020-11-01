import React from 'react'

export const Button = (props) => {
    const icon = props.imgIcon ? <img src={props.imgIcon} alt={`${props.text} icon`} /> : <props.icon />
    return (
        <>
            <button className={"btn " +props.type}>
                {icon ? icon : null}
              {props.text}
            </button>  
        </>
    )
}
