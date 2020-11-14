import React, {Component, Fragment} from 'react';
import { BreathContext } from '../context';
import {Home, Navigation, Welcome, FeelControl, Tutorial, FeedbackSubmit} from "../Component";

class HomePage extends Component {
    static contextType = BreathContext;

    render() {
        const {showWelcome, sowoFeelOption, showTutorial, showReplay, closeProfileDropdown} = this.context;
        
        return ( 
            <Fragment>
                <Navigation/>
                <div className="home-contents container" onClick={closeProfileDropdown}>
                    {showWelcome ? <Welcome/> : <Home/> && sowoFeelOption ? <FeelControl /> : <Home/> && showTutorial ? <Tutorial /> : <Home/> && showReplay ? <FeedbackSubmit /> : <Home/> }
                </div>
            </Fragment>
        );
    }
}

export default HomePage;