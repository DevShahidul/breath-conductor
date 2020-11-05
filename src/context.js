import React, { Component, createContext } from 'react';
//import axios from 'axios';

const BreathContext = createContext();

class BreathProvider extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            welcomConfirmationMessage: 'When is the best time for you to practice self-care?',
            reminders: false,
            showWelcome: true,
            sowoFeelOption: false,
            showTutorial: false,
            showReplay: false,
            setFeeling: 3,
        }
        this.handleConfirmation = this.handleConfirmation.bind(this);
        this.handleHomeStart = this.handleHomeStart.bind(this);
        this.handleFeelOption = this.handleFeelOption.bind(this);
        this.handleEndVideo = this.handleEndVideo.bind(this);
        this.handleReplayFromFeedback = this.handleReplayFromFeedback.bind(this);
        this.backToPrev = this.backToPrev.bind(this);
        this.logOut = this.logOut.bind(this);
    }


    // handle confirmation for welcome screen
    handleConfirmation = (status) => {
        let setRemainder = status === "Yes" ? true : false;
        //console.log(status);
        this.setState({
            reminders: setRemainder,
            showWelcome: false
        })
    }

    // handle confirmation for welcome screen
    handleHomeStart = () => {
        this.setState({
            sowoFeelOption: true
        })
    }

    // Handle back button on tutorial
    backToPrev = () => {
        this.setState({
            sowoFeelOption: true,
            showTutorial: false
        })
    }

    // handle confirmation for welcome screen
    handleFeelOption = () => {
        this.setState({
            sowoFeelOption: false,
            showTutorial: true
        })
    }


    // Logout function
    logOut = () => {
        sessionStorage.clear();
        this.setState({redirect: true})
    }

    // Handle function after video playing end 
    handleEndVideo = () => {
        this.setState({
            showReplay: true,
            showTutorial: false,
            sowoFeelOption: false,
        })
        console.log("I'm working from videoplayer")
    }


    // Handle replay button from feedback component
    handleReplayFromFeedback = () => {
        this.setState({
            showReplay: false,
            showTutorial: true,
        })
    }

    render() {
        return (
            <BreathContext.Provider value={{
                ...this.state,
                handleConfirmation: this.handleConfirmation,
                handleHomeStart: this.handleHomeStart,
                handleFeelOption: this.handleFeelOption,
                handleEndVideo: this.handleEndVideo,
                handleReplayFromFeedback: this.handleReplayFromFeedback,
                backToPrev: this.backToPrev,
                logOut: this.logOut
            }}>
                {this.props.children}
            </BreathContext.Provider>
        )
    }
}

const BreathConsumer = BreathContext.Consumer;

export { BreathContext, BreathProvider, BreathConsumer };
