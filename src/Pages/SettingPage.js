import React, {Component, Fragment} from 'react';
import Setting from "../Component/Setting";
import TopNavigationTwo from "../Component/TopNavigationTwo";

class SettingPage extends Component {
    render() {
        return (
            <Fragment>
                <TopNavigationTwo/>
                <Setting/>
            </Fragment>
        );
    }
}

export default SettingPage;