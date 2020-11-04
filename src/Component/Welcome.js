import React, {Component} from 'react';
import { BreathContext } from '../context';

class Welcome extends Component {
    static contextType = BreathContext;
    render() {
        const {username, welcomConfirmationMessage, handleConfirmation} = this.context;
        
        //const welcomeContainer = document.getElementsByClassName('welcome-container')
        return (
            <div className="container welcome-container">
                <div className="intro">
                    <h2 className="name-title ">Hey {username},</h2>
                    <p className="welcome-msg">{welcomConfirmationMessage}</p>
                    <button onClick={() => handleConfirmation('Yes')} className="btn btn-primary">Yes</button>
                    <button onClick={() => handleConfirmation('No')} className="btn btn-secondary">No</button>
                </div>
            </div>
        );
    }
}

export default Welcome;