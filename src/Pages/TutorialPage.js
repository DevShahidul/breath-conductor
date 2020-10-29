import React, {Component, Fragment} from 'react';
import Tutorial from "../Component/Tutorial";
import TopNavigation from "../Component/TopNavigation";
import TopNavigationTwo from "../Component/TopNavigationTwo";

class TutorialPage extends Component {
    render() {
        return (
            <Fragment>
                <TopNavigationTwo/>
                <Tutorial/>
            </Fragment>
        );
    }
}

export default TutorialPage;