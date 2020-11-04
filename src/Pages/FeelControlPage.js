import React, {Component, Fragment} from 'react';
import FeelControl from "../Component/FeelControl";
import Navigation from "../Component/Navigation";

class FeelControlPage extends Component {
    render() {
        return (
            <Fragment>
                <Navigation/>
                <FeelControl buttonText="Continue"/>
            </Fragment>
        );
    }
}

export default FeelControlPage;