import React, { Component, createContext } from 'react';
import {  v4 as uuidv4  } from 'uuid';
import { HistoryData } from './data/HistoryData';
import { FavoriteData } from './data/FavoriteData';

const BreathContext = createContext();

class BreathProvider extends Component {
    constructor(props){
        super(props);
        this.state = {
            userName: 'User name',
            reminders: false,
            showWelcome: true,
            sowoFeelOption: false,
            showTutorial: false,
            showReplay: false,
            setFeeling: 3,
            // History
            HistoryContents: [],
            singleHistory: {},
            // Favorite
            FavoriteContents: [],
            singleFavorite: {},
            loading: false,

        }
        this.handleConfirmation = this.handleConfirmation.bind(this);
        this.handleHomeStart = this.handleHomeStart.bind(this);
        this.handleFeelOption = this.handleFeelOption.bind(this);
        this.handleEndVideo = this.handleEndVideo.bind(this);
        this.handleReplayFromFeedback = this.handleReplayFromFeedback.bind(this);
        this.backToPrev = this.backToPrev.bind(this);
        this.removeFromFavorite = this.removeFromFavorite.bind(this);
        this.handleAddFavorite = this.handleAddFavorite.bind(this);
        this.handleGoBack = this.handleGoBack.bind(this);
    }

    componentDidMount(){
        let username = sessionStorage.getItem('username');
        this.setHistoryContents(HistoryData);
        this.setFavoriteContents(FavoriteData);
        this.setState({
            username,
        });

    }

    // Get History Data
    setHistoryContents = (contents) => {
        let HistoryContents = contents.map(item => {
            const id = item.exerciseHistoryID;
            const date = item.created_at;
            const content = { id, date, ...item.exercise};
            console.log(content)
            return content;
        })
        this.setState({
            HistoryContents,
            loading: false
        })
        console.log(HistoryContents);
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
        console.log(singleHistoryItem)
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
        console.log(FavoriteContents);
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
        console.log(`set signle library ${JSON.stringify(singleItem)}`)
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
            FavoriteContents: [...FavoriteContents, newContents]
        })

        console.log(fromLocalStorage);

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
            }}>
                {this.props.children}
            </BreathContext.Provider>
        )
    }
}

const BreathConsumer = BreathContext.Consumer;

export { BreathContext, BreathProvider, BreathConsumer };
