import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import ShareIcon from "../Assets/Image/share.svg";
import FacebookIcon from "../Assets/Image/facebookIcon.svg";
import InstagramIcon from "../Assets/Image/instagram.svg";
import YoutubeIcon from "../Assets/Image/youtube.svg";
import TiktokIcon from "../Assets/Image/tik-tok.svg";
import Button from './Button';
import { FormField } from '../Component';
import { BreathContext } from '../context';


class Setting extends Component {
    static contextType  = BreathContext;
    constructor(props){
        super(props);
        this.state = {
            userName: 'user',
            passWord: '123456478',
            email: 'email@mail.com'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputField = this.handleInputField.bind(this);
    }

    componentDidMount(){
        let token = localStorage.getItem('token');
        let userName = localStorage.getItem('username');
        let email = localStorage.getItem('email');
        if(token){
            this.setState({
                userName,
                email,
            })
        }
    }

    handleInputField = (e) => {
        const value = e.target.value;
        this.setState({
            [e.target.name] : value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("I'm working from fo");
    }


    render() {
        const { clearHistory } = this.context;
        const {userName, passWord, email} = this.state;
        return (
            <Fragment>
                <div className="container">
                    <div className="setting-inner large">
                        <h2 className="section-title">Settings</h2>
                        <div className="setting-container">
                            <div className="row">
                                <div className="col-2 right-border">
                                    <div className="account">
                                        <h2 className="title">Account</h2>
                                        <form onSubmit={this.handleSubmit}>
                                            <FormField type="text" label="User Name" placeholder="User Name" name="userName" onChange={this.handleInputField} value={userName}/>
                                            <FormField type="email" label="Email Address" placeholder="Email Address" name="email" onChange={this.handleInputField} value={email}/>
                                            <FormField type="password" label="Password" placeholder="Password Address" name="passWord" onChange={this.handleInputField} value={passWord}/>
                                            <button className="btn primary">Save</button>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="community">
                                        <div className="social-section">
                                            <h2 className="title">Community</h2>
                                            <div className="social">
                                                <img src={ShareIcon} alt="Share icon"/>
                                                <p>Share</p>
                                            </div>
                                            <div className="social">
                                                <img src={FacebookIcon} alt="Facebook icon"/>
                                                <Link to="http://facebook.com/dennis_vladobinov"> <p>dennis_vladobinov</p></Link>
                                            </div>
                                            <div className="social">
                                                <img src={InstagramIcon} alt="Instagram icon"/>
                                                <Link to="https://www.instagram.com/dennis_vladobinov/"><p>dennis_vladobinov</p></Link>
                                            </div>
                                            <div className="social">
                                                <img src={YoutubeIcon} alt="Youtube icon"/>
                                                <Link to="https://youtube.com/dennis_vladobinov"><p>https://youtube.com/dennis_vladobinov</p></Link>
                                            </div>
                                            <div className="social">
                                                <img src={TiktokIcon} alt="Tiktok icon"/>
                                                <Link to="https://www.tiktok.com/dennis_vladobinov"><p>dennis_vladobinov</p></Link>
                                            </div>
                                        </div>
                                        <div className="mydata">
                                            <h2 className="title">My Data</h2>
                                            <div className="mydata-btn">
                                                <Button onClick={clearHistory} type="primary-outline" text="Clear History" />
                                                <Button type="danger" text="Delet Account" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row help-links">
                                <div className="col-2">
                                    <Link to="/terms" className="terms">Terms of Use</Link>
                                </div>
                                <div className="col-2">
                                    <Link to="/support" className="support">Support</Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Setting;