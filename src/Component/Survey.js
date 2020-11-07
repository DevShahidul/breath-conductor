import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";

class Survey extends Component {
    render() {
        return (
            <Fragment>
                <div className="container survey-container">
                    <div className="row">
                            <div className="survey-page">
                                <h2 className="survey-title ">Personalize Your Practice</h2>
                                    <div className="survey-group">
                                        <div className="age">
                                            <p>Specify your age</p>
                                            <select>
                                                <option>Select</option>
                                                <option>13-18</option>
                                                <option>19-30</option>
                                                <option>31+</option>
                                            </select>
                                        </div>

                                        <div className="exp">
                                            <p>How experienced are you with meditation?</p>
                                            <select>
                                                <option>Select</option>
                                                <option>Fairly</option>
                                                <option>Sometime</option>
                                                <option>Always</option>
                                            </select>
                                        </div>
                                    </div>
                                <Link to="/library"><button className="btn btn-primary">Submit</button></Link>
                            </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Survey;