import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <Fragment>
                    <div className="container home-container">
                        <div className="row">
                            <div className="col-1">
                                <div className="home-page">
                                    <h2 className="session-title ">Session Design</h2>
                                    <div className="task-list">
                                        <p className="task">Goal</p>
                                        <p className="task-des">Relax</p>
                                    </div><div className="task-list">
                                    <p className="task">Time</p>
                                    <p className="task-des">2 min</p>
                                </div><div className="task-list">
                                    <p className="task">Narattion</p>
                                    <p className="task-des">Normal</p>
                                </div>
                                    <div className="task-list">
                                        <p className="task">Theme</p>
                                        <p className="task-des">Nature</p>
                                    </div>
                                    <Link to="/feel"><button className="btn btn-primary">Start</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
            </Fragment>
        );
    }
}

export default Home;