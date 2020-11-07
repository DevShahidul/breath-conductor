import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import Password from '../Assets/Image/password.svg';
import Username from '../Assets/Image/username.svg';
import Facebook from '../Assets/Image/facebook.svg';
import Google from '../Assets/Image/google.svg';
import Apple from '../Assets/Image/apple.JPG';
import loadingGif from '../Assets/Image/gif/loading-arrow.gif';
import FormField from './FormField';
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
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    login = () => {
        if(this.state.username && this.state.password){
            let proxyurl = "https://cors-anywhere.herokuapp.com/";
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
                        sessionStorage.setItem('token', userData.auth_token);
                        sessionStorage.setItem('email', userData.email);
                        sessionStorage.setItem('username', userData.username);
                        sessionStorage.setItem('userID', userData.userID);
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
            return (<Redirect to="/" />)
        }
        if(sessionStorage.getItem('token')){
            return (<Redirect to="/" />)
        }

        const statusClass = this.state.error !== false ? 'message error' : 'message' || this.state.warning ? "message waring" : "message";

        const {username, password} = this.state;
        return (
            <div className="container login-box">
                <div className="container-inner">
                    <div className="sign-in">
                        <h2 className="title">Sign In to Breath Conductor</h2>
                        <p className="details">Enter your details below</p>
                        <form>
                            <FormField type="text" placeholder="User Name" name="username"  required={true} onChange={this.handleChange} value={username} icon={Username}/>
                            <FormField type="password" placeholder="Password" name="password" required={true} onChange={this.handleChange} value={password} icon={Password}/>
                        </form>
                        <p className="forget"><Link to="/resetpassword">Forget Your Password?</Link></p>
                        <button className="btn btn-primary" onClick={() => this.login()}> Sign In</button>
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