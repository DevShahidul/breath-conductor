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
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import AppleLogin from 'react-apple-login'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Loader from './loader/Loader';

class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            dialCode: '1',
            countryCode: 'us',
            phoneNumber: '',
            social_id: '',
            social_type: '',
            redirect: false,
            message: '',
            error: false,
            warning: false,
            processing: false,
            signupPopup: false
        }
        this.signUp = this.signUp.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    signUp = (e) =>{
        e.preventDefault();
        if(this.state.username && this.state.password){
            let proxyurl = "https://quiet-retreat-79741.herokuapp.com/";
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
                    let profilePicture = userData.profile_picture;
                    //console.log(responsejson)
                    if(userData){
                        localStorage.setItem('token', userData.auth_token);
                        localStorage.setItem('email', userData.email);
                        localStorage.setItem('username', userData.username);
                        localStorage.setItem('userID', userData.userID);
                        if(profilePicture){
                            localStorage.setItem('userPhoto', profilePicture);
                        }
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


    responseGoogle = (response) => {
        console.log(response);
        let userData = response.profileObj;
        if(userData){
            this.setState({
                email: userData.email,
                social_type: 1,
                social_id: userData.googleId,
                userPhoto: userData.imageUrl,
                signupPopup: true
            });
        }
        // else{
        //     this.setState({
        //         message: "Something went wrong! Please try again",
        //         processing: false,
        //         signupPopup: false
        //     })
        // }

        console.log(response);
    }

    responseFacebook = (response) => {
        let res = response.status
        if(res !== 'unknown'){
            let userData = response;

            this.setState({
                email: userData.email,
                social_type: 2,
                social_id: userData.userID,
                userPhoto: userData.picture.data.url,
                signupPopup: true
            });
        }
        //else{
        //     this.setState({
        //         message: "Something went wrong! Please try again",
        //         processing: false,
        //         signupPopup: false
        //     })
        // }
        console.log(response.status)
    }

    // Apple signup
    responseApple = (response) =>{
        console.log(response)
    }

    // Social signup function
    socialSignup = (e) => {
        const { username, email, phoneNumber, social_type, social_id, dialCode, countryCode } = this.state;
        e.preventDefault();
        if(username && phoneNumber){
            let proxyurl = "https://quiet-retreat-79741.herokuapp.com/";
            let BaseUrl = 'https://www.breathconductor.com/api/v1/auth/social-signup';

            var myHeaders = new Headers();
            myHeaders.append("device-id", "1");
            myHeaders.append("timezone", "UTC");
            myHeaders.append("device-type", "1");
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            var urlencoded = new URLSearchParams();
            urlencoded.append("username", username);
            urlencoded.append("email", email);
            urlencoded.append("country_code", countryCode);
            urlencoded.append("phone_dial_code", dialCode);
            urlencoded.append("phone_number", phoneNumber);
            urlencoded.append("social_id", social_id);
            urlencoded.append("social_type", social_type);
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

            fetch(proxyurl+BaseUrl, requestOptions)
            .then(response => response.json())
            .then(result => {
                let message = result.message
                let status = result.status === "error" ? true : false;
                this.setState({
                    message,
                    error: status,
                    processing: false
                })
                if(result.status_code === 200){
                    this.setState({
                        redirect: true,
                    })
                }
                console.log(result)
            })
            .catch(error => {
                console.log(error)
            });
        }else{
            this.setState({
                message: 'User name and Phone Number is Required!',
                warning: true,
                processing: false
            })
        }
    }

    render() {
        if(this.state.redirect){
            return (<Redirect to="/login" />)
        }
        if(localStorage.getItem('token')){
            return (<Redirect to="/login" />)
        }

        const statusClass = this.state.error !== false ? 'message error' : 'message' || this.state.warning ? "message waring" : "message";

        const {username, email, password,confirmPassword, phoneNumber, signupPopup} = this.state;

        return (
            <Fragment>
                <div className="container signup-box">
                    <div className="container-inner small">
                        <div className="contents-wrap">
                            {signupPopup?
                                <div className="sign-in sign-up social-signup">
                                    <h2 className="title">Sign Up to Breath Conductor</h2>
                                    <form onSubmit={this.socialSignup}>
                                        <FormField type="text" placeholder="User Name" name="username" required={true} onChange={this.handleChange} value={username} icon={Username}/>
                                        <FormField type="email" placeholder="Email Address" name="email" required={true} onChange={this.handleChange} value={email} reactIcon={FiAtSign}/>
                                        <PhoneInput
                                        country={'us'}
                                        value={phoneNumber}
                                        onChange={
                                            (value, country) => {
                                                let dialCode = country.dialCode
                                                let countryCode = country.countryCode
                                                // console.log(dialCode);
                                                // console.log(countryCode);
                                                this.setState({ 
                                                    phoneNumber: value,
                                                    dialCode,
                                                    countryCode
                                                })
                                            }
                                        }
                                        />
                                        <button className="btn btn-primary">Sign Up</button>
                                    </form>
                                    <p className={statusClass}>{this.state.processing ? (<Loader />) : ''} {this.state.message}</p>
                                </div>: (
                                    <>
                                    <div className="sign-in sign-up">
                                        <h2 className="title">Sign Up to Breath Conductor</h2>
                                        <p className="details">Enter your details below</p>
                                        <form onSubmit={this.signUp}>
                                            <FormField type="text" placeholder="User Name" name="username" required={true} onChange={this.handleChange} value={username} icon={Username}/>
                                            <FormField type="email" placeholder="Email Address" name="email" required={true} onChange={this.handleChange} value={email} reactIcon={FiAtSign}/>
                                            <FormField type="number" placeholder="Phone Number" name="phoneNumber" required={true} onChange={this.handleChange} value={phoneNumber} icon={Phone}/>
                                            <FormField type="password" placeholder="Password" name="password" required={true} onChange={this.handleChange} value={password} icon={Password}/>
                                            <FormField type="password" placeholder="Confirm Password" name="confirmPassword" required={true} onChange={this.handleChange} value={confirmPassword} icon={ConfirmPassword}/>
                                            <button className="btn btn-primary">Sign Up</button>
                                        </form>
                                        <p className={statusClass}>{this.state.processing ? (<img src={loadingGif} alt="Loading gif" />) : ''} {this.state.message}</p>
                                    </div>
                                    <div className="text-divider">or</div>
                                    <div className="social-login">
                                        <div className="col-3">
                                            <FacebookLogin
                                                appId="1583199195220849"
                                                autoLoad={false}
                                                fields="name,email,picture"
                                                callback={this.responseFacebook}
                                                render={renderProps => (
                                                    <button onClick={renderProps.onClick}><img src={Facebook} alt="Facebook icon"/></button>
                                                )}
                                            />
                                        </div>
                                        <div className="col-3">
                                            <GoogleLogin
                                                clientId="734812129749-p2f4dn8g8fd3hdvp4fvoee5n6k640r4t.apps.googleusercontent.com"
                                                onSuccess={this.responseGoogle}
                                                onFailure={this.responseGoogle}
                                                cookiePolicy={'single_host_origin'}
                                                disabled={false}
                                                render={renderProps => (
                                                    <button onClick={renderProps.onClick} disabled={renderProps.disabled}><img src={Google} alt="Google icon"/></button>
                                                )}
                                            />
                                        </div>
                                        <div className="col-3">
                                            <AppleLogin 
                                                clientId="YGT24URKF9" 
                                                redirectURI="http://localhost:3001" 
                                                callback={this.responseApple}
                                                render={renderProps => (
                                                    <button onClick={renderProps.onClick} disabled={renderProps.disabled}><img src={Apple} alt="Apple icon"/></button>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <p className="signup-text">Already have an account?<Link to="/login"> <span className="text-primary">Sign In</span> </Link> </p>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Signup;