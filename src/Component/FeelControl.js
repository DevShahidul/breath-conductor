import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";

class FeelControl extends Component {
    constructor(props){
        super(props);
        this.state = {
            feeling: null
        }
    }

    render() {
        return (
            <Fragment>
                <div className="container feel-container">
                    <div className="row">
                        <div className="col-1">
                            <div className="home-page">
                                <h2 className="session-title ">How relaxed do you feel?</h2>
                                <div className="radio-item-group">
                                    <div className="radio-item">
                                        {[...Array(5)].map((rating, i) => {
                                            const ratingValue = i+1;
                                            return (
                                                <Fragment>
                                                <label className="item">
                                                    <input 
                                                        type="checkbox" 
                                                        name="feeling" 
                                                        value={ratingValue} 
                                                        onChange={() => this.setState({feeling: ratingValue})}
                                                    />
                                                    <div className="box" style={{background: ratingValue <= this.state.feeling ? '#29aae3' : '#fff'}}>
                                                    </div>
                                                </label>
                                                </Fragment>
                                            )
                                        })}
                                    </div>
                                    <div className="radio-text">
                                        <p>Not Relaxed </p>
                                        <p>Relaxed </p>
                                    </div>
                                </div>
                                <Link to="/tutorial"><button className="btn btn-primary">Continue</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default FeelControl;