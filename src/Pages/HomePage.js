import React, {Component, Fragment} from 'react';
import { BreathContext } from '../context';
//import axios from 'axios';
import { Redirect } from 'react-router-dom';
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


    componentDidMount(){
        if(sessionStorage.getItem('user_details')){
            console.log('call user feed')
        }else{
            this.setState({redirect: true})
        }

        // var config = {
        //     headers: { 
        //         Authorization: 'Bearer ' + localStorage.getItem('token'),
        //     }
        // };

        // axios.get('user', config).then(
        //     res => {
        //     console.log(res)
        // },
        // err => {
        //     console.log(err)
        // })
    }

    render() {
        const {showWelcome, sowoFeelOption, showTutorial, showReplay, setFeeling, handleOnChangFeel} = this.context;
        if(this.state.redirect){
            return (<Redirect to="/login" />)
        }
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