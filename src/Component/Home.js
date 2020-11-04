import React, {Component} from 'react';
//import {Link} from "react-router-dom";

class Home extends Component {
    
    render() {
        return (
            <div className="container home-container">
                <div className="container-inner">
                    <h2 className="session-title ">Session Design</h2>
                    <div className="task-list">
                        <p className="task">Goal</p>
                        <div className="task-des">Relax</div>
                    </div>
                    <div className="task-list">
                        <p className="task">Time</p>
                        <div className="task-des">2 min</div>
                    </div>
                    <div className="task-list">
                        <p className="task">Narattion</p>
                        <div className="task-des">Normal</div>
                    </div>
                    <div className="task-list">
                        <p className="task">Theme</p>
                        <div className="task-des">Nature</div>
                    </div>
                    {/* <Link to="/feel"></Link> */}
                    <button className="btn btn-primary">Start</button>
                </div>
            </div>
        );
    }
}

export default Home;