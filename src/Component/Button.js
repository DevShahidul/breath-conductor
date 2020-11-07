import React from 'react'
import PropTypes from 'prop-types';

const Button = (props) => {
    const {type, text, onClick} = props;
    return (
        <>
          <button onClick={onClick} className={"btn " + type}>{text}</button>
        </>
    )
}

export default Button;


Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  click: PropTypes.func
};

Button.defaultProps = {
    text: "Add button text",
    type: "primary",
    onClick: function(e){
        e.preventDefault();
        console.log("I'm clicked from default props");
    }
}
