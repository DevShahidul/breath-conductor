import React, {Component, Fragment} from 'react';
import {BreathContext} from '../context';
import {Link} from "react-router-dom";
import GoalIcon from "../Assets/Image/Goal.svg";
import DuplicateIcon from "../Assets/Image/New-Duplicate-icon.svg";
import TimeIcon from "../Assets/Image/Time.svg";
import VoiceIcon from "../Assets/Image/Voice.svg";
import ThemeIcon from "../Assets/Image/Theme.svg";
import { Navigation, IconicButton, LibraryOptionsItem, LibraryLinks, LibraryDetailTop } from '../Component';
import { RiShareLine, RiDeleteBinLine } from "react-icons/ri";
import LoadingGif from '../Assets/Image/gif/loading-circle.gif';
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
import { confirmAlert } from 'react-confirm-alert'; // Import confirm alert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class HistoryDetailsPage extends Component{
    static contextType = BreathContext;
    constructor({match}){
        super();
        this.state = {
            id: match.params.id,
            exercise_history_detail: {},
            focus: '',
            is_favorite: 0,
            action: 1,
            exerciseHistoryID: '',
            exerciseID: '',
            loading: true
        }
        this.handleDuplicate = this.handleDuplicate.bind(this)
    }

    // Component did mount
    componentDidMount(){
        let token = localStorage.getItem('token');
        let userId = localStorage.getItem('userId')

        const {id} = this.state;

        if(token){
            let proxyurl = "https://quiet-retreat-79741.herokuapp.com/";
            let fetchUrl = `https://www.breathconductor.com/api_v1/library/exerciseHistoryDetail/${id}`;

            var myHeaders = new Headers();
            myHeaders.append("device-id", "1");
            myHeaders.append("timezone", "UTC");
            myHeaders.append("device-type", "1");
            myHeaders.append("user_id", userId);
            myHeaders.append("Authorization", `Bearer ${token}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(proxyurl + fetchUrl, requestOptions)
            .then(response => response.text())
            .then(result => {
                let jsonResult = JSON.parse(result);
                let data = jsonResult.data.exercise_history_detail;
                //console.log(jsonResult.data);
                this.setExerciseHistoryDetail(data);
                console.log(jsonResult.data)
            })
            .catch(error => {
                this.setState({
                    loading: false
                })
                console.log('error', error)
            });
        }

    }

    setExerciseHistoryDetail = (data) => {
        const exerciseHistoryID = data.exerciseHistoryID;
        const focus = data.created_at;
        const favoriteStatus = data.is_favorite;
        const is_favorite = parseInt(favoriteStatus, 10)
        const exercise_history_detail = {...data.exercise};
        const exerciseID = data.exercise_id;
        let action = is_favorite === 0 ? 1 : 0;
        
        this.setState({ // Set data in state
            exercise_history_detail,
            focus,
            is_favorite,
            exerciseHistoryID,
            exerciseID,
            action,
            loading: false
        })
        //console.log(data)
    }

    handleDuplicate = () => {
        const { goal, theme, duration_minutes, narration} = this.state.exercise_history_detail;
        let time = duration_minutes + ' min';
        let sessionData = {
            goal,
            time,
            theme,
            narration,
        }
        let getSessionData = localStorage.getItem('sessionData');
        if(!getSessionData){
            localStorage.setItem('sessionData', JSON.stringify(sessionData));
        }
        const location = this.props.history;
        location.push('/');
    }

    // Handle bo back
    HandleGoback = () => {
        this.props.history.goBack();    
    }

    // // Remove from history function
    removeFromHistory = (historyid) => {
        let token = localStorage.getItem('token');
        let proxyurl = "https://quiet-retreat-79741.herokuapp.com/";
        let fetchUrl = `https://www.breathconductor.com/api_v1/library/exerciseHistory/${historyid}?action=1`;

        var myHeaders = new Headers();
        myHeaders.append("device-id", "1");
        myHeaders.append("timezone", "UTC");
        myHeaders.append("device-type", "1");
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(proxyurl + fetchUrl, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            alert('Removed successful') 
        })
        .catch(error => console.log('error', error));

        console.log(`I've remove from history ${historyid}`)
    }

    // On remove
    onRemoveHistory = (id) => {
        confirmAlert({
            title: 'Alert',
            message: 'Are you sure you want to remove it?',
            buttons: [
                { label: 'Yes', onClick: () => {
                    this.removeFromHistory(id)
                }},
                { label: 'No', onClick: () => {
                    console.log("Your request canceled")
                }}
            ]
        });
    }

    // Handle Toggle favorite button
    toggleFavorite = (actionId) => {
        let token = localStorage.getItem('token');
        let {action, is_favorite} = this.state;

        let changedState = is_favorite === 0 ? 1 : 0 ;
        let changedAction = action === 0 ? 1 : 0 ;

        this.setState({
            action: changedAction,
            is_favorite: changedState
        });
        
        //console.log(actionId)
        let proxyurl = "https://quiet-retreat-79741.herokuapp.com/";
        let fetchUrl = `https://www.breathconductor.com/api_v1/library/favoriteExercise/${actionId}?action=${action}`;

        var myHeaders = new Headers();
        myHeaders.append("device-id", "1");
        myHeaders.append("timezone", "UTC");
        myHeaders.append("device-type", "1");
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(proxyurl + fetchUrl, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
        })
        .catch(error => {
            console.log('error', error)
        });

    }


    render(){

        const { title, goal, theme, duration_minutes, narration} = this.state.exercise_history_detail;
        const {loading, focus, exerciseHistoryID, is_favorite, exerciseID, exercise_history_detail} = this.state;
        //const trailer_video = this.state.exercise_history_detail.exercise.trailer_video.trailer
        const { modalShown, handleShareModal } = this.context;
        const trailerInfo = {...exercise_history_detail.trailer_video}
        const shareText = "Let's try! ";
        const videoUrl = trailerInfo.trailer
    
        console.log(videoUrl)
    
        return (
            <Fragment>
                <Navigation/>
                <div className="container library-single">
                    <div className="library-inner">
                        <LibraryLinks>
                            <li className="nav-item">
                                <Link to="/library">Favorites</Link>
                            </li>
                            <li className="nav-item active">
                                <Link to="/library/history">History</Link>
                            </li>
                        </LibraryLinks>
                        <div className={loading ? `library-content library-inner loading` : `library-content library-inner`}>
                            { loading ? <img className="loader-gif" src={LoadingGif} alt="Loading gif" /> : (
                            <>
                            <LibraryDetailTop title={title} date={focus} onClick={this.HandleGoback} onAddFavorite={ () => this.toggleFavorite(exerciseID) } togglerFavorite={true} favoriteIcon={is_favorite === 1 ? <HeartFill /> : <HeartOutline />}/>
                            <div className="details-items">
                                <div className="row"> 
                                    {goal ? <LibraryOptionsItem icon={GoalIcon} title="Goal" text={goal} /> : ''}
                                    {duration_minutes ? <LibraryOptionsItem icon={TimeIcon} title="Time" text={duration_minutes} /> : ''}
                                    {narration ? <LibraryOptionsItem icon={VoiceIcon} title="Voice" text={narration} /> : ''}
                                    {theme ? <LibraryOptionsItem icon={ThemeIcon} title="Theme" text={theme} /> : ''}
                                </div>
                            </div>
                            <div className="details-action">
                                <IconicButton type="primary" text="New Duplicate" imgIcon={DuplicateIcon} click={ () => this.handleDuplicate()}/>
                                <IconicButton type="primary" text="Share" icon={RiShareLine}  click={() => handleShareModal()}/>
                                <IconicButton type="danger" text="Remove from History" icon={RiDeleteBinLine} click={ () => this.onRemoveHistory(exerciseHistoryID) }/>
                            </div>
                            {modalShown ? 
                                <div className="share-modal">
                                    <div className="share-modal-inner">
                                        <button className="modal-close" onClick={() => handleShareModal()}></button>
                                        <div>
                                            <h3>Please share your result!</h3>
                                            <div className="share-buttons-row">
                                                <FacebookShareButton url={videoUrl}>
                                                    <FacebookIcon />
                                                    <span>Facebook</span>
                                                </FacebookShareButton>
                                                <TwitterShareButton url={videoUrl} title={shareText}>
                                                    <TwitterIcon />
                                                    <span>Twitter</span>
                                                </TwitterShareButton>
                                                <LinkedinShareButton url={videoUrl} title={shareText}>
                                                    <LinkedinIcon />
                                                    <span>Linkedin</span>
                                                </LinkedinShareButton>
                                                <WhatsappShareButton url={videoUrl} title={shareText}>
                                                    <WhatsappIcon />
                                                    <span>Whatsapp</span>
                                                </WhatsappShareButton>
                                            </div>
                                        </div>
                                    </div>
                                </div> : 
                            null }
                            </>
                            )}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default HistoryDetailsPage;