import React, {Component, Fragment} from 'react';
import FeelControl from "../Component/FeelControl";
import TopNavigation from "../Component/TopNavigation";
import TopNavigationTwo from "../Component/TopNavigationTwo";

class FeelControlPage extends Component {
    render() {
        return (
            <Fragment>
                <TopNavigationTwo/>
                <FeelControl/>
            </Fragment>
        );
    }
}

export default FeelControlPage;