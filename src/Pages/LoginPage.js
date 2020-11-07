import React, {Component, Fragment} from 'react';
import { Login } from "../Component";
import RoundLogo from "../Component/RoundLogo";

class LoginPage extends Component {
    render() {
        return (
            <Fragment>
                <RoundLogo/>
                <Login/>
            </Fragment>
        );
    }
}

export default LoginPage;