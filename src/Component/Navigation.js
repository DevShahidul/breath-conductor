import React, {Component} from 'react';
import Logo from "../Assets/Image/logo2.svg";
import { HomeIcon, LibraryIcon, SettingIcon }  from "./icons";
import Notification from "../Assets/Image/Notification.svg";
import UserPlaceholder from "../Assets/Image/user_placeholder.png";
import DownArrow from "../Assets/Image/down-arrow.svg";
import MenuIcon from "../Assets/Image/menu.svg";
import {Link, NavLink} from "react-router-dom";

class Navigation extends Component {

    constructor(){
        super();
        this.state = {
            navItems: {
                home:{
                    text: 'home',
                    path: '/',
                    icon: <HomeIcon />
                },
                library:{
                    text: 'library',
                    path: '/library',
                    icon: <LibraryIcon />
                },
                settings:{
                    text: 'settings',
                    path: '/setting',
                    icon: <SettingIcon />
                }
            },
            expanded: false
        }
    }

    handleClick = () => {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    render() {
        const {navItems} = this.state;
        return (
            <div className="nav-section">
                <Link to="/"><img src={Logo} alt="logo"/></Link>
                <nav>
                    <ul>
                        {Object.keys(navItems).map((keyName, index) => {
                            const path = navItems[keyName].path;
                            const icon = navItems[keyName].icon;
                            const navText = navItems[keyName].text;
                            return (
                                //console.log(navItem[keyName].path)
                                <li key={index}>
                                    <NavLink 
                                        activeClassName="active" exact to={path}>
                                        {icon}
                                        <p>{navText}</p>
                                    </NavLink>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
                <button className="notification-btn">
                    <img className="notification" src={Notification} alt="Notification icon"/>
                </button>
                <div className="user" onClick={this.handleClick}>
                    {/* <Link to="setting"></Link> */}
                    <img className="userPlaceholder" src={UserPlaceholder} alt="User icon"/>
                    <p>Elina Baserinova</p>
                    <img className="downArrow" src={DownArrow} alt="Down arrow"/>
                </div>
                <ul className={this.state.expanded ? 'userDropdown expanded' : 'userDropdown'} >
                    <li><Link to="setting">Setting profile</Link></li>
                    <li><button onClick={this.props.onLogOut}>Log out</button></li>
                </ul>
                <div className="navToggler">
                    <img onClick={this.toggleMenu} src={MenuIcon} alt="Toggle menu icon"/>
                </div>
            </div>
        );
    }
}

export default Navigation;