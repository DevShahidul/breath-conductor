import React, {Component, Fragment} from 'react';
import { Redirect } from 'react-router-dom';
import Welcome from "../Component/Welcome";
import TopNavigation from "../Component/TopNavigation";

class WelcomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false
        }
    }

    componentDidMount(){
        if(sessionStorage.getItem('user_details')){
            console.log('call user feed')
        }else{
            this.setState({redirect: true})
        }
    }


    render() {
        if(this.state.redirect){
            return (<Redirect to="/login" />)
        }
        return (
            <Fragment>
                <TopNavigation/>
                <Welcome/>
            </Fragment>
        );
    }
}

export default WelcomePage;