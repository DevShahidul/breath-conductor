import React, {Component} from 'react';
import axios from 'axios';
import {Link, Redirect} from "react-router-dom";
import Password from '../Assets/Image/password.svg';
import Username from '../Assets/Image/username.svg';
import Facebook from '../Assets/Image/facebook.svg';
import Google from '../Assets/Image/google.svg';
import Apple from '../Assets/Image/apple.JPG';
import loadingGif from '../Assets/Image/gif/loading-arrow.gif';
//import { PostData } from '../services/PostData';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: false,
            message: '',
            error: false,
            warning: false,
            processing: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //var axios = require('axios');
        if(this.state.username && this.state.password){
            let proxyurl = "https://cors-anywhere.herokuapp.com/";
            let BaseUrl = 'https://www.breathconductor.com/api_v1/auth/login';
            var qs = require('qs');
            var data = qs.stringify({
                'username': `${this.state.username}`,
                'password': `${this.state.password}`,
                'firebase_token': 'BD43813E-CFC5-4EEB-ABE2-94562A6E76CA' 
            });
            var config = {
                method: 'post',
                url: proxyurl + BaseUrl,
                headers: { 
                    'device-id': '1', 
                    'timezone': 'UTC', 
                    'device-type': '1', 
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data : data
            };

            this.setState({
                message: "processing your request please wait",
                processing: true
            })

            axios(config)
            .then(response => {
                console.log(JSON.stringify(response.data));
                let status = response.data.status === "error" ? true : false;
                this.setState({
                    message: response.data.message,
                    error: status,
                    processing: false
                });

                let userDetails = response.data.data.user_details;
                if(userDetails){
                    localStorage.setItem('token', userDetails.auth_token);
                    sessionStorage.setItem('user_details', response.data );
                    this.setState({
                        redirect: true,
                    })
                 }else{
                    this.setState({
                        message: response.data.message
                    })
                }
            })
            .catch( error => {
                console.log(error);
            });
        }else{
            this.setState({
                message: 'Please enter User name and Password!',
                warning: true,
                processing: false
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            message: '',
            warning: false,
            error: false,
            processing: false,
            [e.target.name] : e.target.value
        })
    }


    render() {
        if(this.state.redirect){
            return (<Redirect to="/" />)
        }
        if(sessionStorage.getItem('token')){
            return (<Redirect to="/" />)
        }

        const statusClass = this.state.error !== false ? 'message error' : 'message' || this.state.warning ? "message waring" : "message";

        return (
            <div className="container login-box">
                <div className="container-inner">
                    <div className="sign-in">
                        <h2 className="title">Sign In to Breath Conductor</h2>
                        <p className="details">Enter your details below</p>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-field">
                                <img src={Username} alt="User icon"/>
                                <input required type="text" name="username" placeholder="User Name" onChange={this.handleChange}/>
                            </div>
                            <div className="form-field">
                                <img src={Password} alt="Password icon"/>
                                <input required type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
                            </div>
                            <p className="forget">Forget Your Password?</p>
                            <button type="submit" className="btn btn-primary" > Sign In</button>
                        </form>
                        { this.state.message !== '' ?
                        <p className={statusClass}>{this.state.processing ? (<img src={loadingGif} alt="Loading gif" />) : ''} {this.state.message}</p> : null}
                    </div>
                    <div className="text-divider">or</div>
                    <div className="social-login">
                        <div className="col-3">
                            <div className="social-img">
                                <img src={Facebook} alt="Facebook icon"/>
                            </div>
                        </div><div className="col-3">
                            <div className="social-img">
                                <img src={Google} alt="Google icon"/>
                            </div>
                        </div><div className="col-3">
                            <div className="social-img">
                                <img src={Apple} alt="Apple icon"/>
                            </div>
                        </div>
                    </div>
                    <p className="signup-text">Don't have an account?<Link to="signup"> <span className="text-primary"> Sign Up </span> </Link></p>
                </div>
            </div>
        );
    }
}

export default Login;