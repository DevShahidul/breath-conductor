import React, {Component, Fragment} from 'react';
import { BreathContext } from '../context';
//import { Redirect } from 'react-router-dom';
import {Home, Navigation} from "../Component";

class HomePage extends Component {
    static contextType = BreathContext;

    constructor(props){
        super(props);
        this.state = {
            redirect: false,
        }
    }


    // componentDidMount(){
        
    // }

    render() {
        // const {showWelcome, sowoFeelOption, showTutorial, showReplay, setFeeling, handleOnChangFeel} = this.context;
        
        return ( 
            <Fragment>
                <Navigation/>
                <div className="home-contents container">
                    <Home/>
                    {/* {showWelcome ? <Welcome/> : <Home/> && sowoFeelOption ? <FeelControl feeling={setFeeling} onChangFeel={handleOnChangFeel} /> : <Home/> && showTutorial ? <Tutorial /> : <Home/> && showReplay ? <FeedbackSubmit /> : <Home/> } */}
                </div>
            </Fragment>
        );
    }
}

export default HomePage;