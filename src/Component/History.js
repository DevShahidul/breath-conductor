import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import NextPlay from "../Assets/Image/next.svg";

class History extends Component {
    render() {
        return (
                <Fragment>
                    <div className="favorites-list">
                        <div className="favorites-info">
                            <h2>Tranquil Golded Sun</h2>
                            <p>Focus 4:30pm 2/22/2020</p>
                        </div>
                        <div className="favorites-arrow">
                            <Link to="historydetails"><img src={NextPlay}/></Link>
                        </div>
                    </div>
                    <div className="favorites-list">
                        <div className="favorites-info">
                            <h2>Tranquil Golded Sun</h2>
                            <p>Focus 4:30pm 2/22/2020</p>
                        </div>
                        <div className="favorites-arrow">
                            <Link to="historydetails"><img src={NextPlay}/></Link>
                        </div>
                    </div>
                    <div className="favorites-list">
                        <div className="favorites-info">
                            <h2>Tranquil Golded Sun</h2>
                            <p>Focus 4:30pm 2/22/2020</p>
                        </div>
                        <div className="favorites-arrow">
                            <Link to="historydetails"><img src={NextPlay}/></Link>
                        </div>
                    </div>
                    <div className="favorites-list">
                        <div className="favorites-info">
                            <h2>Tranquil Golded Sun</h2>
                            <p>Focus 4:30pm 2/22/2020</p>
                        </div>
                        <div className="favorites-arrow">
                            <Link to="historydetails"><img src={NextPlay}/></Link>
                        </div>
                    </div>
                </Fragment>
        );
    }
}

export default History;