import React, {Component, Fragment} from 'react';
import {BreathContext} from '../context';
import { Navigation, LibraryLinks } from "../Component";
import {Link} from "react-router-dom";
import NextPlay from "../Assets/Image/next.svg";
import LoadingGif from '../Assets/Image/gif/loading-circle.gif';

class HistoryPage extends Component {
    static contextType = BreathContext;

    constructor(props){
        super(props);
        this.state = {
            // History
            isHistory: false,
            HistoryContents: [],
            singleHistory: {},
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

            // Exercise history
            let ExersizeHistoryUrl = 'https://www.breathconductor.com/api_v1/library/exerciseHistory';
            fetch(proxyurl + ExersizeHistoryUrl, requestOptions)
            .then(response => response.text())
            .then(result => {
                const datajson = JSON.parse(result);
                const status = datajson.data.data_found;
                const historyData = datajson.data.exercise_history_list;

                if(status){
                    this.setHistoryContents(historyData);
                    this.setState({
                        isHistory: true,
                        loading: false
                    });
                }else{
                    this.setState({
                        isHistory: false,
                        loading: false
                    })
                }

                //console.log(datajson)

            })
            .catch(error => console.log('error', error)); // End exercise history function
        }
    }


    // Get History Data
    setHistoryContents = (contents) => {
        let HistoryContents = contents.map(item => {
            const id = item.exerciseHistoryID;
            const date = item.created_at;
            const content = { id, date, ...item.exercise};
            //console.log(content)
            return content;
        })
        this.setState({
            HistoryContents,
            loading: false
        })
        //console.log(HistoryContents);
    }

    // set single library
    setSingleHistoryData = (id) => {
        let singleHistoryItem = this.state.HistoryContents.find( item => item.id === id);
        localStorage.removeItem('singleHistoryData');
        localStorage.setItem('singleHistoryData', JSON.stringify(singleHistoryItem));
        this.setState({
            singleHistory: {...singleHistoryItem},
            loading: false
        })
        //console.log(singleHistoryItem)
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
        const { isHistory, HistoryContents, loading} = this.state;
        return (
            <Fragment>
                <Navigation/>
                {/* History page elements */}
                <div className="container">
                    <div className="library-inner">
                        <LibraryLinks>
                            <li className="nav-item">
                                <Link onClick={this.deletHistoryData} to="/library">Favorites</Link>
                            </li>
                            <li className="nav-item active">
                                <Link onClick={this.deletFavoriteData} to="/history">History</Link>
                            </li>
                        </LibraryLinks>
                        {loading ? <img className="loading-img" src={LoadingGif} alt="Loading ..." /> : 
                            <div className="library-content">
                                { isHistory ? 
                                    HistoryContents.map((item, index) => {
                                        return (
                                            <div key={index} className="favorites-list">
                                                <Link onClick={() => this.setSingleHistoryData(item.id)} to={`/history/${item.id}`} >
                                                    <div className="favorites-info">
                                                        <h2>{item.title}</h2>
                                                        <p>Focus - {item.date}</p>
                                                    </div>
                                                    <div className="favorites-arrow">
                                                        <img src={NextPlay} alt="Next play icon"/>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    }) : <p className="emptyMessage">Not found any history</p>
                                }
                            </div>
                        }
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default HistoryPage;