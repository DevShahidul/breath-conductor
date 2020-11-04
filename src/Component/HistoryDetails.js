import React, {Component, Fragment} from 'react';
import BackIcon from "../Assets/Image/back.svg";
import GoalIcon from "../Assets/Image/Goal.svg";
import TimeIcon from "../Assets/Image/Time.svg";
import VoiceIcon from "../Assets/Image/Voice.svg";
import ThemeIcon from "../Assets/Image/Theme.svg";
import {Link} from "react-router-dom";
import { IconicButton } from './IconicButton';
import DuplicateIcon from "../Assets/Image/New-Duplicate-icon.svg";
import { RiShareLine, RiDeleteBinLine } from "react-icons/ri";

class HistoryDetails extends Component {
    render() {
        return (
            <Fragment>
                <div className="details-top">
                    <div className="back-section">
                        <Link to="library"><img src={BackIcon} alt="Back icon"/></Link>
                    </div>
                    <div className="section-title">
                        <h2>Tranquil Golded Sun</h2>
                        <p>Focus 4:30pm 2/22/2020</p>
                    </div>
                </div>
                <div className="details-items">
                    <div className="row">
                        <div className="col-4">
                            <div className="img-box">
                                <img src={GoalIcon} alt="Goal icon"/>
                                <p>Goal</p>
                            </div>
                            <h4>Relax</h4>
                        </div>
                        <div className="col-4">
                            <div className="img-box">
                                <img src={TimeIcon} alt="Watch icon"/>
                                <p>Time</p>
                            </div>
                            <h4>7 min</h4>
                        </div>
                        <div className="col-4">
                            <div className="img-box">
                                <img src={VoiceIcon} alt="Voice icon"/>
                                <p>Voice</p>
                            </div>
                            <h4>Sparse</h4>
                        </div>
                        <div className="col-4">
                            <div className="img-box">
                                <img src={ThemeIcon} alt="Watch icon"/>
                                <p>Theme</p>
                            </div>
                            <h4>Nature</h4>
                        </div>
                    </div>
                </div>
                <div className="details-action">
                    <div className="row">
                        <div className="col-3">
                            <IconicButton type="primary" text="New Duplicate" imgIcon={DuplicateIcon}/>
                        </div>
                        <div className="col-3">
                            <IconicButton type="primary" text="Share" icon={RiShareLine}/>
                        </div>
                        <div className="col-3">
                            <IconicButton type="danger" text="Remove from Favorites" icon={RiDeleteBinLine}/>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default HistoryDetails;