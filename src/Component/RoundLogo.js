import React from 'react';
import Logo from "../Assets/Image/Logo1.svg";
import {Link} from "react-router-dom";


const RoundLogo = () => {
    return (
        <div className="logo-small">
            <Link to="login"><img src={Logo} alt="Logo"/></Link>
        </div>
    );
}


export default RoundLogo;