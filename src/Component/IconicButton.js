import React from 'react'
import PropTypes from 'prop-types';

export const IconicButton = (props) => {
    const {imgIcon, text, type, click} = props;
    const getIcon = imgIcon ? <img src={imgIcon} alt={`${text} icon`} /> : <props.icon />
    return (
        <>
            <button onClick={click} className={"btn " +type}>
                {getIcon ? getIcon : null}
              {text}
            </button>  
        </>
    )
}


IconicButton.propTypes = {
  imgIcon: PropTypes.object,
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  click: PropTypes.func
};

IconicButton.defaultProps = {
    text: "Add button text",
    type: "primary",
    click: function(e){
        e.preventDefault();
        console.log("I'm clicked");
    }
}
