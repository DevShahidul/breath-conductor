import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";

class Welcome extends Component {
    render() {
        return (
            <Fragment>
                    <div className="container welcome-container">
                        <div className="row">
                            <div className="col-1">
                                <div className="intro">
                                    <h2 className="name-title ">Hey Jemma,</h2>
                                    <p className="welcome-msg">When is the best time for you to practice self-care?</p>
                                    <Link to="/home"> <button className="btn btn-primary">Yes</button></Link>
                                    <button className="btn btn-secondary">No</button>
                                </div>
                            </div>
                        </div>
                    </div>
            </Fragment>
        );
    }
}

export default Welcome;