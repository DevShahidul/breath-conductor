import React, { Component } from 'react'
import editeIcon from "../Assets/Image/edit.svg";
import { RiShareLine } from "react-icons/ri";
import { MdReplay } from "react-icons/md";
import { BreathContext } from '../context';
import {HeartFill, HeartOutline} from '../Component/icons';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

export default class FeedbackSubmit extends Component {
    static contextType = BreathContext;
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         replay: false
    //     }
    // }

    handleShare = (e) => {
        e.preventDefault();
        console.log("I'm added on share");
    }

    handleEdit = (e) => {
        e.preventDefault();
        console.log("I'm added on edit");
    }

    render() {
        const { handleReplayFromFeedback, handleFeedback, exercise_id , toggleFavorite, is_favorite, afterFeel, afterFeelOnChange, modalShown, handleShareModal, exerciseVideo} = this.context;
        const shareText = "Let's try! ";
        return (
            <div className="feedbackInner">
                <div className="actionRow">
                    <button onClick={() => toggleFavorite(exercise_id)}>{is_favorite === 1 ? <HeartFill /> : <HeartOutline />}</button>
                    <button onClick={() => handleShareModal()}><RiShareLine /></button>
                    <button onClick={this.handleEdit}><img src={editeIcon} alt="Edit icon" /></button>
                </div>
                <div className="controlWrap">
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
                                                    onChange={() => afterFeelOnChange(ratingValue)}
                                                />
                                                <div className="box" style={{background: ratingValue <= afterFeel ? '#29aae3' : '#fff'}}>
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
                            <button onClick={handleFeedback} className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                    <button onClick={handleReplayFromFeedback} className="replay"><MdReplay /> Replay</button>
                </div>
                {modalShown ? 
                    <div className="share-modal">
                        <div className="share-modal-inner">
                            <button className="modal-close" onClick={() => handleShareModal()}></button>
                            <div>
                                <h3>Please share your result!</h3>
                                <div className="share-buttons-row">
                                    <FacebookShareButton url={exerciseVideo}>
                                        <FacebookIcon />
                                        <span>Facebook</span>
                                    </FacebookShareButton>
                                    <TwitterShareButton url={exerciseVideo} title={shareText}>
                                        <TwitterIcon />
                                        <span>Twitter</span>
                                    </TwitterShareButton>
                                    <LinkedinShareButton url={exerciseVideo} title={shareText}>
                                        <LinkedinIcon />
                                        <span>Linkedin</span>
                                    </LinkedinShareButton>
                                    <WhatsappShareButton url={exerciseVideo} title={shareText}>
                                        <WhatsappIcon />
                                        <span>Whatsapp</span>
                                    </WhatsappShareButton>
                                </div>
                            </div>
                        </div>
                    </div> : 
                null }
            </div>
        )
    }
}
