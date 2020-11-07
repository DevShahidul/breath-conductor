import React, {Component} from 'react';
import Radio from './Radio';
import { BreathContext } from '../context';
//import {Link} from "react-router-dom";

class Home extends Component {
    static contextType = BreathContext;
    constructor(props){
        super(props);
        this.state = {
            themeOptions: ["Sunrise", "Earth", "Moon"],
            theme: '',
            showPopup: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handlePopUpAction = this.handlePopUpAction.bind(this);
        this.handlePopUp = this.handlePopUp.bind(this);
    }

    // radio onchange function
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            theme: value
        })
    }

    handlePopUp = () => {
        this.setState({
            showPopup: true
        })
    }
    
    // popup button handle function
    handlePopUpAction = (value) => {
        console.log(value);
        this.setState({
            showPopup: false
        })
    }
    render() {
        const {handleHomeStart} = this.context;
        return (
            <div className="container-inner session-container">
                <h2 className="session-title ">Session Design</h2>
                <div className="task-list">
                    <p className="task">Goal</p>
                    <button onClick={this.handlePopUp} className="task-des">Relax</button>
                </div>
                <div className="task-list">
                    <p className="task">Time</p>
                    <button onClick={this.handlePopUp} className="task-des">2 min</button>
                </div>
                <div className="task-list">
                    <p className="task">Narattion</p>
                    <button onClick={this.handlePopUp} className="task-des">Normal</button>
                </div>
                <div className="task-list">
                    <p className="task">Theme</p>
                    <button onClick={this.handlePopUp} className="task-des">Nature</button>
                </div>
                {this.state.showPopup ? (
                    <div className="pop-up">
                        <h4>Select theme</h4>
                        <ul>
                            {this.state.themeOptions.map((option, index) => (
                                <li key={index}>
                                    <Radio className={this.state.theme === option ? 'box checked' : 'box'} name="theme" value={option} checked={this.state.theme === option} onChange={this.handleChange} lableText={option} />
                                </li>
                            ))}
                        </ul>
                        <div className="button-row">
                            <button onClick={() => this.handlePopUpAction('Cencel')}>Cencel</button>
                            <button onClick={() => this.handlePopUpAction('Done')}>Done</button>
                        </div>
                    </div>
                ) : null}
                
                {/* <Link to="/feel"></Link> */}
                <button onClick={handleHomeStart} className="btn btn-primary">Start</button>
            </div>
        );
    }
}

export default Home;