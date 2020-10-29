import React, {Component, Fragment} from 'react';
import Password from '../Assets/Image/password.svg';
import Username from '../Assets/Image/username.svg';
import Facebook from '../Assets/Image/facebook.svg';
import Google from '../Assets/Image/google.svg';
import Apple from '../Assets/Image/apple.JPG';
import {Link} from "react-router-dom";

class Login extends Component {
    render() {
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
                                        <img src={Username}/>
                                        <input type="text" placeholder="User Name"/>
                                    </div>
                                    <div className="form-field">
                                        <img src={Password} />
                                        <input type="password" placeholder="Password"/>
                                    </div>
                                </form>
                                <p className="forget">Forget Your Password?</p>
                                <Link to="/welcome"><button className="btn btn-primary"> Sign In</button></Link>
                            </div>
                            <div className="text-divider">or</div>
                            <div className="social-login">
                                <div className="col-3">
                                    <div className="social-img">
                                        <img src={Facebook}/>
                                    </div>
                                </div><div className="col-3">
                                    <div className="social-img">
                                        <img src={Google}/>
                                    </div>
                                </div><div className="col-3">
                                    <div className="social-img">
                                        <img src={Apple}/>
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