import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";

class FeelControl extends Component {
    render() {
        return (
            <Fragment>
                <div className="container feel-container">
                    <div className="row">
                        <div className="col-1">
                            <div className="home-page">
                                <h2 className="session-title ">How relaxed do you feel?</h2>
                                <div className="radio-item-group">
                                    <div className="radio-item">
                                        <div className="item">
                                            <input type="checkbox"/>
                                            <div className="box">
                                            </div>
                                        </div>
                                        <div className="item">
                                            <input type="checkbox"/>
                                            <div className="box">
                                            </div>
                                        </div>
                                        <div className="item">
                                            <input type="checkbox"/>
                                            <div className="box">
                                            </div>
                                        </div>
                                        <div className="item">
                                            <input type="checkbox"/>
                                            <div className="box">
                                            </div>
                                        </div>
                                        <div className="item">
                                            <input type="checkbox"/>
                                            <div className="box">
                                            </div>
                                        </div>

                                    </div>
                                    <div className="radio-text">
                                        <p>Not Relaxed </p>
                                        <p>Relaxed </p>
                                    </div>
                                </div>
                                <Link to="/tutorial"><button className="btn btn-primary">Continue</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default FeelControl;