import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import History from "../Component/History";
import Navigation from "../Component/Navigation";

class HistoryPage extends Component {
    render() {
        return (
            <Fragment>
                <Navigation/>
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