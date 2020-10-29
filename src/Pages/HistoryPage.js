import React, {Component, Fragment} from 'react';
import TopNavigation from "../Component/TopNavigation";
import {Link} from "react-router-dom";
import History from "../Component/History";
import TopNavigationTwo from "../Component/TopNavigationTwo";

class HistoryPage extends Component {
    render() {
        return (
            <Fragment>
                <TopNavigationTwo/>
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
                                <History/>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default HistoryPage;