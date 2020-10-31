import React, {Component, Fragment} from 'react';
import FavoritesDetails from "../Component/FavoritesDetails";
import {Link, NavLink} from "react-router-dom";
import TopNavigationTwo from "../Component/TopNavigationTwo";

class FavoritiesDetailsPage extends Component {
    render() {
        return (
            <Fragment>
                <TopNavigationTwo/>
                <div className="library">
                    <div className="row no-space">
                        <div className="col-1">
                            <div className="library-top">
                                <div className="tabs">
                                    <div className="sc-bdnylx hzxEwr">
                                        <ul className="sc-gtssRu jLtfL collapsed">
                                            <li className="sc-dlnjPT bqnhDN nav-item">
                                                <NavLink to="library"><p className="active">Favorites</p></NavLink>
                                            </li>
                                            <li className="sc-dlnjPT bqnhDN nav-item">
                                                <Link to="library">History</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row no-space">
                        <div className="col-1">
                            <div className="library-content fav-details">
                                <FavoritesDetails/>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default FavoritiesDetailsPage;