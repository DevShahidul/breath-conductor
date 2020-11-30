import React, {Component} from 'react';
import {BreathContext} from '../context';
import BackIcon from "../Assets/Image/back.svg";
import editeIcon from "../Assets/Image/edit.svg";
import { RiShareLine } from "react-icons/ri";
import { VideoPlayer } from './VideoPlayer/VideoPlayer';
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

class Tutorial extends Component {
    static contextType = BreathContext;
    
    render() {
        const { backToPrev, toggleFavorite, modalShown, exerciseVideo, handleShareModal, handleEdit, is_favorite, exercise_id, hideActionButton, handleEndVideo } = this.context;
        let proxyurl = "https://quiet-retreat-79741.herokuapp.com/";
        const shareText = "Let's try! ";
        return (
            <div className="tutorialContainer">
                <div className="tutorial-wrap">
                    <div className="tutorial-top">
                        <div className="back-section">
                            <button onClick={backToPrev}><img src={BackIcon} alt="Back arrow"/></button>
                        </div>
                        <div className="section-title">
                            <h2>Tutorial</h2>
                        </div>
                        {!hideActionButton ?<div className="actionRow">
                            <button onClick={() => toggleFavorite(exercise_id)}>{is_favorite === 1 ? <HeartFill /> : <HeartOutline />}</button>
                            <button onClick={() => handleShareModal()}><RiShareLine /></button>
                            <button onClick={handleEdit}><img src={editeIcon} alt="Edit icon" /></button>
                        </div> : null}
                    </div>
                    <VideoPlayer url={proxyurl + exerciseVideo} />
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
                <button onClick={handleEndVideo} className="btn btn-primary">End</button>
            </div>
        );
    }
}

export default Tutorial;