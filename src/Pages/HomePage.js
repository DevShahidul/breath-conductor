import React, {Component, Fragment} from 'react';
import { BreathContext } from '../context';
import {Home, Navigation, Welcome, FeelControl, Tutorial, FeedbackSubmit} from "../Component";

class HomePage extends Component {
    static contextType = BreathContext;

    render() {
        const {showWelcome, sowoFeelOption, showTutorial, showReplay, setFeeling, handleOnChangFeel} = this.context;
        
        return ( 
            <Fragment>
                <Navigation/>
                <div className="home-contents container">
                    {showWelcome ? <Welcome/> : <Home/> && sowoFeelOption ? <FeelControl feeling={setFeeling} onChangFeel={handleOnChangFeel} /> : <Home/> && showTutorial ? <Tutorial /> : <Home/> && showReplay ? <FeedbackSubmit /> : <Home/> }
                </div>
            </Fragment>
        );
    }
}

export default HomePage;