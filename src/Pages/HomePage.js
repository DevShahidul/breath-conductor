import React, {Component, Fragment} from 'react';
import Home from "../Component/Home";
import TopNavigation from "../Component/TopNavigation";
import TopNavigationTwo from "../Component/TopNavigationTwo";

class HomePage extends Component {
    render() {
        return (
            <Fragment>
                <TopNavigationTwo/>
                <Home/>
            </Fragment>
        );
    }
}

export default HomePage;