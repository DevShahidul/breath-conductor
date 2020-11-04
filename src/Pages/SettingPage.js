import React, {Component, Fragment} from 'react';
import Setting from "../Component/Setting";
import Navigation from "../Component/Navigation";

class SettingPage extends Component {
    render() {
        return (
            <Fragment>
                <Navigation/>
                <Setting/>
            </Fragment>
        );
    }
}

export default SettingPage;