import React, { Component, createContext } from 'react';
import {  v4 as uuidv4  } from 'uuid';
//import { HistoryData } from './data/HistoryData';
//import { FavoriteData } from './data/FavoriteData';

const BreathContext = createContext();

class BreathProvider extends Component {
    constructor(props){
        super(props);
        this.state = {
            reminders: false,
            showWelcome: true,
            sowoFeelOption: false,
            showTutorial: false,
            showReplay: false,
            setFeeling: 3,
            // History
            isHistory: true,
            HistoryContents: [],
            singleHistory: {},
            // Favorite
            isFavorite: true,
            FavoriteContents: [],
            singleFavorite: {},
            deleteMessage: '',
            loading: false,

        }
        this.handleConfirmation = this.handleConfirmation.bind(this);
        this.handleHomeStart = this.handleHomeStart.bind(this);
        this.handleFeelOption = this.handleFeelOption.bind(this);
        this.handleEndVideo = this.handleEndVideo.bind(this);
        this.handleReplayFromFeedback = this.handleReplayFromFeedback.bind(this);
        this.backToPrev = this.backToPrev.bind(this);
        this.removeFromFavorite = this.removeFromFavorite.bind(this); // Remove data from favorite
        this.handleAddFavorite = this.handleAddFavorite.bind(this); // Add data favorite
        this.handleGoBack = this.handleGoBack.bind(this); // Go back previous
        this.removeFromHistory = this.removeFromHistory.bind(this); // Remove data from history 
        this.clearHistory = this.clearHistory.bind(this); // Clear all history
    }

    componentDidMount(){

        let token = sessionStorage.getItem('token');
        let userId = sessionStorage.getItem('userID');

        if(token){
            //let proxyurl = "https://cors-anywhere.herokuapp.com/";
            
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

            fetch(FavoriteExersizeUrl, requestOptions)
            .then(responseData => responseData.text())
            .then(favoriteExRes => {
                const favoriteExDatajson = JSON.parse(favoriteExRes);
                const favoriteExResStatus = favoriteExDatajson.data.data_found;
                const favoriteData = favoriteExDatajson.data.favorite_exercise_list;
                //console.log(favoriteExDatajson)
                if(favoriteExResStatus){
                    this.setFavoriteContents(favoriteData);
                    this.setState({
                        isFavorite: true
                    });
                }else{
                    this.setState({
                        isFavorite: false
                    });
                }
                //console.log(favoriteExRes)
            })
            .catch(error => console.log('error', error)); // End favorite Exercise

            // Exercise history
            let ExersizeHistoryUrl = 'https://www.breathconductor.com/api_v1/library/exerciseHistory';
            fetch(ExersizeHistoryUrl, requestOptions)
            .then(response => response.text())
            .then(result => {
                const datajson = JSON.parse(result);
                const status = datajson.data.data_found;
                const historyData = datajson.data.exercise_history_list;

                if(status){
                    this.setHistoryContents(historyData);
                    this.setState({
                        isHistory: true
                    });
                }else{
                    this.setState({
                        isHistory: false
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

    // Get conent from library
    getHistoryData = () => {
        return localStorage.getItem('singleHistoryData') ? JSON.parse(localStorage.getItem('singleHistoryData')) : {}
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

    handleGoBack = () => {
        this.props.history.goBack()
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
    deletFavoriteData = () => {
        return localStorage.removeItem('singleFavoriteData');
    }

    // Share from library
    shareFromLibrary = (id) => {
        console.log(`Share from library ${id}`);
    }

    // Remove from favorite
    removeFromFavorite = (id) => {
        const {FavoriteContents} = this.state;
        const newContents = FavoriteContents.filter(item => item.id !== id);
        this.setState({
            FavoriteContents: newContents
        });
    }

    // Remove from favorite
    removeFromHistory = (id) => {
        const {HistoryContents} = this.state;
        const newContents = HistoryContents.filter(item => item.id !== id);
        this.setState({
            HistoryContents: newContents
        });
    }

    // Add Favorite
    handleAddFavorite = (id) => {
        const {FavoriteContents} = this.state;
        const fromLocalStorage = localStorage.getItem('singleFavoriteData') ? JSON.parse(localStorage.getItem('singleFavoriteData')) : {} || localStorage.getItem('singleHistoryData') ? JSON.parse(localStorage.getItem('singleHistoryData')) : {};
        const {title, goal, date, duration_minutes, voice, theme} = fromLocalStorage;
        const newContents = {
            id,
            title,
            goal,
            exerciseID: uuidv4(),
            date,
            theme,
            duration_minutes,
            voice
        }
        this.setState({
            FavoriteContents: [...FavoriteContents, newContents],
            isFavorite: true
        })

        console.log(fromLocalStorage);

    }


    // Clear history
    clearHistory = () => {

        let token = sessionStorage.getItem('token');
        let userId = sessionStorage.getItem('userID');

        if(token){
            let proxyurl = "https://cors-anywhere.herokuapp.com/";
            let clearHistoryUrl = "https://www.breathconductor.com/api_v1/library/exerciseHistoryClear";

            var myHeaders = new Headers();
            myHeaders.append("userID", userId);
            myHeaders.append("device-id", "1");
            myHeaders.append("timezone", "UTC");
            myHeaders.append("device-type", "1");
            myHeaders.append("Authorization", `Bearer ${token}`);

            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(proxyurl + clearHistoryUrl, requestOptions)
            .then(response => response.text())
            .then(result => {
                const datajson = JSON.parse(result);
                const status = datajson.data.data_found;
                //const historyData = datajson.data.exercise_history_list;
                this.setState({
                    deleteMessage: "Request processing"
                })

                alert(datajson.message);
                if(status){

                    this.setHistoryContents([]);
                    this.setState({
                        HistoryContents: [],
                        deleteMessage: datajson.message
                    });
                }else{
                    this.setState({
                        isHistory: false
                    })
                }
            })
            .catch(error => console.log('error', error));
        }
    }

    // Sync library
    syncLibrary = () => {

    }

    // handle confirmation for welcome screen
    handleConfirmation = (status) => {
        let setRemainder = status === "Yes" ? true : false;
        //console.log(status);
        this.setState({
            reminders: setRemainder,
            showWelcome: false
        })
    }

    // handle confirmation for welcome screen
    handleHomeStart = () => {
        this.setState({
            sowoFeelOption: true
        })
    }

    // Handle back button on tutorial component
    backToPrev = () => {
        this.setState({
            sowoFeelOption: true,
            showTutorial: false
        })
    }

    // handle confirmation for welcome screen
    handleFeelOption = () => {
        this.setState({
            sowoFeelOption: false,
            showTutorial: true
        })
    }

    // Handle function after video playing end 
    handleEndVideo = () => {
        this.setState({
            showReplay: true,
            showTutorial: false,
            sowoFeelOption: false,
        })
    }


    // Handle replay button from feedback component
    handleReplayFromFeedback = () => {
        this.setState({
            showReplay: false,
            showTutorial: true,
        })
    }

    render() {
        return (
            <BreathContext.Provider value={{
                ...this.state,
                handleConfirmation: this.handleConfirmation,
                handleHomeStart: this.handleHomeStart,
                handleFeelOption: this.handleFeelOption,
                handleEndVideo: this.handleEndVideo,
                handleReplayFromFeedback: this.handleReplayFromFeedback,
                backToPrev: this.backToPrev,
                //Favorite function method
                removeFromFavorite: this.removeFromFavorite,
                removeFromHistory: this.removeFromHistory,
                shareFromLibrary: this.shareFromLibrary,
                setSingleFavoriteData: this.setSingleFavoriteData,
                getFavoriteData: this.getFavoriteData,
                deletFavoriteData: this.deletFavoriteData,
                handleAddFavorite: this.handleAddFavorite,
                // History function method
                setSingleHistoryData: this.setSingleHistoryData,
                getHistoryData: this.getHistoryData,
                deletHistoryData: this.deletHistoryData,
                handleGoBack: this.handleGoBack,
                clearHistory: this.clearHistory,
            }}>
                {this.props.children}
            </BreathContext.Provider>
        )
    }
}

const BreathConsumer = BreathContext.Consumer;

export { BreathContext, BreathProvider, BreathConsumer };
