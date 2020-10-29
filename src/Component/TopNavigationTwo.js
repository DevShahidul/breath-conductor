import React, {Component, Fragment} from 'react';
import Logo from "../Assets/Image/logo2.svg";
import HomeOne from "../Assets/Image/Home_1.svg";
import HomeTwo from "../Assets/Image/Home_2.svg";
import LibraryOne from "../Assets/Image/Library_1.svg";
import LibraryTwo from "../Assets/Image/Library_2.svg";
import SettingOne from "../Assets/Image/setting_1.svg";
import SettingTwo from "../Assets/Image/setting_2.svg";
import Notification from "../Assets/Image/Notification.svg";
import UserPlaceholder from "../Assets/Image/user_placeholder.png";
import DownArrow from "../Assets/Image/down-arrow.svg";
import MenuIcon from "../Assets/Image/menu.svg";
import {Link, NavLink} from "react-router-dom";


class TopNavigationTwo extends Component {

    constructor(){
        super();
        this.state = {
            home: [HomeTwo],
            library: [LibraryOne],
            setting: [SettingTwo]
        }
    }


    toggleMenu(){
        const nav = document.querySelector('.nagivationTwo');

        if (nav.style.minHeight == "0px" ) {
            nav.style.minHeight = "300px";
        }
        else {nav.style.minHeight = "0px";}
    }


    render() {
        return (
            <Fragment>
                <div className="nagivationTwo">
                    <div className="nav-containerTwo">
                        <Link to="login"><img src={Logo}/></Link>
                        <nav>
                            <ul>
                                <NavLink activeClassName="active" to="home">
                                    <li>
                                    <img src={this.state.home}/>
                                    <p>Home</p>
                                    </li>
                                </NavLink>

                                <NavLink activeClassName="active" to="library">
                                    <li>
                                    <img src={this.state.library}/>
                                    <p>Library</p>
                                    </li>
                                </NavLink>

                                <NavLink activeClassName="active" to="setting">
                                    <li>
                                    <img src={this.state.setting}/>
                                    <p>Settings</p>
                                    </li>
                                </NavLink>
                            </ul>
                        </nav>
                            <img className="notification" src={Notification}/>
                            <div className="user">
                                <Link to="setting"><img className="userPlaceholder" src={UserPlaceholder}/></Link>
                                <p>Elina Baserinova</p>
                                <img className="downArrow" src={DownArrow}/>
                            </div>
                        <div className="menu-section">
                            <img onClick={this.toggleMenu} src={MenuIcon}/>
                        </div>

                    </div>
                </div>
            </Fragment>

        );
    }
}

export default TopNavigationTwo;