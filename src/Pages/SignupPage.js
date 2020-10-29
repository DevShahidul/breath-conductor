import React, {Component, Fragment} from 'react';
import Signup from "../Component/Signup";
import TopNavigation from "../Component/TopNavigation";
import TopNavigationTwo from "../Component/TopNavigationTwo";

class SignupPage extends Component {
    render() {
        return (
            <Fragment>
                <TopNavigation/>
                <Signup/>
            </Fragment>
        );
    }
}

export default SignupPage;