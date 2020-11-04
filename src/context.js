import React, { Component, createContext } from 'react';
//import axios from 'axios';

const BreathContext = createContext();

class BreathProvider extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            welcomConfirmationMessage: 'When is the best time for you to practice self-care?',
            reminders: false
        }
        this.handleConfirmation = this.handleConfirmation.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    // componentDidMount(){
    //     axios.get('user').then(
    //         res => {
    //         console.log(res)
    //     },
    //     err => {
    //         console.log(err)
    //     })
    // }


    // handle confirmation for welcome screen
    handleConfirmation = (status) => {
        let setRemainder = status === "Yes" ? true : false;
        //console.log(status);
        this.setState({
            reminders: setRemainder
        })
    }

    logOut = () => {
        sessionStorage.clear();
        this.setState({redirect: true})
    }


    render() {
        return (
            <BreathContext.Provider value={{
                ...this.state,
                handleConfirmation: this.handleConfirmation,
                logOut: this.logOut
            }}>
                {this.props.children}
            </BreathContext.Provider>
        )
    }
}

const BreathConsumer = BreathContext.Consumer;

export { BreathContext, BreathProvider, BreathConsumer };
