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
import AppleLogin from 'react-apple-login'

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
            //let proxyurl = "https://quiet-retreat-79741.herokuapp.com/";
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

            fetch(BaseUrl, requestOptions)
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
                    let profilePicture = userData.profile_picture
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

    // onSubmitSocial = () => {
    //     this.setState({
    //         message: "processing your request please wait",
    //         processing: true
    //     })
    // }

    // Google signup
    responseGoogle = (response) => {
        let userData = response.profileObj;
        if(userData){
            this.checkSocialLogin(userData.email, userData.googleId, 1, userData.imageUrl)
        }
        // else{
        //     this.setState({
        //         message: "Something went wrong! Please try again",
        //         processing: false
        //     })
        // }

        console.log(response);
    }

    // Facebook signup
    responseFacebook = (response) => {
        let res = response.status
        if(res !== 'unknown'){
            let userData = response;
            this.checkSocialLogin(userData.email, userData.userID, 2, userData.picture.data.url)
        }
        // else{
        //     this.setState({
        //         message: "Something went wrong in facebook! Please try again",
        //         processing: false
        //     })
        // }

        console.log(response)
    }

    responseApple = (response) =>{
        console.log(response)
    }

    checkSocialLogin = (email, userID, social_type, picture) => {
        //let proxyurl = "https://quiet-retreat-79741.herokuapp.com/";
        let BaseUrl = "https://www.breathconductor.com/api/v1/auth/check-social-signup";
        
        var myHeaders = new Headers();
        myHeaders.append("device-id", "1");
        myHeaders.append("timezone", "UTC");
        myHeaders.append("device-type", "1");

        var formdata = new FormData();
        formdata.append("email", email);
        formdata.append("social_id", userID);
        formdata.append("social_type", social_type);
        formdata.append("firebase_token", "BD43813E-CFC5-4EEB-ABE2-94562A6E76CA");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        this.setState({
            message: "processing your request please wait",
            processing: true
        })

        fetch(BaseUrl, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)

            let userData = result.data.user_details;
            let socialStatus = result.data.social_status;
            let status = result.status === "error" ? true : false;
            this.setState({
                message: result.message,
                error: status,
                processing: false
            });

            // Get user data from result
            if(socialStatus === 1){
                localStorage.setItem('token', userData.auth_token);
                localStorage.setItem('email', userData.email);
                localStorage.setItem('username', userData.username);
                localStorage.setItem('userID', userData.userID);
                localStorage.setItem('userPhoto', picture);

                this.setState({
                    redirect: true,
                });
            }else{
                this.setState({
                    message: result.message
                })
                //console.log(result.message)
            }
        })
        .catch(error => console.log('error', error));
    }


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
                                    appId="1583199195220849"
                                    autoLoad={false}
                                    fields="name,email,picture"
                                    callback={this.responseFacebook}
                                    //onClick={this.onSubmitSocial}
                                    render={renderProps => (
                                        <button onClick={renderProps.onClick}><img src={Facebook} alt="Facebook icon"/></button>
                                    )}
                                />
                            </div>
                            <div className="col-3">
                                <GoogleLogin
                                    clientId="734812129749-kt8ftk80pfu6rm0tjprmoo5ponhctjm4.apps.googleusercontent.com"
                                    onSuccess={this.responseGoogle}
                                    onFailure={this.responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                    disabled={false}
                                    //onClick={this.onSubmitSocial}
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
                        <p className="signup-text">Don't have an account?<Link to="signup"> <span className="text-primary"> Sign Up </span> </Link></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;