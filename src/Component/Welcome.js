import React, {Component} from 'react';
import { BreathContext } from '../context';

class Welcome extends Component {
    static contextType = BreathContext;
    constructor(props){
        super(props);
        this.state = {
            userName: 'User',
            welcomeText: 'When is the best time for you to practice self-care?'
        }
    }

    componentDidMount(){
        const userName = sessionStorage.getItem('username');
        console.log()
        this.setState({
            userName
        })
    }

    render() {
        const {handleConfirmation} = this.context;
        
        return (
            <div className="intro">
                <h2 className="name-title ">Hey {this.state.userName},</h2>
                <p className="welcome-msg">{this.state.welcomeText}</p>
                <button onClick={() => handleConfirmation('Yes')} className="btn btn-primary">Yes</button>
                <button onClick={() => handleConfirmation('No')} className="btn btn-secondary">No</button>
            </div>
        );
    }
}

export default Welcome;