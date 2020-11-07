import React, {Component, Fragment} from 'react';
import {BreathContext} from '../context';
import { Navigation, LibraryLinks } from "../Component";
import {Link} from "react-router-dom";
import NextPlay from "../Assets/Image/next.svg";

class LibraryPage extends Component {
    static contextType = BreathContext;

    // constructor(props){
    //     super(props);
    //     this.state ={
    //         selected: 'Favorites',
    //     }
    // }

    // componentDidMount(){
        
    // }

    

    render() {
        const { FavoriteContents, setSingleFavoriteData, deletHistoryData, deletFavoriteData } = this.context;
        return (
            <Fragment>
                <Navigation/>
                {/* Library page elements */}
                <div className="container">
                    <div className="library-inner">
                        <LibraryLinks>
                            <li className="nav-item active">
                                <Link onClick={deletHistoryData} to="/library">Favorites</Link>
                            </li>
                            <li className="nav-item">
                                <Link onClick={deletFavoriteData} to="/library/history">History</Link>
                            </li>
                        </LibraryLinks>
                        <div className="library-content">
                            {FavoriteContents.map((item, index) => {
                                return (
                                    <div key={index} className="favorites-list">
                                        <Link onClick={() => setSingleFavoriteData(item.id)} to={`/library/${item.id}`} >
                                            <div className="favorites-info">
                                                <h2>{item.title}</h2>
                                                <p>{item.duration_minutes} Minutes</p>
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

export default LibraryPage;