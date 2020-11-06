import React, {useState, useContext} from 'react';
import {Link, NavLink, useLocation} from "react-router-dom";
import { BreathContext} from '../context';
import Logo from "../Assets/Image/logo2.svg";
import { HomeIcon, LibraryIcon, SettingIcon }  from "./icons";
import Notification from "../Assets/Image/Notification.svg";
import UserPlaceholder from "../Assets/Image/user_placeholder.png";
import DownArrow from "../Assets/Image/down-arrow.svg";

const Navigation = () => {

    // constructor(){
    //     super();
    //     this.state = {
            
    //     }
    // }   

    const geSingleHistoryData = localStorage.getItem('singleHistoryData') ? localStorage.getItem('singleHistoryData') : 1;
    const geSingleFavoriteData = localStorage.getItem('singleHistoryData') ? localStorage.getItem('singleHistoryData') : 1;
    const historyId = JSON.parse(geSingleHistoryData).id;
    const FavoriteId = JSON.parse(geSingleFavoriteData).id;

    const [expanded, setExpanded] = useState(false)
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
                isActive: ['/library', `/library/${FavoriteId}`, `/library/history/${historyId}`, '/library/history']
            },
            settings:{
                text: 'settings',
                path: '/setting',
                icon: <SettingIcon />,
                isActive: ['/setting']
            }
        },
        redirect: false,
    })
    
    const { logOut } = useContext(BreathContext);
    const {navItems} = state;

    const handleClick = () => {
        setExpanded(!expanded)
        console.log("I'm clicked");
        // setState({
        //     expanded: !expanded
        // })
    }

    // componentDidMount(){
    //     if(sessionStorage.getItem('token')){
    //         let userToken = sessionStorage.getItem('token')
    //         console.log('call user feed ', userToken)
    //     }else{
    //         this.setState({redirect: true})
    //     }
    // }

    const { pathname } = useLocation();
        
    // if(this.state.redirect){
    //     return (<Redirect to="/login" />)
    // }

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