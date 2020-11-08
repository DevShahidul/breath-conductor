import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Username from '../Assets/Image/username.svg';
import loadingGif from '../Assets/Image/gif/loading-arrow.gif';
import FormField from './FormField';

class ResetPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            redirect: false,
            message: '',
            error: false,
            warning: false,
            processing: false,
            success: false
        }
        this.Reset = this.Reset.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    Reset = (e) => {
        e.preventDefault();
        if(this.state.email){
            let proxyurl = "https://cors-anywhere.herokuapp.com/";
            let BaseUrl = "https://www.breathconductor.com/api_v1/auth/resetPassword";

            var myHeaders = new Headers();
            myHeaders.append("device-id", "1");
            myHeaders.append("timezone", "UTC");
            myHeaders.append("device-type", "1");
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            var urlencoded = new URLSearchParams();
            urlencoded.append("email", `${this.state.email}`);
            urlencoded.append("firebase_token", "BD43813E-CFC5-4EEB-ABE2-94562A6E76CA");

            var requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };

            this.setState({
                message: "processing your request please wait",
                processing: true
            })

            fetch(proxyurl + BaseUrl, requestOptions)
                .then((response) => response.text())
                .then((result) => {
                    let statusjson = JSON.parse(result);
                    console.log(statusjson.status)
                    let errorStatus = statusjson.status === "error" ? true : false;
                    this.setState({
                        message: statusjson.message,
                        error: errorStatus,
                        processing: false
                    });
                    if(statusjson.status === "success"){
                        this.setState({
                            success: true
                        })
                    }
                })
                .catch((error) => {
                   return error;
                })
        }else{
            this.setState({
                message: 'Please enter your email!',
                warning: true,
                processing: false,
                success: false
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
        const {email,  error, success, warning, message, processing} = this.state;

        const statusClass = error !== false ? 'message error' : 'message' || warning ? "message waring" : "message" || success ? "message success" : "message";

        return (
            <div className="container login-box">
                <div className="container-inner">
                    <div className="contents-wrap">
                        <div className="sign-in">
                            <h2 className="title">Reset your password</h2>
                            <p className="details">Enter your email below</p>
                            <form onSubmit={this.Reset}>
                                <FormField type="email" placeholder="Email Address" name="email"  required={true} onChange={this.handleChange} value={email} icon={Username}/>
                                <button className="btn btn-primary"> Reset</button>
                            </form>
                            { message !== '' ?
                            <p className={statusClass}>{processing ? (<img src={loadingGif} alt="Loading gif" />) : ''} {message}</p> : null}
                        </div>
                        <p className="signup-text">Don't have an account?<Link to="/signup"> <span className="text-primary"> Sign Up </span> </Link></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default ResetPassword;