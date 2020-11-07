import React, {Fragment, useContext} from 'react';
import {BreathContext} from '../context';
import {Link, useHistory} from "react-router-dom";
import GoalIcon from "../Assets/Image/Goal.svg";
import DuplicateIcon from "../Assets/Image/New-Duplicate-icon.svg";
import TimeIcon from "../Assets/Image/Time.svg";
import VoiceIcon from "../Assets/Image/Voice.svg";
import ThemeIcon from "../Assets/Image/Theme.svg";
import { Navigation, IconicButton, LibraryOptionsItem, LibraryLinks, LibraryDetailTop } from '../Component';
import { RiShareLine, RiDeleteBinLine } from "react-icons/ri";

const FavoritiesDetailsPage = () => {

    const history = useHistory();
    const HandleGoback = () => {
        history.goBack();
    }
    
    const { loading, singleFavorite, deletHistoryData, deletFavoriteData, removeFromFavorite, handleAddFavorite } =  useContext(BreathContext);

    // const dataFromLocalstorage = localStorage.getItem('singleFavoriteData') ? JSON.parse(localStorage.getItem('singleFavoriteData')) : {};

    const {id, title, goal, theme, duration_minutes, voice} = singleFavorite;


    return (
        <Fragment>
            <Navigation/>
            { loading ? "Loading..." : (
                <div className="container library-single">
                    <div className="library-inner">
                        <LibraryLinks>
                            <li className="nav-item active">
                                <Link onClick={deletHistoryData} to="/library">Favorites</Link>
                            </li>
                            <li className="nav-item">
                                <Link onClick={deletFavoriteData} to="/library/history">History</Link>
                            </li>
                        </LibraryLinks>
                        <div className="library-content library-inner">
                            <LibraryDetailTop title={title} onClick={HandleGoback} />
                            <div className="details-items">
                                <div className="row"> 
                                    {goal ? <LibraryOptionsItem icon={GoalIcon} title="Goal" text={goal} /> : ''}
                                    {duration_minutes ? <LibraryOptionsItem icon={TimeIcon} title="Time" text={duration_minutes} /> : ''}
                                    {voice ? <LibraryOptionsItem icon={VoiceIcon} title="Voice" text={voice} /> : ''}
                                    {theme ? <LibraryOptionsItem icon={ThemeIcon} title="Theme" text={theme} /> : ''}
                                </div>
                            </div>
                            <div className="details-action">
                                <IconicButton type="primary" text="New Duplicate" imgIcon={DuplicateIcon} click={ () => handleAddFavorite(id)}/>
                                <IconicButton type="primary" text="Share" icon={RiShareLine}/>
                                <IconicButton type="danger" text="Remove from Favorites" icon={RiDeleteBinLine} click={ () => removeFromFavorite(id) }/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default FavoritiesDetailsPage;