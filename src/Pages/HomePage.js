import React, {Component, Fragment} from 'react';
//import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Home from "../Component/Home";
import Navigation from "../Component/Navigation";

class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false
        }
        //this.logOut = this.logOut.bind(this);
    }


    componentDidMount(){
        if(sessionStorage.getItem('user_details')){
            console.log('call user feed')
        }else{
            this.setState({redirect: true})
        }

        // var config = {
        //     headers: { 
        //         Authorization: 'Bearer ' + localStorage.getItem('token'),
        //     }
        // };

        // axios.get('user', config).then(
        //     res => {
        //     console.log(res)
        // },
        // err => {
        //     console.log(err)
        // })
    }

    render() {
        if(this.state.redirect){
            return (<Redirect to="/login" />)
        }
        return ( 
            <Fragment>
                <Navigation/>
                <Home/>
            </Fragment>
        );
    }
}

export default HomePage;