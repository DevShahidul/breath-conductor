import React, {useState, useContext} from 'react';
import {Link, NavLink, useLocation, Redirect} from "react-router-dom";
import { BreathContext} from '../context';
import Logo from "../Assets/Image/logo2.svg";
import { HomeIcon, LibraryIcon, SettingIcon }  from "./icons";
import Notification from "../Assets/Image/Notification.svg";
import UserPlaceholder from "../Assets/Image/user_placeholder.png";
import DownArrow from "../Assets/Image/down-arrow.svg";

const Navigation = () => {
    const {singleHistory, singleFavorite, setDefautStep} = useContext(BreathContext);

    // const geSingleHistoryData = localStorage.getItem('singleHistoryData') ? localStorage.getItem('singleHistoryData') : 1;
    // const geSingleFavoriteData = localStorage.getItem('singleFavoriteData') ? localStorage.getItem('singleFavoriteData') : 1;

    const historyId = singleHistory.id;
    const FavoriteId = singleFavorite.id;

    const [expanded, setExpanded] = useState(false);
    
    const [state, setState] = useState({
        navItems: {
            home:{
                text: 'home',
                path: '/',
                icon: <HomeIcon />,
                isActive: ['/']
            },
            library:{
                text: 'library',
                path: '/library',
                icon: <LibraryIcon />,
                isActive: ['/library', `/library/${FavoriteId}`, '/history', `/history/${historyId}`]
            },
            settings:{
                text: 'settings',
                path: '/setting',
                icon: <SettingIcon />,
                isActive: ['/setting']
            }
        },
        redirect: false,
    });

    const {navItems, redirect} = state;

    const logOut = () => {
        let token = localStorage.getItem('token');
        if(token){
            sessionStorage.clear();
            localStorage.clear();
            setState({
                redirect: true
            })
        }
    }

    const handleClick = () => {
        setExpanded(!expanded)
    }

    const { pathname } = useLocation();
        
    if(redirect){
        return (<Redirect to="/login" />)
    }

    return (
        <div className="nav-section">
            <Link className="main-logo" to="/"><img src={Logo} alt="logo"/></Link>
            <nav>
                <ul>
                    {Object.keys(navItems).map((keyName, index) => {
                        const path = navItems[keyName].path;
                        const icon = navItems[keyName].icon;
                        const navText = navItems[keyName].text;
                        const activeLinks = navItems[keyName].isActive;
                        return (
                            <li key={index}>
                                <NavLink 
                                    onClick={setDefautStep}
                                    activeClassName="active"
                                    exact 
                                    to={path}
                                    isActive = {() => activeLinks.includes(pathname)}
                                    >
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
            <div className="user" onClick={handleClick}>
                {/* <Link to="setting"></Link> */}
                <img className="userPlaceholder" src={UserPlaceholder} alt="User icon"/>
                <p>Elina Baserinova</p>
                <img className="downArrow" src={DownArrow} alt="Down arrow"/>
            </div>
            <ul className={expanded ? 'userDropdown expanded' : 'userDropdown'} >
                <li><Link to="setting">Setting profile</Link></li>
                <li><button onClick={logOut}>Log out</button></li>
            </ul>
        </div>
    );
}

export default Navigation;