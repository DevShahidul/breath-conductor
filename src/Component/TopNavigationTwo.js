import React, {Component, Fragment} from 'react';
import Logo from "../Assets/Image/logo2.svg";
import HomeTwo from "../Assets/Image/Home_2.svg";
import LibraryOne from "../Assets/Image/Library_1.svg";
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
            setting: [SettingTwo],
            expanded: false
        }
    }

    toggleMenu(){
        const nav = document.querySelector('.nagivationTwo');

        if (nav.style.minHeight === "0px" ) {
            nav.style.minHeight = "300px";
        }
        else {nav.style.minHeight = "0px";}
    }

    handleClick = () => {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    render() {
        return (
            <Fragment>
                <div className="nagivationTwo">
                    <div className="nav-containerTwo">
                        <Link to="login"><img src={Logo} alt="logo"/></Link>
                        <nav>
                            <ul>
                                <NavLink activeClassName="active" to="home">
                                    <li>
                                    <img src={this.state.home} alt="Home icon"/>
                                    <p>Home</p>
                                    </li>
                                </NavLink>

                                <NavLink activeClassName="active" to="library">
                                    <li>
                                    <img src={this.state.library} alt="Library icon"/>
                                    <p>Library</p>
                                    </li>
                                </NavLink>

                                <NavLink activeClassName="active" to="setting">
                                    <li>
                                    <img src={this.state.setting} alt="Setting icon"/>
                                    <p>Settings</p>
                                    </li>
                                </NavLink>
                            </ul>
                        </nav>
                            <img className="notification" src={Notification} alt="Notification icon"/>
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
                        <div className="menu-section">
                            <img onClick={this.toggleMenu} src={MenuIcon} alt="Toggle menu icon"/>
                        </div>

                    </div>
                </div>
            </Fragment>

        );
    }
}

export default TopNavigationTwo;