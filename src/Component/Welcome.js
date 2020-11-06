import React, {Component} from 'react';
import { BreathContext } from '../context';

class Welcome extends Component {
    static contextType = BreathContext;
    render() {
        const {userName, welcomConfirmationMessage, handleConfirmation} = this.context;
        return (
            <div className="intro">
                <h2 className="name-title ">Hey {userName},</h2>
                <p className="welcome-msg">{welcomConfirmationMessage}</p>
                <button onClick={() => handleConfirmation('Yes')} className="btn btn-primary">Yes</button>
                <button onClick={() => handleConfirmation('No')} className="btn btn-secondary">No</button>
            </div>
        );
    }
}

export default Welcome;