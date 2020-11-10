import React, { Component, createContext } from 'react';

const BreathContext = createContext();

class BreathProvider extends Component {
    constructor(props){
        super(props);
        this.state = {
            reminders: false,
            showWelcome: true,
            goHome: false,
            sowoFeelOption: false,
            showTutorial: false,
            showReplay: false,
            setFeeling: 3,
            generalList: [],
            
            theme: 'Sunrise',
            goal: 'Relax',
            time: '2',
            narattion: 'Full',

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
        this.handleGoBack = this.handleGoBack.bind(this); // Go back previous
        this.clearHistory = this.clearHistory.bind(this); // Clear all history
        this.handleFeedback = this.handleFeedback.bind(this); // Clear all history
        this.setDefautStep = this.setDefautStep.bind(this); // Clear all history
    }

    componentDidMount(){
        let token = localStorage.getItem('token');
        let userId = localStorage.getItem('userID');

        let proxyurl = "https://cors-anywhere.herokuapp.com/";
        let fetchUrl = `https://www.breathconductor.com/api_v1/general/list?user_id=${userId}`;

        var myHeaders = new Headers();
        myHeaders.append("device-id", "1");
        myHeaders.append("timezone", "UTC");
        myHeaders.append("device-type", "1");
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(proxyurl + fetchUrl, requestOptions)
        .then(response => response.text())
        .then(result => {
            let resultjson = JSON.parse(result);
            this.setState({
                generalList: resultjson.data
            })
            console.log(resultjson)
        })
        .catch(error => console.log('error', error));
                

    }

    // setExercise (data){
    //     let time: '';
    // }

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

    // Handle go back     
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


    // Share from library
    shareFromLibrary = (id) => {
        console.log(`Share from library ${id}`);
    }

    // Clear history
    clearHistory = () => {

        let token = localStorage.getItem('token');
        let userId = localStorage.getItem('userID');

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

    // handle confirmation for welcome screen
    handleConfirmation = (status) => {
        let setRemainder = status === "Yes" ? true : false;
        //console.log(status);
        this.setState({
            reminders: setRemainder,
            showWelcome: false,
            goHome: true
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

    //handleFeedback 
    handleFeedback = () => {
        this.setState({
            showReplay: false,
            showTutorial: false,
            goHome: true
        })
    }

    // Home page go back frist stape
    setDefautStep = () => {
        this.setState({
            showWelcome: false,
            goHome: true,
            sowoFeelOption: false,
            showTutorial: false,
            showReplay: false,
            setFeeling: 3,
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
                shareFromLibrary: this.shareFromLibrary,
                setSingleFavoriteData: this.setSingleFavoriteData,
                getFavoriteData: this.getFavoriteData,
                
                // History function method
                getHistoryData: this.getHistoryData,
                handleGoBack: this.handleGoBack,
                clearHistory: this.clearHistory,
                handleFeedback: this.handleFeedback,
                setDefautStep: this.setDefautStep,
            }}>
                {this.props.children}
            </BreathContext.Provider>
        )
    }
}

const BreathConsumer = BreathContext.Consumer;

export { BreathContext, BreathProvider, BreathConsumer };
