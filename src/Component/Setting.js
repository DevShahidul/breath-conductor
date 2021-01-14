import React, {Component, Fragment} from 'react';
import {Link, Redirect} from "react-router-dom";
import ShareIcon from "../Assets/Image/share.svg";
import facebookIcon from "../Assets/Image/facebookIcon.svg";
import InstagramIcon from "../Assets/Image/instagram.svg";
import YoutubeIcon from "../Assets/Image/youtube.svg";
import TiktokIcon from "../Assets/Image/tik-tok.svg";
import Button from './Button';
import { FormField } from '../Component';
import { BreathContext } from '../context';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

// import { Facebook, Twitter} from 'react-sharingbuttons';
// import 'react-sharingbuttons/dist/main.css';
import { confirmAlert } from 'react-confirm-alert'; // Import confirm alert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


class Setting extends Component {
    static contextType  = BreathContext;
    constructor(props){
        super(props);
        this.state = {
            userName: 'user',
            passWord: '123456478',
            email: 'email@mail.com',
            location: '',
            appUrl: 'https://testflight.apple.com/join/6Z0SCMS2',
            acountDelete: false,
            confirmPassword: '',
            error: false,
            warning: false,
            redirect: false,
            message: '',
        }
        this.handleSave = this.handleSave.bind(this);
        this.handleInputField = this.handleInputField.bind(this);
        this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
        this.deletUserAccount = this.deletUserAccount.bind(this);
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

        var location = window.location.href
        this.setState({
            location:location
        })
        console.log(location);
    }

    handleInputField = (e) => {
        const value = e.target.value;
        this.setState({
            [e.target.name] : value,
            error: false,
            warning: false,
            message: '',
        })
    }

    handleSave = (e) => {
        e.preventDefault();
        console.log("I'm working from setting");
    }

    handleDeleteAccount = () => {
        //prompt('Are you sure want to delet your account?')
        this.setState({
            acountDelete: true,
            //confirmPassword: ''
        })
    }

    // Handle calcel delete account
    handleCancelDelete = () => {
        this.setState({
            acountDelete: false,
            confirmPassword: '',
            message: ''

        })
    }

    onConfirm = () => {
        alert(" You've successfully deleted your account");
    }

    onCancel = () => {
        this.setState({
            acountDelete: false
        })
    }


    // Handle delet account
    deletUserAccount = (e) => {
        e.preventDefault();
        let { confirmPassword } = this.state;
        let token = localStorage.getItem('token');
        let userId = localStorage.getItem('userID');

        if(confirmPassword){

            let proxyurl = "https://quiet-retreat-79741.herokuapp.com/";
            let fetchurl = `https://www.breathconductor.com/api_v1/user/deleteAccount?user_id=${userId}&password=${confirmPassword}`;

            // Header 
            var myHeaders = new Headers();
            myHeaders.append("device-id", "1");
            myHeaders.append("timezone", "UTC");
            myHeaders.append("device-type", "1");
            myHeaders.append("Authorization", `Bearer ${token}`);

            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(proxyurl + fetchurl, requestOptions)
            .then(response => response.text())
            .then(result => {
                let resultjson = JSON.parse(result)
                let errorStatus = resultjson.status === "error" ? true : false;
                let success = resultjson.status === "success";
                console.log(resultjson.message)
                this.setState({
                    confirmPassword: '',
                    message: resultjson.message,
                    error: errorStatus,
                    //processing: false
                });

                if(success){
                    localStorage.clear();
                    this.setState({
                        acountDelete: true,
                        confirmPassword: '',
                        redirect: true
                    })
                    alert(resultjson.message)
                }
            })
            .catch(error => console.log('error', error));
        }else{
            this.setState({
                message: "Please enter your password!",
                warning: true
            })
        }

        console.log(" I'm clicked");
    }


    // Clear history
    clearHistory = () => {

        let token = localStorage.getItem('token');
        let userId = localStorage.getItem('userID');

        if(token){
            let proxyurl = "https://quiet-retreat-79741.herokuapp.com/";
            let clearHistoryUrl = "https://www.breathconductor.com/api_v1/library/exerciseHistoryClear";

            var myHeaders = new Headers();
            myHeaders.append("userID", userId);
            myHeaders.append("device-id", "1");
            myHeaders.append("timezone", "UTC");
            myHeaders.append("device-type", "1");
            myHeaders.append("Authorization", `Bearer ${token}`);

            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(proxyurl + clearHistoryUrl, requestOptions)
            .then(response => response.text())
            .then(result => {
                const datajson = JSON.parse(result);
                const status = datajson.data.data_found;
                //const historyData = datajson.data.exercise_history_list;
                this.setState({
                    deleteMessage: "Request processing"
                })

                alert(datajson.message);
                if(status){

                    this.setHistoryContents([]);
                    this.setState({
                        HistoryContents: [],
                        deleteMessage: datajson.message
                    });
                }else{
                    this.setState({
                        isHistory: false
                    })
                }
            })
            .catch(error => console.log('error', error));
        }
    }

    // On Clear history
    onClearHistory = () => {
        confirmAlert({
            title: 'Alert',
            message: 'Are you sure you want to clear all history?',
            buttons: [
                { label: 'Yes', onClick: () => {
                    this.clearHistory()
                }},
                { label: 'No', onClick: () => {
                    console.log("Your request canceled")
                }}
            ]
        });
    }


    render() {
        if(this.state.redirect){
            return (<Redirect to="/" />)
        }
        const { handleShareModal, modalShown, closeProfileDropdown } = this.context;
        const {userName, passWord, email, appUrl, confirmPassword, acountDelete, message, error, warning} = this.state;
        const shareText = "Let's try! ";

        const statusClass = error !== false ? 'message error' : 'message' || warning ? "message waring" : "message";
        
        return (
            <Fragment>
                <div className="container" onClick={closeProfileDropdown}>
                    <div className="setting-inner large">
                        <h2 className="section-title">Settings</h2>
                        <div className="setting-container">
                            <div className="row">
                                <div className="col-2 right-border">
                                    <div className="account">
                                        <h2 className="title">Account</h2>
                                        <form onSubmit={this.handleSave}>
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
                                            {modalShown ? 
                                                <div className="share-modal">
                                                    <div className="share-modal-inner">
                                                        <button onClick={() => handleShareModal()} className="modal-close"></button>
                                                        <div>
                                                            <h3>Please share your result!</h3>
                                                            <div className="share-buttons-row">
                                                                <FacebookShareButton url={appUrl}>
                                                                    <FacebookIcon />
                                                                    <span>Facebook</span>
                                                                </FacebookShareButton>
                                                                <TwitterShareButton url={appUrl} title={shareText}>
                                                                    <TwitterIcon />
                                                                    <span>Twitter</span>
                                                                </TwitterShareButton>
                                                                <LinkedinShareButton url={appUrl} title={shareText}>
                                                                    <LinkedinIcon />
                                                                    <span>Linkedin</span>
                                                                </LinkedinShareButton>
                                                                <WhatsappShareButton url={appUrl} title={shareText}>
                                                                    <WhatsappIcon />
                                                                    <span>Whatsapp</span>
                                                                </WhatsappShareButton>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> : 
                                            null }
                                            <div className="social" onClick={() => handleShareModal()}>
                                                <img src={ShareIcon} alt="Share icon"/>
                                                <p>Share</p>
                                            </div>
                                            <div className="social">
                                                <img src={facebookIcon} alt="Facebook icon"/>
                                                <Link to="//www.facebook.com/BreathConductr" rel="noreferrer" target="_blank"> <p>Facebook</p></Link>
                                            </div>
                                            <div className="social">
                                                <img src={InstagramIcon} alt="Instagram icon"/>
                                                <Link to="//www.instagram.com/breathconductor/" rel="noreferrer" target="_blank"><p>Instagram</p></Link>
                                            </div>
                                            <div className="social">
                                                <img src={YoutubeIcon} alt="Youtube icon"/>
                                                <Link to="//www.youtube.com/channel/UC6___6bu16g5OILS04WzYdw" rel="noreferrer" target="_blank"><p>Youtube</p></Link>
                                            </div>
                                            <div className="social">
                                                <img src={TiktokIcon} alt="Tiktok icon"/>
                                                <Link to="//www.tiktok.com/@breathconductor" rel="noreferrer" target="_blank"><p>TikTok</p></Link>
                                            </div>
                                        </div>
                                        <div className="mydata">
                                            <h2 className="title">My Data</h2>
                                            <div className="mydata-btn">
                                                <Button onClick={this.onClearHistory} type="primary-outline" text="Clear History" />
                                                <Button type="danger" text="Delete Account" onClick={this.handleDeleteAccount}/>
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
                            {acountDelete ?
                                <div className="modalContainer">
                                    <div className="modal-inner">
                                        <div className="modal-content">
                                            <h4>Are you sure you want to delete your account?</h4>
                                            <form  onSubmit={this.deletUserAccount}>
                                                <FormField type="password" label="Enter your password" placeholder="Password Address" name="confirmPassword" onChange={this.handleInputField} value={confirmPassword}/>
                                                {message !== '' ? <p className={statusClass}>{message}</p> : null }
                                                <button type="submit" className="btn primary">Done</button>
                                            </form>
                                            <button className="btn primary" onClick={this.handleCancelDelete}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            : null}   
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Setting;