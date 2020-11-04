import React, {Component, Fragment} from 'react';
import BackIcon from "../Assets/Image/back.svg";
import {Link} from "react-router-dom";
import { VideoPlayer } from './VideoPlayer/VideoPlayer'


class Tutorial extends Component {
    render() {
        return (
            <Fragment>
                <div className="tutorial">
                    <div className="row">
                        <div className="tutorial-top">
                            <div className="back-section">
                                <Link to="/feel"><img src={BackIcon} alt="Back arrow"/></Link>
                            </div>
                            <div className="section-title">
                                <h2>Tutorial</h2>
                                <Link to="feedbacksubmit"><p>Click Here for Next Section</p></Link>
                            </div>
                        </div>
                        <VideoPlayer />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Tutorial;