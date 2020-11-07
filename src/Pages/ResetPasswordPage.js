import React, {Component, Fragment} from 'react';
import { ResetPassword } from "../Component";
import RoundLogo from "../Component/RoundLogo";

class ResetPasswordPage extends Component {
    render() {
        return (
            <Fragment>
                <RoundLogo/>
                <ResetPassword/>
            </Fragment>
        );
    }
}

export default ResetPasswordPage;