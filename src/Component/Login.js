import React, {Component, Fragment} from 'react';
import Password from '../Assets/Image/password.svg';
import Username from '../Assets/Image/username.svg';
import Facebook from '../Assets/Image/facebook.svg';
import Google from '../Assets/Image/google.svg';
import Apple from '../Assets/Image/apple.JPG';
import {Link} from "react-router-dom";
import { Redirect } from 'react-router-dom';
//import { PostData } from '../services/PostData';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: false
        }
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    login = () =>{
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

            fetch(proxyurl + BaseUrl, requestOptions)
                .then((response) => response.json())
                .then((responsejson) => {
                    let userData = responsejson.data.user_details;
                    if(userData){
                        sessionStorage.setItem('user_details', responsejson.data )
                        this.setState({redirect: true})
                    }else{
                        console.log(responsejson.message)
                    }
                })
                .catch((error) => {
                   return error;
                })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
        //console.log("coming here")
    }


    render() {
        if(this.state.redirect){
            return (<Redirect to="/welcome" />)
        }
        if(sessionStorage.getItem('user_details')){
            return (<Redirect to="/welcome" />)
        }
        return (
            <Fragment>
                <div className="container login-box">
                    <div className="row">
                        <div className="col">
                            <div className="sign-in">
                                <h2 className="title">Sign In to Breath Conductor</h2>
                                <p className="details">Enter your details below</p>
                                <form>
                                    <div className="form-field">
                                        <img src={Username} alt="User icon"/>
                                        <input type="text" name="username" placeholder="User Name" onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-field">
                                        <img src={Password} alt="Password icon"/>
                                        <input type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
                                    </div>
                                </form>
                                <p className="forget">Forget Your Password?</p>
                                <button className="btn btn-primary" onClick={() => this.login()}> Sign In</button>
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
                </div>
            </Fragment>
        );
    }
}

export default Login;