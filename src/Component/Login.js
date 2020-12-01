import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import Password from '../Assets/Image/password.svg';
import Username from '../Assets/Image/username.svg';
import Facebook from '../Assets/Image/facebook.svg';
import Google from '../Assets/Image/google.svg';
import Apple from '../Assets/Image/apple.JPG';
import loadingGif from '../Assets/Image/gif/loading-arrow.gif';
import FormField from './FormField';
import {BreathContext} from '../context';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

//import SocialButton from './SocialButton';

class Login extends Component {
    static contextType = BreathContext;
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
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    login = (e) => {
        e.preventDefault();
        if(this.state.username && this.state.password){
            let proxyurl = "https://quiet-retreat-79741.herokuapp.com/";
            let BaseUrl = 'https://www.breathconductor.com/api_v1/auth/login';

            var myHeaders = new Headers();
            myHeaders.append("device-id", "1");
            myHeaders.append("timezone", "UTC");
            myHeaders.append("device-type", "1");
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            var urlencoded = new URLSearchParams();
            urlencoded.append("username", `${this.state.username}`);
            urlencoded.append("password", `${this.state.password}`);
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
                    let errorStatus = responsejson.status === "error" ? true : false;
                    this.setState({
                        message: responsejson.message,
                        error: errorStatus,
                        processing: false
                    });

                    // Get user data from responsejson
                    let userData = responsejson.data.user_details;
                    if(userData){
                        localStorage.setItem('token', userData.auth_token);
                        localStorage.setItem('email', userData.email);
                        localStorage.setItem('username', userData.username);
                        localStorage.setItem('userID', userData.userID);

                        this.setState({
                            redirect: true,
                        });
                    }else{
                        this.setState({
                            message: responsejson.message
                        })
                        //console.log(responsejson.message)
                    }
                })
                .catch((error) => {
                   //return error;
                   console.log(error);
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

    onSubmitSocial = () => {
        this.setState({
            message: "processing your request please wait",
            processing: true
        })
    }

    responseGoogle = (response) => {
        let userData = response.profileObj;
        let oauthToken = response.accessToken;
        if(userData){
            localStorage.setItem('token', oauthToken);
            localStorage.setItem('email', userData.email);
            localStorage.setItem('username', userData.name);
            localStorage.setItem('userID', userData.googleId);
            localStorage.setItem('userPhoto', userData.imageUrl);

            this.setState({
                redirect: true,
            });
        }else{
            this.setState({
                message: "Something went wrong! Please try again",
                processing: false
            })
        }

        //console.log(response);
        //console.log(response.profileObj)
    }

    responseFacebook = (response) => {
        let res = response.status
        if(res !== 'unknown'){
            let userData = response;
            let oauthToken = response.accessToken;

            localStorage.setItem('token', oauthToken);
            localStorage.setItem('email', userData.email);
            localStorage.setItem('username', userData.name);
            localStorage.setItem('userID', userData.userID);
            localStorage.setItem('userPhoto', userData.picture.data.url);

            this.setState({
                redirect: true,
            });
        }else{
            this.setState({
                message: "Something went wrong! Please try again",
                processing: false
            })
        }
        //console.log(response.status)
    }

    // handleSocialLogin = (user) => {
    //     console.log(user)
    // }
    
    // handleSocialLoginFailure = (err) => {
    //     console.error(err)
    // }


    render() {
        if(this.state.redirect){
            return (<Redirect to="/" />)
        }
        if(localStorage.getItem('token')){
            return (<Redirect to="/" />)
        }

        const statusClass = this.state.error !== false ? 'message error' : 'message' || this.state.warning ? "message waring" : "message";

        const {username, password} = this.state;
        return (
            <div className="container login-box">
                <div className="container-inner small">
                    <div className="contents-wrap">
                        <div className="sign-in">
                            <h2 className="title">Sign In to Breath Conductor</h2>
                            <p className="details">Enter your details below</p>
                            <form onSubmit={this.login}>
                                <FormField type="text" placeholder="User Name" name="username"  required={true} onChange={this.handleChange} value={username} icon={Username}/>
                                <FormField type="password" placeholder="Password" name="password" required={true} onChange={this.handleChange} value={password} icon={Password}/>
                                <p className="forget"><Link to="/resetpassword">Forget Your Password?</Link></p>
                                <button className="btn btn-primary"> Sign In</button>
                            </form>
                            { this.state.message !== '' ?
                            <p className={statusClass}>{this.state.processing ? (<img src={loadingGif} alt="Loading gif" />) : ''} {this.state.message}</p> : null}
                        </div>
                        <div className="text-divider">or</div>
                        <div className="social-login">
                            <div className="col-3">
                                <FacebookLogin
                                    appId="1049863315426881"
                                    autoLoad={false}
                                    fields="name,email,picture"
                                    callback={this.responseFacebook}
                                    onClick={this.onSubmitSocial}
                                    render={renderProps => (
                                        <button onClick={renderProps.onClick}><img src={Facebook} alt="Facebook icon"/></button>
                                    )}
                                />
                            </div>
                            <div className="col-3">
                                <GoogleLogin
                                    clientId="156485572267-a0cmv3oqs67g6b47fpf22hr0tgulveeq.apps.googleusercontent.com"
                                    onSuccess={this.responseGoogle}
                                    onFailure={this.responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                    onClick={this.onSubmitSocial}
                                    render={renderProps => (
                                        <button onClick={renderProps.onClick} disabled={renderProps.disabled}><img src={Google} alt="Google icon"/></button>
                                    )}
                                />
                            </div>
                            <div className="col-3">
                                <div className="social-img">
                                    <img src={Apple} alt="Apple icon"/>
                                </div>
                            </div>
                        </div>
                        <p className="signup-text">Don't have an account?<Link to="signup"> <span className="text-primary"> Sign Up </span> </Link></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;