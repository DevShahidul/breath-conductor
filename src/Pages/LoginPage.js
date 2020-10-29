import React, {Component, Fragment} from 'react';
import Login from "../Component/Login";
import TopNavigation from "../Component/TopNavigation";

class LoginPage extends Component {
    render() {
        return (
            <Fragment>
                <TopNavigation/>
                <Login/>
            </Fragment>
        );
    }
}

export default LoginPage;