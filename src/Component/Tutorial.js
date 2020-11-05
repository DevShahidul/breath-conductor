import React, {Component} from 'react';
import {BreathContext} from '../context';
import BackIcon from "../Assets/Image/back.svg";
import { VideoPlayer } from './VideoPlayer/VideoPlayer'

class Tutorial extends Component {
    static contextType = BreathContext;
    render() {
        const { backToPrev } = this.context;
        return (
            <div className="tutorial-wrap">
                <div className="tutorial-top">
                    <div className="back-section">
                        <button onClick={backToPrev}><img src={BackIcon} alt="Back arrow"/></button>
                    </div>
                    <div className="section-title">
                        <h2>Tutorial</h2>
                    </div>
                </div>
                <VideoPlayer />
            </div>
        );
    }
}

export default Tutorial;