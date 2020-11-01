import React from 'react'
import PropTypes from 'prop-types';

export const Button = (props) => {
    const {type, text, click} = props;
    return (
        <>
          <button onClick={click} className={"btn " + type}>{text}</button>
        </>
    )
}


Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  click: PropTypes.func
};

Button.defaultProps = {
    text: "Add button text",
    type: "primary",
    click: function(e){
        e.preventDefault();
        console.log("I'm clicked");
    }
}
