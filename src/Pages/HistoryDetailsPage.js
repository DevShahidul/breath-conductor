import React, {Component, Fragment} from 'react';
import {BreathContext} from '../context';
import {Link} from "react-router-dom";
import favoriteIcon from "../Assets/Image/like.svg";
import BackIcon from "../Assets/Image/back.svg";
import GoalIcon from "../Assets/Image/Goal.svg";
import DuplicateIcon from "../Assets/Image/New-Duplicate-icon.svg";
import TimeIcon from "../Assets/Image/Time.svg";
import VoiceIcon from "../Assets/Image/Voice.svg";
import ThemeIcon from "../Assets/Image/Theme.svg";
import { Navigation, IconicButton, LibraryOptionsItem } from '../Component';
import { RiShareLine, RiDeleteBinLine } from "react-icons/ri";

class HistoryDetailsPage extends Component {
    static contextType = BreathContext;
    render() {
        const { handleBacktoParent, loading, deletHistoryData, deletFavoriteData } = this.context;

        const dataFromLocalstorage = localStorage.getItem('singleHistoryData') ? JSON.parse(localStorage.getItem('singleHistoryData')) : {};

        const { title, date, goal, theme, voice, duration_minutes, handleAddFavorite} = dataFromLocalstorage;


        return (
            <Fragment>
                <Navigation/>
                { loading ? "Loading..." : (
                    <div className="container library-single">
                        <div className="library-inner">
                            <div className="library-top">
                                <ul className="tabs">
                                    <li className="nav-item">
                                        <Link onClick={deletHistoryData} to="/library">Favorites</Link>
                                    </li>
                                    <li className="nav-item active">
                                        <Link onClick={deletFavoriteData} to="/library/history">History</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="library-content library-inner">
                                <div className="details-top">
                                    <div className="back-section">
                                        <button onClick={handleBacktoParent}><img src={BackIcon} alt="Back icon"/></button>
                                    </div>
                                    <div className="section-title">
                                        <h2>{title}</h2>
                                        <p>{date}</p>
                                    </div>
                                    <div className="faborite-button">
                                        <button onClick={handleAddFavorite}><img src={favoriteIcon} alt="Favorite icon"/></button>
                                    </div>
                                </div>
                                <div className="details-items">
                                    <div className="row"> 
                                        {goal ? <LibraryOptionsItem icon={GoalIcon} title="Goal" text={goal} /> : ''}
                                        {duration_minutes ? <LibraryOptionsItem icon={TimeIcon} title="Time" text={duration_minutes} /> : ''}
                                        {voice ? <LibraryOptionsItem icon={VoiceIcon} title="Voice" text={voice} /> : ''}
                                        {theme ? <LibraryOptionsItem icon={ThemeIcon} title="Theme" text={theme} /> : ''}
                                    </div>
                                </div>
                                <div className="details-action">
                                    <IconicButton type="primary" text="New Duplicate" imgIcon={DuplicateIcon}/>
                                    <IconicButton type="primary" text="Share" icon={RiShareLine}/>
                                    <IconicButton type="danger" text="Remove from Favorites" icon={RiDeleteBinLine}/>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Fragment>
        );
    }
}

export default HistoryDetailsPage;