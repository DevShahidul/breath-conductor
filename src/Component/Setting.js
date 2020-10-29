import React, {Component, Fragment} from 'react';
import Username from "../Assets/Image/username.svg";
import Password from "../Assets/Image/password.svg";
import {Link} from "react-router-dom";
import Phone from "../Assets/Image/phone number.svg";
import ShareIcon from "../Assets/Image/share.svg";
import FacebookIcon from "../Assets/Image/facebookIcon.svg";
import InstagramIcon from "../Assets/Image/instagram.svg";
import YoutubeIcon from "../Assets/Image/youtube.svg";
import TiktokIcon from "../Assets/Image/tik-tok.svg";
import DelectIcon from "../Assets/Image/delete account.svg";
import ClearHistory from "../Assets/Image/clear history.svg";



class Setting extends Component {
    render() {
        return (
            <Fragment>
                <div className="setting">
                    <h2 className="section-title">Settings</h2>
                    <div className="setting-container">
                        <div className="row">
                            <div className="col-2 right-border">
                                <div className="account">
                                    <h2 className="title">Account</h2>
                                    <form>
                                        <p>User Name</p>
                                        <div className="form-field">
                                            <div className="form-icon">
                                                <img src={Username}/>
                                            </div>
                                            <input type="text" placeholder="User Name"/>
                                        </div>
                                        <p>Email Address</p>
                                        <div className="form-field">
                                            <div className="form-icon">
                                                <img src={Username}/>
                                            </div>
                                            <input type="email" placeholder="Email Address"/>
                                        </div>
                                        <p>Password</p>
                                        <div className="form-field">
                                            <div className="form-icon">
                                                <img src={Password} />
                                            </div>
                                            <input type="password" placeholder="Password"/>
                                        </div>
                                    </form>
                                    <Link to="/welcome"><button className="btn btn-primary">Save</button></Link>
                                </div>

                            </div>
                            <div className="col-2">
                                <div className="community">
                                    <div className="social-section">
                                        <h2 className="title">Community</h2>
                                        <div className="social">
                                            <img src={ShareIcon}/>
                                            <p>Share</p>
                                        </div>
                                        <div className="social">
                                            <img src={FacebookIcon}/>
                                            <p>dennis_vladobinov</p>
                                        </div>
                                        <div className="social">
                                            <img src={InstagramIcon}/>
                                            <p>dennis_vladobinov</p>
                                        </div>
                                        <div className="social">
                                            <img src={YoutubeIcon}/>
                                            <p>https://youtube.com/dennis_vladobinov</p>
                                        </div>
                                        <div className="social">
                                            <img src={TiktokIcon}/>
                                            <p>dennis_vladobinov</p>
                                        </div>
                                    </div>
                                    <div className="mydata">
                                        <h2 className="title">My Data</h2>
                                            <div className="mydata-btn">
                                                <img src={ClearHistory}/>
                                                <img src={DelectIcon}/>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                    <p className="terms">Terms of Use</p>
                            </div>
                            <div className="col-2">
                                <p className="support">Support</p>
                            </div>
                        </div>

                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Setting;