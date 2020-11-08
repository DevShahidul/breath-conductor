import React, {Component} from 'react';
import {BreathContext} from '../context';
import BackIcon from "../Assets/Image/back.svg";
import { VideoPlayer } from '../Component/VideoPlayer/VideoPlayer'
import { Navigation } from '../Component';

class TutorialPage extends Component {
    static contextType = BreathContext;
    render() {
        const { backToPrev } = this.context;
        return (
            <>
            <Navigation />
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
            </>
        );
    }
}

export default TutorialPage;