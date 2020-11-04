import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { Tab, TabContent } from './tab';
import NextPlay from "../Assets/Image/next.svg";

class Library extends Component {

    constructor(props){
        super(props);
        this.state ={
            selected: 'Favorites'
        }
    }

    setSelected = (tab) => {
        this.setState({selected: tab });
    }


    render() {
        return (
            <div className="container">
                <div className="library-inner">
                    <div className="library-top">
                        <div className="tabs">
                            <Tab tabs={['Favorites', 'History']} selected={this.state.selected} setSelected={this.setSelected} ></Tab>
                        </div>
                    </div>
                    <div className="library-content">
                        <TabContent showHeader={this.props.showHeader} isSelected={this.state.selected === 'Favorites'}>
                            <div className="favorites-list">
                                <Link to="favoritesdetails">
                                    <div className="favorites-info">
                                        <h2>Simple Breath</h2>
                                        <p>15 Minutes</p>
                                    </div>
                                    <div className="favorites-arrow">
                                        <img src={NextPlay} alt="Next play icon"/>
                                    </div>
                                </Link>
                            </div>
                            <div className="favorites-list">
                                <Link to="favoritesdetails">
                                    <div className="favorites-info">
                                        <h2>Simple Breath</h2>
                                        <p>15 Minutes</p>
                                    </div>
                                    <div className="favorites-arrow">
                                        <img src={NextPlay} alt="Next play icon"/>
                                    </div>
                                </Link>
                            </div>
                            <div className="favorites-list">
                                <Link to="favoritesdetails">
                                    <div className="favorites-info">
                                        <h2>Simple Breath</h2>
                                        <p>15 Minutes</p>
                                    </div>
                                    <div className="favorites-arrow">
                                        <img src={NextPlay} alt="Next play icon"/>
                                    </div>
                                </Link>
                            </div>
                            <div className="favorites-list">
                                <Link to="favoritesdetails">
                                    <div className="favorites-info">
                                        <h2>Simple Breath</h2>
                                        <p>15 Minutes</p>
                                    </div>
                                    <div className="favorites-arrow">
                                        <img src={NextPlay} alt="Next play icon"/>
                                    </div>
                                </Link>
                            </div>
                            <div className="favorites-list">
                                <Link to="favoritesdetails">
                                    <div className="favorites-info">
                                        <h2>Simple Breath</h2>
                                        <p>15 Minutes</p>
                                    </div>
                                    <div className="favorites-arrow">
                                        <img src={NextPlay} alt="Next play icon"/>
                                    </div>
                                </Link>
                            </div>
                        </TabContent>
                        <TabContent isSelected={this.state.selected === 'History'}>
                            <div className="favorites-list">
                                <Link to="historydetails">
                                    <div className="favorites-info">
                                        <h2>Tranquil Golded Sun</h2>
                                        <p>Focus 4:30pm 2/22/2020</p>
                                    </div>
                                    <div className="favorites-arrow">
                                        <Link to="historydetails"><img src={NextPlay} alt="Next play icon"/></Link>
                                    </div>
                                </Link>
                            </div>
                            <div className="favorites-list">
                                <Link to="historydetails">
                                    <div className="favorites-info">
                                        <h2>Tranquil Golded Sun</h2>
                                        <p>Focus 4:30pm 2/22/2020</p>
                                    </div>
                                    <div className="favorites-arrow">
                                        <img src={NextPlay} alt="Next play icon"/>
                                    </div>
                                </Link>
                            </div>
                            <div className="favorites-list">
                                <Link to="historydetails">
                                    <div className="favorites-info">
                                        <h2>Tranquil Golded Sun</h2>
                                        <p>Focus 4:30pm 2/22/2020</p>
                                    </div>
                                    <div className="favorites-arrow">
                                        <Link to="historydetails"><img src={NextPlay} alt="Next play icon"/></Link>
                                    </div>
                                </Link>
                            </div>
                            <div className="favorites-list">
                                <Link to="historydetails">
                                    <div className="favorites-info">
                                        <h2>Tranquil Golded Sun</h2>
                                        <p>Focus 4:30pm 2/22/2020</p>
                                    </div>
                                    <div className="favorites-arrow">
                                        <img src={NextPlay} alt="Next play icon"/>
                                    </div>
                                </Link>
                            </div>
                            <div className="favorites-list">
                                <Link to="historydetails">
                                    <div className="favorites-info">
                                        <h2>Tranquil Golded Sun</h2>
                                        <p>Focus 4:30pm 2/22/2020</p>
                                    </div>
                                    <div className="favorites-arrow">
                                        <img src={NextPlay} alt="Next play icon"/>
                                    </div>
                                </Link>
                            </div>
                        </TabContent>
                    </div>
                </div>
            </div>
        );
    }
}

export default Library;