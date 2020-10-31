import React, {Component, Fragment} from 'react';
import { Redirect } from 'react-router-dom';
import Home from "../Component/Home";
import TopNavigationTwo from "../Component/TopNavigationTwo";

class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false
        }
        this.logOut = this.logOut.bind(this);
    }

    componentDidMount(){
        if(sessionStorage.getItem('user_details')){
            console.log('call user feed')
        }else{
            this.setState({redirect: true})
        }
    }

    logOut = () => {
        sessionStorage.clear();
        this.setState({redirect: true})
    }
    render() {
        if(this.state.redirect){
            return (<Redirect to="/login" />)
        }
        return (
            <Fragment>
                <TopNavigationTwo onLogOut={this.logOut}/>
                <Home/>
            </Fragment>
        );
    }
}

export default HomePage;