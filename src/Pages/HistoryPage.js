import React, {Component, Fragment} from 'react';
import {BreathContext} from '../context';
import { Navigation, LibraryLinks } from "../Component";
import {Link} from "react-router-dom";
import NextPlay from "../Assets/Image/next.svg";

class HistoryPage extends Component {
    static contextType = BreathContext;
    render() {
        const { HistoryContents, setSingleHistoryData, deletHistoryData, deletFavoriteData } = this.context;
        return (
            <Fragment>
                <Navigation/>
                <div className="container">
                    <div className="library-inner">
                        <LibraryLinks>
                            <li className="nav-item">
                                <Link onClick={deletHistoryData} to="/library">Favorites</Link>
                            </li>
                            <li className="nav-item active">
                                <Link onClick={deletFavoriteData} to="/library/history">History</Link>
                            </li>
                        </LibraryLinks>
                        <div className="library-content">
                            {HistoryContents.map((item, index) => {
                                return (
                                    <div key={index} className="favorites-list">
                                        <Link onClick={() => setSingleHistoryData(item.id)} to={`/library/history/${item.id}`} >
                                            <div className="favorites-info">
                                                <h2>{item.title}</h2>
                                                <p>Focus - {item.date}</p>
                                            </div>
                                            <div className="favorites-arrow">
                                                <img src={NextPlay} alt="Next play icon"/>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default HistoryPage;