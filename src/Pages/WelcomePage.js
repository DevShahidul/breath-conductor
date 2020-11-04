import React, {Component, Fragment} from 'react';
//import { Redirect } from 'react-router-dom';
import Welcome from "../Component/Welcome";
import RoundLogo from "../Component/RoundLogo";

class WelcomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false
        }
    }

    render() {
        // if(this.state.redirect){
        //     return (<Redirect to="/login" />)
        // }
        return (
            <Fragment>
                <RoundLogo/>
                <Welcome/>
            </Fragment>
        );
    }
}

export default WelcomePage;