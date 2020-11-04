import React, { Component } from 'react';
import {Link, Redirect} from "react-router-dom";
import axios from 'axios';
import Password from '../Assets/Image/password.svg';
import ConfirmPassword from '../Assets/Image/confirm password.svg';
import Username from '../Assets/Image/username.svg';
import { FiAtSign } from 'react-icons/fi';
import Phone from '../Assets/Image/phone number.svg';
import Facebook from '../Assets/Image/facebook.svg';
import Google from '../Assets/Image/google.svg';
import Apple from '../Assets/Image/apple.JPG';
import loadingGif from '../Assets/Image/gif/loading-arrow.gif';

export default class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            redirect: false,
            message: '',
            error: false,
            warning: false,
            processing: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // Submit form
    handleSubmit = (e) => {
        e.preventDefault();

        if(this.state.username && this.state.email && this.state.password && this.state.confirmPassword && this.state.phoneNumber){
            let proxyurl = "https://cors-anywhere.herokuapp.com/";
            let BaseUrl = 'https://www.breathconductor.com/api_v1/auth/signup';
            var qs = require('qs');
            var data = qs.stringify({
                'username': `${this.state.username}`,
                'email': `${this.state.email}`,
                'password': `${this.state.password}`,
                'confirm_password': `${this.state.confirmPassword}`,
                'country_code': 'us',
                'phone_dial_code': '123456',
                'phone_number': `${this.state.phoneNumber}`,
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

            axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                let status = response.data.status === "error" ? true : false;
                this.setState({
                    message: response.data.message,
                    error: status,
                    processing: false
                });

                let userDetails = response.data.data.user_details;
                if(userDetails){
                    localStorage.setItem('user_details', userDetails );
                    this.setState({
                        redirect: true,
                    })
                    }else{
                    this.setState({
                        message: response.data.message
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }else{
            this.setState({
                message: 'Please fillup required fields!',
                warning: true,
                processing: false
            })
        }
    }

    // Onchange field
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
            return (<Redirect to="/login" />)
        }
        return (
            <div className="container login-box">
                <div className="container-inner">
                    <div className="inner-wrapper">
                        <div className="sign-in sign-up">
                            <h2 className="title">Sign Up to Breath Conductor</h2>
                            <p className="details">Enter your details below</p>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-field">
                                    <div className="form-icon">
                                        <img src={Username} alt="User icon"/>
                                    </div>
                                    <input onChange={this.handleChange} name="username" type="text" placeholder="User Name" value={this.state.username} />
                                </div>
                                <div className="form-field">
                                    <div className="form-icon">
                                        <FiAtSign />
                                    </div>
                                    <input onChange={this.handleChange} name="email" type="email" placeholder="Email Address" value={this.state.email} />
                                </div>
                                <div className="form-field">
                                    <div className="form-icon">
                                        <img src={Phone} alt="Phone icon"/>
                                    </div>
                                    <input onChange={this.handleChange} name="phoneNumber" type="number" placeholder="Phone Number" value={this.state.phoneNumber}/>
                                </div>
                                <div className="form-field">
                                    <div className="form-icon">
                                        <img src={Password} alt="Password icon"/>
                                    </div>
                                    <input onChange={this.handleChange} name="password" type="password" placeholder="Password" value={this.state.password} />
                                </div>
                                <div className="form-field">
                                    <div className="form-icon">
                                        <img src={ConfirmPassword} alt="Password icon"/>
                                    </div>
                                    <input onChange={this.handleChange} name="confirmPassword" type="password" placeholder="Confirm Password" value={this.state.ConfirmPassword} />
                                </div>
                                <button type="submit" className="btn btn-primary">Sign Up</button>
                            </form>
                            <p>{this.state.processing ? (<img src={loadingGif} alt="Loading gif" />) : ''} {this.state.message}</p>
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

                        <p className="signup-text">Already have an account?<Link to="/login"> <span className="text-primary">Sign In</span> </Link> </p>
                    </div>
                </div>
            </div>
        )
    }
}
