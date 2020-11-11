import React, { Component } from 'react'
import {BreathContext} from "../context";
import {Navigation} from "../Component";

class FeelControlPage extends Component {
    static contextType = BreathContext;
    constructor(props){
        super(props);
        this.state = {
            feeling: 3
        }
    }

    render(){
        const {handleFeelOption} = this.context;
        return (
            <>
                <Navigation/>
                <div className="home-contents container">
                    <div className="container-inner feel-control">
                        <div className="contents-wrap">
                            <h2 className="session-title ">How relaxed do you feel?</h2>
                            <div className="radio-items-group">
                                <div className="radio-items">
                                    {[...Array(5)].map((rating, i) => {
                                        console.log(rating)
                                        const ratingValue = i+1;
                                        return (
                                            <label key={i} className="item">
                                                <input 
                                                    type="checkbox" 
                                                    name="feeling" 
                                                    value={ratingValue} 
                                                    onChange={() => this.setState({feeling: ratingValue})}
                                                />
                                                <div className="box" style={{background: ratingValue <= this.state.feeling ? '#29aae3' : '#fff'}}>
                                                </div>
                                            </label>
                                        )
                                    })}
                                </div>
                                <div className="radio-text">
                                    <p>Not Relaxed </p>
                                    <p>Relaxed </p>
                                </div>
                            </div>
                            <button onClick={handleFeelOption} className="btn btn-primary">Continue</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default FeelControlPage;
