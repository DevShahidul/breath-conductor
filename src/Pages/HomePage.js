import React, {Component, Fragment} from 'react';
import { BreathContext } from '../context';
//import { Redirect } from 'react-router-dom';
import {Home, Navigation, Welcome, FeelControl, Tutorial, FeedbackSubmit} from "../Component";

class HomePage extends Component {
    static contextType = BreathContext;

    constructor(props){
        super(props);
        this.state = {
            redirect: false,
        }
        //this.logOut = this.logOut.bind(this);
    }


    // componentDidMount(){
    //     const { setDefautStep } = this.context;
    //     setDefautStep()
    // }

    render() {
        const {showWelcome, sowoFeelOption, showTutorial, showReplay, setFeeling, handleOnChangFeel} = this.context;
        // if(this.state.redirect){
        //     return (<Redirect to="/login" />)
        // }
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