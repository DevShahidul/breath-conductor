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

class HistoryDetailsPage extends Component{
    static contextType = BreathContext;
    constructor({match}){
        super();
        this.state = {
            id: match.params.id,
            exercise_history_detail: {},
            focus: '',
            is_favorite: 0,
            exerciseHistoryID: '',
            favoriteIcon: <HeartOutline />,
            loading: true,
        }
    }

    // Component did mount
    componentDidMount(){
        let token = localStorage.getItem('token');
        let userId = localStorage.getItem('userId')

        const {id, is_favorite} = this.state;

        // Set favorite icon
        let favoriteIcon = is_favorite === 0 ? <HeartOutline /> : <HeartFill />
        this.setState({
            favoriteIcon
        })

        if(token){
            let proxyurl = "https://cors-anywhere.herokuapp.com/";
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
                let data = jsonResult.data.exercise_history_detail
                //console.log(jsonResult.data);
                this.setExerciseHistoryDetail(data);
                this.setState({
                    loading: false
                })
                //console.log(data)
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
        
        this.setState({ // Set data in state
            exercise_history_detail,
            focus,
            is_favorite,
            exerciseHistoryID
        })
        console.log(exercise_history_detail)
    }

    // Handle bo back
    HandleGoback = () => {
        this.props.history.goBack();    
    }

    // Handle Duplicate button
    handleDuplicate = (historyid) => {
        console.log(`Duplicate history ${historyid}`)
    }

    // // Remove from history function
    removeFromHistory = (historyid) => {
        let token = localStorage.getItem('token');
        let proxyurl = "https://cors-anywhere.herokuapp.com/";
        let fetchUrl = `https://www.breathconductor.com/api_v1/library/exerciseHistory/${historyid}?action=1`;

        // this.setState({

        // })

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
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        console.log(`I've remove from history ${historyid}`)
    }

    // Handle Toggle favorite button
    toggleFavorite = (historyid) => {
        let token = localStorage.getItem('token');
        let {is_favorite} = this.state;
        let exerciseID = this.state.exercise_history_detail.exerciseID;
        //let setFavorite = is_favorite + 1;
        let changedStat = is_favorite === 0 ? 1 : 0 ;
        let favoriteIcon = is_favorite === 0 ? <HeartOutline /> : <HeartFill /> ;

        this.setState({
            is_favorite: changedStat,
            favoriteIcon
        })

        let proxyurl = "https://cors-anywhere.herokuapp.com/";
        let fetchUrl = `https://www.breathconductor.com/api_v1/library/favoriteExercise/${exerciseID}?action=${is_favorite}`;

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

        console.log(exerciseID)
    }


    render(){

        //const {removeFromHistory} = this.context;
        // const dataFromLocalstorage = localStorage.getItem('singleHistoryData') ? JSON.parse(localStorage.getItem('singleHistoryData')) : {};

        //const {id, title, date, goal, theme, voice, duration_minutes} = dataFromLocalstorage;
        const { title, goal, theme, duration_minutes, narration} = this.state.exercise_history_detail;
        const {loading, focus, exerciseHistoryID, favoriteIcon} = this.state;
    
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
                            <LibraryDetailTop title={title} date={focus} onClick={this.HandleGoback} onAddFavorite={ () => this.toggleFavorite(exerciseHistoryID) } togglerFavorite={true} favoriteIcon={favoriteIcon}/>
                            <div className="details-items">
                                <div className="row"> 
                                    {goal ? <LibraryOptionsItem icon={GoalIcon} title="Goal" text={goal} /> : ''}
                                    {duration_minutes ? <LibraryOptionsItem icon={TimeIcon} title="Time" text={duration_minutes} /> : ''}
                                    {narration ? <LibraryOptionsItem icon={VoiceIcon} title="Voice" text={narration} /> : ''}
                                    {theme ? <LibraryOptionsItem icon={ThemeIcon} title="Theme" text={theme} /> : ''}
                                </div>
                            </div>
                            <div className="details-action">
                                <IconicButton type="primary" text="New Duplicate" imgIcon={DuplicateIcon} click={ () => this.handleDuplicate(exerciseHistoryID)}/>
                                <IconicButton type="primary" text="Share" icon={RiShareLine}/>
                                <IconicButton type="danger" text="Remove from History" icon={RiDeleteBinLine} click={ () => this.removeFromHistory(exerciseHistoryID) }/>
                            </div>
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