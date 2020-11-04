import React, {Component, Fragment} from 'react';
import Signup from "../Component/Signup";
import TopNavigation from "../Component/RoundLogo";

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