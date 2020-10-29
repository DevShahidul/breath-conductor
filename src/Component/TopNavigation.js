import React, {Component, Fragment} from 'react';
import Logo from "../Assets/Image/Logo1.svg";
import {Link} from "react-router-dom";


class TopNavigation extends Component {
    render() {
        return (
            <Fragment>
                <div className="nagivation">
                    <div className="nav-container">
                        <Link to="login"><img src={Logo}/></Link>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default TopNavigation;