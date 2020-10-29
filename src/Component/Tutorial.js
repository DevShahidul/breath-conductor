import React, {Component, Fragment} from 'react';
import ReactPlayer from 'react-player';
import BackIcon from "../Assets/Image/back.svg";
import {Link} from "react-router-dom";


class Tutorial extends Component {
    render() {
        return (
            <Fragment>
                <div className="tutorial">
                    <div className="row">
                        <div className="col-1">
                            <div className="tutorial-top">
                                <div className="back-section">
                                    <img src={BackIcon}/>
                                </div>
                                <div className="section-title">
                                    <h2>Tutorial</h2>
                                    <Link to="survey"><p>Click Here for Next Section</p></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-1">
                            <div className="video-player">
                                <ReactPlayer width="100%" controls url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Tutorial;