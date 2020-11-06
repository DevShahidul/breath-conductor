import React, {Component, Fragment} from 'react';
import NextPlay from "../Assets/Image/next.svg";
//import {Link} from "react-router-dom";

class Favorites extends Component {
    render() {
        return (
            <Fragment>
                <div className="favorites-list">
                    <div className="favorites-info">
                        <h2>Simple Breath</h2>
                        <p>15 Minutes</p>
                    </div>
                    <div className="favorites-arrow">
                        <img src={NextPlay} alt="Next play icon"/>
                    </div>
                </div>
                <div className="favorites-list">
                    <div className="favorites-info">
                        <h2>Simple Breath</h2>
                        <p>15 Minutes</p>
                    </div>
                    <div className="favorites-arrow">
                        <img src={NextPlay} alt="Next play icon"/>
                    </div>
                </div>
                <div className="favorites-list">
                    <div className="favorites-info">
                        <h2>Simple Breath</h2>
                        <p>15 Minutes</p>
                    </div>
                    <div className="favorites-arrow">
                        <img src={NextPlay} alt="Next play icon"/>
                    </div>
                </div>
                <div className="favorites-list">
                    <div className="favorites-info">
                        <h2>Simple Breath</h2>
                        <p>15 Minutes</p>
                    </div>
                    <div className="favorites-arrow">
                        <img src={NextPlay} alt="Next play icon"/>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Favorites;