import React, {Component} from 'react';
import { BreathContext } from '../context';
import { PopUp, TaskList } from '../Component';


class Home extends Component {
    static contextType = BreathContext;

    componentDidMount(){
        const { updateComponentFromHome, getGeneralList, checkInfinity, goal } = this.context;
        updateComponentFromHome();
        getGeneralList();
        const timer = setTimeout(() => {
            checkInfinity(goal);
            updateComponentFromHome();
        }, 1050);
        return () => clearTimeout(timer);
        //console.log("I'm loaded from home component")
    }

    render() {
        const {handleHomeStart, handlePopUpAction, handleChange, themeOptions, timeOptions, goalOptions, narrationOptions, theme, goal, time, narration, themePopup,  goalPopup, timePopup, narrationPopup, handleGoalPopUp, handleTimePopUp, handleThemePopUp, handlenarrationPopUp } = this.context;
        
        return (
            <div className="container-inner session-container" onClick={handlePopUpAction}>
                <div className="contents-wrap">
                    <h2 className="session-title ">Session Design</h2>
                    <TaskList title="Goal" contentText={goal} onClick={handleGoalPopUp} />
                    <TaskList title="Time" contentText={time} onClick={handleTimePopUp} />
                    <TaskList title="narration" contentText={narration} onClick={handlenarrationPopUp} />
                    <TaskList title="Theme" contentText={theme} onClick={handleThemePopUp} />
                    
                    {/* Beginning Popup components */}
                    {themePopup ? (
                        <PopUp title="Select theme" selectOptions={themeOptions} optionName={theme} name="theme" handleChange={handleChange} />
                    ) : null}
                    {goalPopup ? (
                        <PopUp title="Select Goal" selectOptions={goalOptions} optionName={goal} name="goal" handleChange={handleChange} />
                    ) : null}
                    {timePopup ? (
                        <PopUp title="Select Time" selectOptions={timeOptions} optionName={time} name="time" handleChange={handleChange} />
                    ) : null}
                    {narrationPopup ? (
                        <PopUp title="Select narration" selectOptions={narrationOptions} optionName={narration} name="narration" handleChange={handleChange} />
                    ) : null}
                    
                    {/* <Link to="/feel"></Link> */}
                    <button onClick={handleHomeStart} className="btn btn-primary">Start</button>
                </div>
            </div>
        );
    }
}

export default Home;