import React, {Component} from 'react';
import { BreathContext } from '../context';
import { PopUp, TaskList } from '../Component';


class Home extends Component {
    static contextType = BreathContext;

    render() {
        const {handleHomeStart, handleThemePopUpAction, handleGoalPopUpAction, handleTimePopUpAction, handleNarattionPopUpAction, handleChange, themeOptions, timeOptions, goalOptions, narattionOptions, theme, goal, time, narattion, themePopup,  goalPopup, timePopup, narattionPopup, handleGoalPopUp, handleTimePopUp, handleThemePopUp, handleNarattionPopUp, goalHandleChange } = this.context;
        
        return (
            <div className="container-inner session-container">
                <div className="contents-wrap">
                    <h2 className="session-title ">Session Design</h2>
                    <TaskList title="Goal" contentText={goal} onClick={handleGoalPopUp} />
                    <TaskList title="Time" contentText={time} onClick={handleTimePopUp} />
                    <TaskList title="Narattion" contentText={narattion} onClick={handleNarattionPopUp} />
                    <TaskList title="Theme" contentText={theme} onClick={handleThemePopUp} />
                    
                    {/* Beginning Popup components */}
                    {themePopup ? (
                        <PopUp title="Select theme" selectOptions={themeOptions} optionName={theme} name="theme" handleChange={handleChange} handlePopUpAction={handleThemePopUpAction} />
                    ) : null}
                    {goalPopup ? (
                        <PopUp title="Select theme" selectOptions={goalOptions} optionName={goal} name="goal" handleChange={() => goalHandleChange()} handlePopUpAction={handleGoalPopUpAction} />
                    ) : null}
                    {timePopup ? (
                        <PopUp title="Select theme" selectOptions={timeOptions} optionName={time} name="time" handleChange={handleChange} handlePopUpAction={handleTimePopUpAction} />
                    ) : null}
                    {narattionPopup ? (
                        <PopUp title="Select theme" selectOptions={narattionOptions} optionName={narattion} name="narattion" handleChange={handleChange} handlePopUpAction={handleNarattionPopUpAction} />
                    ) : null}
                    
                    {/* <Link to="/feel"></Link> */}
                    <button onClick={handleHomeStart} className="btn btn-primary">Start</button>
                </div>
            </div>
        );
    }
}

export default Home;