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

class FavoritiesDetailsPage extends Component {
    static contextType = BreathContext;
    constructor({match}){
        super()
        this.state = {
            id: match.params.id,
            exercise_detail: {},
            foucs: '',
            loading: true,
        }
    }

    HandleGoback = () => {
        this.props.history.goBack();
    }

    componentDidMount(){
        let token = localStorage.getItem('token');
        let userId = localStorage.getItem('userId')

        const {id} = this.state;

        if(token){
            let proxyurl = "https://cors-anywhere.herokuapp.com/";
            let fetchUrl = `https://www.breathconductor.com/api_v1/library/favoriteExerciseDetail/${id}`;
            
            var myHeaders = new Headers();
            myHeaders.append("device-id", "1");
            myHeaders.append("timezone", "UTC");
            myHeaders.append("device-type", "1");
            myHeaders.append("userID", userId);
            myHeaders.append("Authorization", `Bearer ${token}`);

            //var urlencoded = new URLSearchParams();

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                //body: urlencoded,
                redirect: 'follow'
            };

            fetch(proxyurl + fetchUrl, requestOptions)
            .then(response => response.text())
            .then(result => {
                let jsonResult = JSON.parse(result);
                let data = jsonResult.data.favorite_exercise_detail
                //console.log(jsonResult.data);
                this.setExerciseDetail(data)
            })
            .catch(error => {
                this.setState({
                    loading: false
                })
                console.log('error', error)
            });
        }
    }

    setExerciseDetail = (data) => {
        const userId = localStorage.getItem('userID'); // Get user from localStorage
        let getMatchItem = data.filter(item => { // filtering user info
            let matchContent = item.user_id === userId
            return matchContent;
        });

        let foucs = getMatchItem[0].created_at; // Get time from array object
        let exercise_detail = {...getMatchItem[0].exercise} // Destructuring exercise data
        this.setState({ // Set data in state
            exercise_detail,
            foucs
        })
    }

    render(){
                
        
        const { loading, removeFromFavorite, handleAddFavorite } =  this.context;

        const {id, title, goal, theme, duration_minutes, narration} = this.state.exercise_detail;
        
        return (
            <Fragment>
                <Navigation/>
                { loading ? "Loading..." : (
                    <div className="container library-single">
                        <div className="library-inner">
                            <LibraryLinks>
                                <li className="nav-item active">
                                    <Link to="/library">Favorites</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/history">History</Link>
                                </li>
                            </LibraryLinks>
                            <div className="library-content library-inner">
                                <LibraryDetailTop title={title} onClick={this.HandleGoback} />
                                <div className="details-items">
                                    <div className="row"> 
                                        {goal ? <LibraryOptionsItem icon={GoalIcon} title="Goal" text={goal} /> : ''}
                                        {duration_minutes ? <LibraryOptionsItem icon={TimeIcon} title="Time" text={`${duration_minutes} min`} /> : ''}
                                        {narration ? <LibraryOptionsItem icon={VoiceIcon} title="Voice" text={narration} /> : ''}
                                        {theme ? <LibraryOptionsItem icon={ThemeIcon} title="Theme" text={theme} /> : ''}
                                    </div>
                                </div>
                                <div className="details-action">
                                    <IconicButton type="primary" text="New Duplicate" imgIcon={DuplicateIcon} click={ () => handleAddFavorite(id)}/>
                                    <IconicButton type="primary" text="Share" icon={RiShareLine}/>
                                    <IconicButton type="danger" text="Remove from Favorites" icon={RiDeleteBinLine} click={ () => removeFromFavorite(id) }/>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Fragment>
        );
    }
}

export default FavoritiesDetailsPage;