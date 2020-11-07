import React, {Component} from 'react';
import {BreathContext} from "../context";

class FeelControl extends Component {
    static contextType = BreathContext;
    constructor(props){
        super(props);
        this.state = {
            feeling: 3
        }
    }

    render() {
        const {handleFeelOption} = this.context;
        return (
            <div className="container-inner feel-control">
                <div className="contents-wrap">
                    <h2 className="session-title ">How relaxed do you feel?</h2>
                    <div className="radio-items-group">
                        <div className="radio-items">
                            {[...Array(5)].map((rating, i) => {
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
        );
    }
}

export default FeelControl;