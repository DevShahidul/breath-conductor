import React, {Component, Fragment} from 'react';
import Survey from "../Component/Survey";
import TopNavigationTwo from "../Component/TopNavigationTwo";

class SurveyPage extends Component {
    render() {
        return (
            <Fragment>
                <TopNavigationTwo/>
                <Survey/>
            </Fragment>
        );
    }
}

export default SurveyPage;