import React, {Component} from 'react';
import { BreathContext } from '../context';
import { PopUp } from '../Component';
//import {Link} from "react-router-dom";

class Home extends Component {
    static contextType = BreathContext;
    constructor(props){
        super(props);
        this.state = {
            themeOptions: ["Sunrise", "Earth", "Moon"],
            theme: '',
            themePopup: false,
            goalOptions: ["Relax"],
            goal: '',
            goalPopup: false,
            timeOptions: ["-1 min", "1 min", "2 min"],
            time: '',
            timePopup: false,
            narattionOptions: ["None", "Full"],
            narattion: '',
            narattionPopup: false,
        }
        this.handleChange = this.handleChange.bind(this); // Handle radio onChange
        this.handleThemePopUpAction = this.handleThemePopUpAction.bind(this); // Theme action handle
        this.handleTimePopUpAction = this.handleTimePopUpAction.bind(this); // Time action handle
        this.handleGoalPopUpAction = this.handleGoalPopUpAction.bind(this); // Goal action handle
        this.handleNarattionPopUpAction = this.handleNarattionPopUpAction.bind(this); // Narattion action handle
        this.handleThemePopUp = this.handleThemePopUp.bind(this); // Theme popup hanle
        this.handleTimePopUp = this.handleTimePopUp.bind(this); // Time popup hanle
        this.handleGoalPopUp = this.handleGoalPopUp.bind(this); // Goal popup hanle
        this.handleNarattionPopUp = this.handleNarattionPopUp.bind(this); // Naration popup handle
    }

    // radio onchange function
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            [e.target.name]: value
        })
    }
    
    // Handle theme popup show
    handleThemePopUp = () => {
        this.setState({
            themePopup: true
        });
    }

    // Handle time popup show
    handleTimePopUp = () => {
        this.setState({
            timePopup: true
        });
    }

    // Handle time popup show
    handleNarattionPopUp = () => {
        this.setState({
            narattionPopup: true
        });
    }

    // Handle time popup show
    handleGoalPopUp = () => {
        this.setState({
            goalPopup: true
        });
    }
    
    // handle theme option 
    handleThemePopUpAction = (value) => {
        if(value === "Cancel"){
            this.setState({
                theme: '',
                themePopup: false
            })
        }else{
            this.setState({
                themePopup: false
            })
        }
    }
    
    // handle theme option 
    handleNarattionPopUpAction = (value) => {
        if(value === "Cancel"){
            this.setState({
                narattion: '',
                narattionPopup: false
            })
        }else{
            this.setState({
                narattionPopup: false
            })
        }
    }
    
    // handle time option 
    handleTimePopUpAction = (value) => {
        if(value === "Cancel"){
            this.setState({
                time: '',
                timePopup: false
            })
        }else{
            this.setState({
                timePopup: false
            })
        }
    }
    
    // handle theme option 
    handleGoalPopUpAction = (value) => {
        if(value === "Cancel"){
            this.setState({
                goal: '',
                goalPopup: false
            })
        }else{
            this.setState({
                goalPopup: false
            })
        }
    }
    
    render() {
        const {handleHomeStart} = this.context;
        const { themePopup, themeOptions, theme, goalPopup, goalOptions, goal, timePopup, timeOptions, time, narattionPopup, narattionOptions, narattion } = this.state;
        return (
            <div className="container-inner session-container">
                <div className="contents-wrap">
                    <h2 className="session-title ">Session Design</h2>
                    <div className="task-list">
                        <p className="task">Goal</p>
                        <button onClick={this.handleGoalPopUp} className="task-des">Relax</button>
                    </div>
                    <div className="task-list">
                        <p className="task">Time</p>
                        <button onClick={this.handleTimePopUp} className="task-des">2 min</button>
                    </div>
                    <div className="task-list">
                        <p className="task">Narattion</p>
                        <button onClick={this.handleNarattionPopUp} className="task-des">Normal</button>
                    </div>
                    <div className="task-list">
                        <p className="task">Theme</p>
                        <button onClick={this.handleThemePopUp} className="task-des">Nature</button>
                    </div>
                    {themePopup ? (
                        <PopUp title="Select theme" selectOptions={themeOptions} optionName={theme} name="theme" handleChange={this.handleChange} handlePopUpAction={this.handleThemePopUpAction} />
                    ) : null}
                    {goalPopup ? (
                        <PopUp title="Select theme" selectOptions={goalOptions} optionName={goal} name="goal" handleChange={this.handleChange} handlePopUpAction={this.handleGoalPopUpAction} />
                    ) : null}
                    {timePopup ? (
                        <PopUp title="Select theme" selectOptions={timeOptions} optionName={time} name="time" handleChange={this.handleChange} handlePopUpAction={this.handleTimePopUpAction} />
                    ) : null}
                    {narattionPopup ? (
                        <PopUp title="Select theme" selectOptions={narattionOptions} optionName={narattion} name="narattion" handleChange={this.handleChange} handlePopUpAction={this.handleNarattionPopUpAction} />
                    ) : null}
                    
                    {/* <Link to="/feel"></Link> */}
                    <button onClick={handleHomeStart} className="btn btn-primary">Start</button>
                </div>
            </div>
        );
    }
}

export default Home;