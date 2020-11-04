import React, {Component, Fragment} from 'react';
import Tutorial from "../Component/Tutorial";
import Navigation from "../Component/Navigation";

class TutorialPage extends Component {
    render() {
        return (
            <Fragment>
                <Navigation/>
                <Tutorial/>
            </Fragment>
        );
    }
}

export default TutorialPage;