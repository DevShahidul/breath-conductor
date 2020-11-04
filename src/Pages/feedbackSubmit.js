import React, { Component } from 'react'
import FeelControl from "../Component/FeelControl";
import Navigation from "../Component/Navigation";
import favoriteIcon from "../Assets/Image/like.svg";
import editeIcon from "../Assets/Image/edit.svg";
import { RiShareLine } from "react-icons/ri";
import { MdReplay } from "react-icons/md";

export default class feedbackSubmit extends Component {
    constructor(props){
        super(props);
        this.state = {
            replay: false
        }
    }
    // Add Favorite function
    handleFaborite = (e) => {
        e.preventDefault();
        console.log("I'm added on faborite");
    }

    handleShare = (e) => {
        e.preventDefault();
        console.log("I'm added on share");
    }

    handleEdit = (e) => {
        e.preventDefault();
        console.log("I'm added on edit");
    }

    render() {
        return (
            <>
                <Navigation/>
                <div className="feedbackWrap">
                    <div className="feedbackInner">
                        <div className="actionRow">
                            <button onClick={this.handleFaborite}><img src={favoriteIcon} alt="Favorite icon" /></button>
                            <button onClick={this.handleShare}><RiShareLine /></button>
                            <button onClick={this.handleEdit}><img src={editeIcon} alt="Edit icon" /></button>
                        </div>
                        <div className="controlWrap">
                            <FeelControl  buttonText="Submit"/>
                            <button className="replay"><MdReplay /> Replay</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
