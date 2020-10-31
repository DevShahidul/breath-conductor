import React, {Component, Fragment} from 'react';
import Password from '../Assets/Image/password.svg';
import ConfirmPassword from '../Assets/Image/confirm password.svg';
import Username from '../Assets/Image/username.svg';
import Phone from '../Assets/Image/phone number.svg';
import Facebook from '../Assets/Image/facebook.svg';
import Google from '../Assets/Image/google.svg';
import Apple from '../Assets/Image/apple.JPG';
import {Link} from "react-router-dom";

class Signup extends Component {
    render() {
        return (
            <Fragment>
                <div className="container login-box">
                    <div className="row">
                        <div className="col-1">
                            <div className="sign-in sign-up">
                                <h2 className="title">Sign Up to Breath Conductor</h2>
                                <p className="details">Enter your details below</p>
                                <form>
                                    <div className="form-field">
                                        <div className="form-icon">
                                            <img src={Username} alt="User icon"/>
                                        </div>
                                        <input type="text" placeholder="User Name"/>
                                    </div>
                                    <div className="form-field">
                                        <div className="form-icon">
                                            <img src={Username} alt="User icon"/>
                                        </div>
                                        <input type="email" placeholder="Email Address"/>
                                    </div>
                                    <div className="form-field">
                                        <div className="form-icon">
                                            <img src={Phone} alt="Phone icon"/>
                                        </div>
                                        <input type="email" placeholder="Phone Number"/>
                                    </div>
                                    <div className="form-field">
                                        <div className="form-icon">
                                            <img src={Password} alt="Password icon"/>
                                        </div>
                                        <input type="password" placeholder="Password"/>
                                    </div>
                                    <div className="form-field">
                                        <div className="form-icon">
                                            <img src={ConfirmPassword} alt="Password icon"/>
                                        </div>
                                        <input type="password" placeholder="Confirm Password"/>
                                    </div>
                                </form>

                                <Link to="/welcome"><button className="btn btn-primary">Sign Up</button></Link>
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
            </Fragment>
        );
    }
}

export default Signup;