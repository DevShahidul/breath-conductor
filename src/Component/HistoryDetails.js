import React, {Component, Fragment} from 'react';
import BackIcon from "../Assets/Image/back.svg";
import GoalIcon from "../Assets/Image/Goal.svg";
import TimeIcon from "../Assets/Image/Time.svg";
import VoiceIcon from "../Assets/Image/Voice.svg";
import ThemeIcon from "../Assets/Image/Theme.svg";
import DuplicateIcon from "../Assets/Image/New Duplicate.svg";
import ShareIcon from "../Assets/Image/Share button.svg";
import RemoveIcon from "../Assets/Image/Remove from favorites.svg";
import {Link, NavLink} from "react-router-dom";

class HistoryDetails extends Component {
    render() {
        return (
            <Fragment>
                <div className="row">
                    <div className="col-1">
                        <div className="details-top">
                            <div className="back-section">
                                <Link to="library"><img src={BackIcon}/></Link>
                            </div>
                            <div className="section-title">
                                <h2>Tranquil Golded Sun</h2>
                                <p>Focus 4:30pm 2/22/2020</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="details-items">
                    <div className="row">
                        <div className="col-4">
                            <div className="img-box">
                                <img src={GoalIcon}/>
                                <p>Goal</p>
                            </div>
                            <h4>Relax</h4>
                        </div>
                        <div className="col-4">
                            <div className="img-box">
                                <img src={TimeIcon}/>
                                <p>Time</p>
                            </div>
                            <h4>7 min</h4>
                        </div>
                        <div className="col-4">
                            <div className="img-box">
                                <img src={VoiceIcon}/>
                                <p>Voice</p>
                            </div>
                            <h4>Sparse</h4>
                        </div>
                        <div className="col-4">
                            <div className="img-box">
                                <img src={ThemeIcon}/>
                                <p>Theme</p>
                            </div>
                            <h4>Nature</h4>
                        </div>
                    </div>
                </div>
                <div className="details-action">
                    <div className="row">
                        <div className="col-3">
                            <img src={DuplicateIcon}/>
                        </div>
                        <div className="col-3">
                            <img src={ShareIcon}/>
                        </div>
                        <div className="col-3">
                            <img src={RemoveIcon}/>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default HistoryDetails;