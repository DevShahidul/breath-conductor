import React, { Component } from 'react'
import { BreathContext } from '../context';
import BackIcon from "../Assets/Image/back.svg";

export default class Feedback extends Component {
    static contextType = BreathContext;
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         textarea: '',
    //         errorMessage: '',
    //     }
    // }

    // onChangeMessage = (e) => {
    //     let value = e.target.value;
    //     this.setState({
    //         textarea: value
    //     })
    // }

    
    render() {
        const { submitFeedbackMessage, handleMessageOnChange, closeFeedbackMessage, exerciseTitle, feedbackMessage, errorMessage, error, warning } = this.context;
        const statusClass = error !== false ? 'message error' : 'message' || warning ? "message waring" : "message";
        return (
            <div className="feedbackInner feedback-wrap">
                <div className="actionRow">
                    <button onClick={closeFeedbackMessage}><img src={BackIcon} alt="Back arrow"/></button>
                </div>
                <div className="controlWrap">
                    <div className="container-inner feel-control">
                        <div className="contents-wrap">
                            <h2 className="session-title">How was the session <br /> <span>{exerciseTitle ? exerciseTitle : null}</span> for you?</h2>
                            <form onSubmit={submitFeedbackMessage}>
                                <textarea className="text-area" name="textarea" onChange={handleMessageOnChange} value={feedbackMessage} placeholder="How can we improve the experience for you?"></textarea>
                                {errorMessage !== '' ? <p className={statusClass}>{errorMessage}</p> : null}
                                <button className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
