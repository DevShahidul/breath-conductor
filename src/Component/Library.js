import React, {Component, Fragment} from 'react';
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
            <Fragment>
                <div className="library">
                    <div className="row no-space">
                        <div className="col-1">
                            <div className="library-top">
                                <div className="tabs">
                                    <Tab tabs={['Favorites', 'History']} selected={this.state.selected} setSelected={this.setSelected} ></Tab>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row no-space">
                        <div className="col-1">
                            <div className="library-content">
                                <TabContent showHeader={this.props.showHeader} isSelected={this.state.selected === 'Favorites'}>
                                    <Link to="favoritesdetails">
                                    <div className="favorites-list">
                                        <div className="favorites-info">
                                            <h2>Simple Breath</h2>
                                            <p>15 Minutes</p>
                                        </div>
                                        <div className="favorites-arrow">
                                            <img src={NextPlay} alt="Next play icon"/>
                                        </div>
                                    </div>
                                    </Link>
                                    <Link to="favoritesdetails">
                                        <div className="favorites-list">
                                            <div className="favorites-info">
                                                <h2>Simple Breath</h2>
                                                <p>15 Minutes</p>
                                            </div>
                                            <div className="favorites-arrow">
                                                <img src={NextPlay} alt="Next play icon"/>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to="favoritesdetails">
                                        <div className="favorites-list">
                                            <div className="favorites-info">
                                                <h2>Simple Breath</h2>
                                                <p>15 Minutes</p>
                                            </div>
                                            <div className="favorites-arrow">
                                                <img src={NextPlay} alt="Next play icon"/>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to="favoritesdetails">
                                        <div className="favorites-list">
                                            <div className="favorites-info">
                                                <h2>Simple Breath</h2>
                                                <p>15 Minutes</p>
                                            </div>
                                            <div className="favorites-arrow">
                                                <img src={NextPlay} alt="Next play icon"/>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to="favoritesdetails">
                                        <div className="favorites-list">
                                            <div className="favorites-info">
                                                <h2>Simple Breath</h2>
                                                <p>15 Minutes</p>
                                            </div>
                                            <div className="favorites-arrow">
                                                <img src={NextPlay} alt="Next play icon"/>
                                            </div>
                                        </div>
                                    </Link>

                                </TabContent>
                                <TabContent isSelected={this.state.selected === 'History'}>
                                    <Link to="historydetails">
                                    <div className="favorites-list">
                                        <div className="favorites-info">
                                            <h2>Tranquil Golded Sun</h2>
                                            <p>Focus 4:30pm 2/22/2020</p>
                                        </div>
                                        <div className="favorites-arrow">
                                            <Link to="historydetails"><img src={NextPlay} alt="Next play icon"/></Link>
                                        </div>
                                    </div>
                                    </Link>
                                    <Link to="historydetails">
                                        <div className="favorites-list">
                                        <div className="favorites-info">
                                            <h2>Tranquil Golded Sun</h2>
                                            <p>Focus 4:30pm 2/22/2020</p>
                                        </div>
                                        <div className="favorites-arrow">
                                            <img src={NextPlay} alt="Next play icon"/>
                                             </div>
                                    </div>
                                    </Link>
                                    <Link to="historydetails">
                                        <div className="favorites-list">
                                            <div className="favorites-info">
                                                <h2>Tranquil Golded Sun</h2>
                                                <p>Focus 4:30pm 2/22/2020</p>
                                            </div>
                                            <div className="favorites-arrow">
                                                <Link to="historydetails"><img src={NextPlay} alt="Next play icon"/></Link>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to="historydetails">
                                        <div className="favorites-list">
                                            <div className="favorites-info">
                                                <h2>Tranquil Golded Sun</h2>
                                                <p>Focus 4:30pm 2/22/2020</p>
                                            </div>
                                            <div className="favorites-arrow">
                                                <img src={NextPlay} alt="Next play icon"/>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to="historydetails">
                                        <div className="favorites-list">
                                            <div className="favorites-info">
                                                <h2>Tranquil Golded Sun</h2>
                                                <p>Focus 4:30pm 2/22/2020</p>
                                            </div>
                                            <div className="favorites-arrow">
                                                <img src={NextPlay} alt="Next play icon"/>
                                            </div>
                                        </div>
                                    </Link>
                                </TabContent>
                            </div>
                        </div>
                    </div>
                </div>



                {/*
                 <div className="library">
                    <div className="row">
                        <div className="col-1">
                            <div className="library-top">
                                <div className="tabs">
                                    <Link to="library"><h2>Favorites</h2></Link>
                                </div>
                                <div className="tabs">
                                    <Link to="history"><h2>History</h2></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row no-space">
                        <div className="col-1">
                            <div className="library-content">
                                <HistoryDetails/>
                            </div>
                        </div>
                    </div>
                </div>

                 */}

            </Fragment>
        );
    }
}

export default Library;