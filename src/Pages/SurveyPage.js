import React, {Component, Fragment} from 'react';
import Survey from "../Component/Survey";
import Navigation from "../Component/Navigation";

class SurveyPage extends Component {
    render() {
        return (
            <Fragment>
                <Navigation/>
                <Survey/>
            </Fragment>
        );
    }
}

export default SurveyPage;