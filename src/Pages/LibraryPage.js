import React, {Component, Fragment} from 'react';
import {BreathContext} from '../context';
import { Navigation, LibraryLinks } from "../Component";
import {Link} from "react-router-dom";
import NextPlay from "../Assets/Image/next.svg";
import LoadingGif from '../Assets/Image/gif/loading-circle.gif';

class LibraryPage extends Component {
    static contextType = BreathContext;

    constructor(props){
        super(props);
        this.state = {
            // Favorite
            isFavorite: true,
            FavoriteContents: [],
            singleFavorite: {},
            loading: true,
        }
    }

    componentDidMount(){
        let token = localStorage.getItem('token');
        let userId = localStorage.getItem('userID');
        //console.log(token)

        if(token){
            let proxyurl = "https://cors-anywhere.herokuapp.com/";
            
            var myHeaders = new Headers();
            myHeaders.append("userID", userId);
            myHeaders.append("device-id", "1");
            myHeaders.append("timezone", "UTC");
            myHeaders.append("device-type", "1");
            myHeaders.append("Authorization", `Bearer ${token}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            //Favorite Exerscise API
            let FavoriteExersizeUrl = 'https://www.breathconductor.com/api_v1/library/favoriteExercise';

            fetch(proxyurl + FavoriteExersizeUrl, requestOptions)
            .then(responseData => responseData.text())
            .then(favoriteExRes => {
                const favoriteExDatajson = JSON.parse(favoriteExRes);
                const favoriteExResStatus = favoriteExDatajson.data.data_found;
                const favoriteData = favoriteExDatajson.data.favorite_exercise_list;
                //console.log(favoriteExDatajson)
                if(favoriteExResStatus){
                    this.setFavoriteContents(favoriteData);
                    this.setState({
                        isFavorite: true,
                        loading: false
                    });
                }else{
                    this.setState({
                        isFavorite: false,
                        loading: false
                    });
                }
                //console.log(favoriteExRes)
            })
            .catch(error => console.log('error', error)); // End favorite Exercise
        }
    }

    // Get Favorite Data 
    setFavoriteContents = (data) => {
        let FavoriteContents = data.map(item => {
            const id = item.exercise_id;
            const contents = {id, ...item.exercise};
            return contents;
        });
        this.setState({
            FavoriteContents,
            loading: false
        })
        //console.log(FavoriteContents);
    }

    // Get conent from library
    getFavoriteData = () => {
        return localStorage.getItem('singleFavoriteData') ? JSON.parse(localStorage.getItem('singleFavoriteData')) : {}
    }

    // set single library
    setSingleFavoriteData = (id) => {
        let singleItem = this.state.FavoriteContents.find( item => item.id === id);
        localStorage.removeItem('singleFavoriteData');
        localStorage.setItem('singleFavoriteData', JSON.stringify(singleItem));
        this.setState({
            singleFavorite: {...singleItem},
            loading: false
        })
        //console.log(`set signle library ${JSON.stringify(singleItem)}`)
    }

    // Remove favorite data from localStorage
    deletHistoryData = () => {
        return localStorage.removeItem('singleHistoryData');
    }


    // Remove favorite data from localStorage
    deletFavoriteData = () => {
        return localStorage.removeItem('singleFavoriteData');
    }
    

    render() {
        const { isFavorite, FavoriteContents, loading} = this.state;
        return (
            <Fragment>
                <Navigation/>
                {/* Library page elements */}
                <div className="container">
                    <div className="library-inner">
                        <LibraryLinks>
                            <li className="nav-item active">
                                <Link onClick={this.deletHistoryData} to="/library">Favorites</Link>
                            </li>
                            <li className="nav-item">
                                <Link onClick={this.deletFavoriteData} to="/history">History</Link>
                            </li>
                        </LibraryLinks>
                        {loading ? <img className="loading-img" src={LoadingGif} alt="Loading ..." /> : 
                            <div className="library-content">
                                { isFavorite ? 
                                    FavoriteContents.map((item, index) => {
                                        return (
                                            <div key={index} className="favorites-list">
                                                <Link onClick={() => this.setSingleFavoriteData(item.id)} to={`/library/${item.id}`} >
                                                    <div className="favorites-info">
                                                        <h2>{item.title}</h2>
                                                        <p>{item.duration_minutes} Minutes</p>
                                                    </div>
                                                    <div className="favorites-arrow">
                                                        <img src={NextPlay} alt="Next play icon"/>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    }) : <p className="emptyMessage">Favorite not added yet</p>
                                }
                            </div>
                        }
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default LibraryPage;