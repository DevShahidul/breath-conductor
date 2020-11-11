import React, {Component} from 'react';
import {BreathContext} from '../context';
import BackIcon from "../Assets/Image/back.svg";
import editeIcon from "../Assets/Image/edit.svg";
import { RiShareLine } from "react-icons/ri";
import { VideoPlayer } from './VideoPlayer/VideoPlayer'

class Tutorial extends Component {
    static contextType = BreathContext;
    render() {
        const { backToPrev, toggleFavorite, handleShare, handleEdit, favoriteIcon, exercise_id } = this.context;
        return (
            <div className="tutorial-wrap">
                <div className="tutorial-top">
                    <div className="back-section">
                        <button onClick={backToPrev}><img src={BackIcon} alt="Back arrow"/></button>
                    </div>
                    <div className="section-title">
                        <h2>Tutorial</h2>
                    </div>
                    <div className="actionRow">
                        <button onClick={() => toggleFavorite(exercise_id)}>{favoriteIcon}</button>
                        <button onClick={handleShare}><RiShareLine /></button>
                        <button onClick={handleEdit}><img src={editeIcon} alt="Edit icon" /></button>
                    </div>
                </div>
                <VideoPlayer />
            </div>
        );
    }
}

export default Tutorial;