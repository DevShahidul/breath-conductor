import React, {useState, useContext} from 'react';
import {Link, NavLink, useLocation, Redirect} from "react-router-dom";
import { BreathContext} from '../context';
import Logo from "../Assets/Image/logo2.svg";
import { HomeIcon, LibraryIcon, SettingIcon }  from "./icons";
import UserPlaceholder from "../Assets/Image/user_placeholder.png";
import DownArrow from "../Assets/Image/down-arrow.svg";

const Navigation = () => {
    const {singleHistory, singleFavorite, setDefaultStep, handleProfileDropdown, expanded} = useContext(BreathContext);

    const historyId = singleHistory.id;
    const FavoriteId = singleFavorite.id;
    
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

    let userName = localStorage.getItem('username');

    // const handleClick = () => {
    //     setExpanded(!expanded)
    // }

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
                                    onClick={setDefaultStep}
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
            <div className="user" onClick={handleProfileDropdown}>
                {/* <Link to="setting"></Link> */}
                <img className="userPlaceholder" src={UserPlaceholder} alt="User icon"/>
                <p>{userName}</p>
                <img className={expanded ? "downArrow expanded" : "downArrow" } src={DownArrow} alt="Down arrow"/>
            </div>
            <ul className={expanded ? 'userDropdown expanded' : 'userDropdown'} >
                <li><Link to="setting">Setting profile</Link></li>
                <li><button onClick={logOut}>Log out</button></li>
            </ul>
        </div>
    );
}

export default Navigation;