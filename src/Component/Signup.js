import React, {Component, Fragment} from 'react';
import {Link, Redirect} from "react-router-dom";
import Password from '../Assets/Image/password.svg';
import ConfirmPassword from '../Assets/Image/confirm password.svg';
import Username from '../Assets/Image/username.svg';
import { FiAtSign } from 'react-icons/fi';
import Phone from '../Assets/Image/phone number.svg';
import Facebook from '../Assets/Image/facebook.svg';
import Google from '../Assets/Image/google.svg';
import Apple from '../Assets/Image/apple.JPG';
import loadingGif from '../Assets/Image/gif/loading-arrow.gif';
import FormField from './FormField';

class Signup extends Component {
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
        this.signUp = this.signUp.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    signUp = () =>{
        if(this.state.username && this.state.password){
            let proxyurl = "https://cors-anywhere.herokuapp.com/";
            let BaseUrl = 'https://www.breathconductor.com/api_v1/auth/signup';

            var myHeaders = new Headers();
            myHeaders.append("device-id", "1");
            myHeaders.append("timezone", "UTC");
            myHeaders.append("device-type", "1");
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            var urlencoded = new URLSearchParams();
            urlencoded.append("username", `${this.state.username}`);
            urlencoded.append("email", `${this.state.email}`);
            urlencoded.append("password", `${this.state.password}`);
            urlencoded.append("confirm_password", `${this.state.confirmPassword}`);
            urlencoded.append("country_code", "us");
            urlencoded.append("phone_dial_code", "123456");
            urlencoded.append("phone_number", `${this.state.phoneNumber}`);
            urlencoded.append("firebase_token", "BD43813E-CFC5-4EEB-ABE2-94562A6E76CA");

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };

            this.setState({
                message: "processing your request please wait",
                processing: true
            })

            fetch(proxyurl + BaseUrl, requestOptions)
                .then((response) => response.json())
                .then((responsejson) => {
                    let status = responsejson.status === "error" ? true : false;
                    this.setState({
                        message: responsejson.message,
                        error: status,
                        processing: false
                    });
                    let userData = responsejson.data.user_details;
                    //console.log(responsejson)
                    if(userData){
                        sessionStorage.setItem('token', userData.auth_token);
                        this.setState({
                            redirect: true,
                        })
                    }else{
                        this.setState({
                            message: responsejson.message
                        })
                        //console.log(responsejson.message)
                    }
                })
                .catch((error) => {
                   return error;
                })
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
        //console.log("coming here")
    }

    render() {
        if(this.state.redirect){
            return (<Redirect to="/login" />)
        }
        if(sessionStorage.getItem('user_details')){
            return (<Redirect to="/login" />)
        }

        const statusClass = this.state.error !== false ? 'message error' : 'message' || this.state.warning ? "message waring" : "message";

        const {username, email, password,confirmPassword, phoneNumber} = this.state;

        return (
            <Fragment>
                <div className="container login-box">
                    <div className="container-inner">
                        <div className="sign-in sign-up">
                            <h2 className="title">Sign Up to Breath Conductor</h2>
                            <p className="details">Enter your details below</p>
                            <form>
                                <FormField type="text" placeholder="User Name" name="username" required={true} onChange={this.handleChange} value={username} icon={Username}/>
                                <FormField type="email" placeholder="Email Address" name="email" required={true} onChange={this.handleChange} value={email} reactIcon={FiAtSign}/>
                                <FormField type="number" placeholder="Phone Number" name="phoneNumber" required={true} onChange={this.handleChange} value={phoneNumber} icon={Phone}/>
                                <FormField type="password" placeholder="Password" name="password" required={true} onChange={this.handleChange} value={password} icon={Password}/>
                                <FormField type="password" placeholder="Confirm Password" name="confirmPassword" required={true} onChange={this.handleChange} value={confirmPassword} icon={ConfirmPassword}/>
                            </form>
                            <button onClick={() => this.signUp()} className="btn btn-primary">Sign Up</button>
                            <p className={statusClass}>{this.state.processing ? (<img src={loadingGif} alt="Loading gif" />) : ''} {this.state.message}</p>
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
            </Fragment>
        );
    }
}

export default Signup;