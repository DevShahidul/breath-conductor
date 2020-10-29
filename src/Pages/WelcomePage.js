import React, {Component, Fragment} from 'react';
import Welcome from "../Component/Welcome";
import TopNavigation from "../Component/TopNavigation";

class WelcomePage extends Component {
    render() {
        return (
            <Fragment>
                <TopNavigation/>
                <Welcome/>
            </Fragment>
        );
    }
}

export default WelcomePage;