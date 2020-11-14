import React, { Component, createContext } from 'react';
//import { useHistory } from 'react-router-dom';
//import {HeartFill, HeartOutline} from './Component/icons';

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

            // Exercise data
            generalList: [],
            goalOptions: [{id:1, name:"Relax"}],
            timeOptions: [{id:1, name:"-1 min"}, {id: 2, name:"1 min"}, {id: 3, name: "2 min"}, {id:4, name:"5 min"}],
            narrationOptions: [{id:1, name: "None"}, {id:1, name:"Full"}],
            themeOptions: [{id:1, name: "Sunrise"}, {id: 2, name: "Earth"}, {id: 3, name:"Moon"}],
            goal: "Relax",
            time: "2 min",
            theme: "Sunrise",
            narration: "None",
            themePopup: false,
            goalPopup: false,
            timePopup: false,
            narrationPopup: false,

            exerciseVideo: '',
            exercise_id: '',
            videoFallback: '',
            intro_duration: '',
            exerciseTitle: '',
            previousFeel: 3,
            afterFeel: 3,
            hideActionButton: false,

            // History
            isHistory: true,
            HistoryContents: [],
            singleHistory: {},
            
            // Favorite
            isFavorite: true,
            is_favorite: 0,
            action: 1,
            FavoriteContents: [],
            singleFavorite: {},
            deleteMessage: '',
            loading: false,
            modalShown: false,


        }
        this.handleConfirmation = this.handleConfirmation.bind(this); // Handle confirmation 
        this.handleHomeStart = this.handleHomeStart.bind(this); // Handle home session start
        this.reSetSession = this.reSetSession.bind(this) // Reset home session
        this.handleFeelOption = this.handleFeelOption.bind(this);
        this.handleEndVideo = this.handleEndVideo.bind(this);
        this.handleReplayFromFeedback = this.handleReplayFromFeedback.bind(this);
        this.backToPrev = this.backToPrev.bind(this);
        this.handleGoBack = this.handleGoBack.bind(this); // Go back previous
        this.handleFeedback = this.handleFeedback.bind(this); // Clear all history
        this.setDefaultStep = this.setDefaultStep.bind(this); // Clear all history
        this.handleChange = this.handleChange.bind(this);

        this.handleThemePopUpAction = this.handleThemePopUpAction.bind(this)// Handle theme popup option
        this.handleTimePopUpAction = this.handleTimePopUpAction.bind(this)// Handle time popup option
        this.handlenarrationPopUpAction = this.handlenarrationPopUpAction.bind(this)// Handle narration popup option
        this.handleGoalPopUpAction = this.handleGoalPopUpAction.bind(this)// Handle goal popup option

        this.handleGoalPopUp = this.handleGoalPopUp.bind(this) // Handle goal popup
        this.handleThemePopUp = this.handleThemePopUp.bind(this) // Handle theme popup
        this.handleTimePopUp = this.handleTimePopUp.bind(this) // Handle Time popup
        this.handlenarrationPopUp = this.handlenarrationPopUp.bind(this) // Handle narration popup
        this.toggleFavorite = this.toggleFavorite.bind(this) // Toggle Favorite function
        this.beforeFeelOnChange = this.beforeFeelOnChange.bind(this) // Toggle Favorite function
        this.afterFeelOnChange = this.afterFeelOnChange.bind(this) // Toggle Favorite function
        this.updateComponentFromHome = this.updateComponentFromHome.bind(this) // Update componetn for duplicate function
        this.handleShareModal = this.handleShareModal.bind(this) // Update componetn for duplicate function
        this.hideActionButtons = this.hideActionButtons.bind(this) // Update componetn for duplicate function

    }

    // componentDidMount(){

    //     let token = localStorage.getItem('token');
    //     let userId = localStorage.getItem('userID');

    //     let proxyurl = "https://quiet-retreat-79741.herokuapp.com/";
    //     let fetchUrl = `https://www.breathconductor.com/api_v1/general/list?user_id=${userId}`;

    //     var myHeaders = new Headers();
    //     myHeaders.append("device-id", "1");
    //     myHeaders.append("timezone", "UTC");
    //     myHeaders.append("device-type", "1");
    //     myHeaders.append("Authorization", `Bearer ${token}`);

    //     var requestOptions = {
    //         method: 'GET',
    //         headers: myHeaders,
    //         redirect: 'follow'
    //     };

    //     fetch(proxyurl + fetchUrl, requestOptions)
    //     .then(response => response.text())
    //     .then(result => {
    //         let resultjson = JSON.parse(result);
    //         this.setState({
    //             generalList: resultjson.data
    //         })
    //         console.log(resultjson)
    //     })
    //     .catch(error => console.log('error', error));
    // }

    
    // Handle share option popup
    handleShareModal = () => {
        this.setState({
            modalShown: !this.state.modalShown,
        })
    }

    // Duplicate function
    updateComponentFromHome = () => {
        let sessionData = localStorage.getItem('sessionData');
        if(sessionData){
            const { goal, time, theme, narration } = JSON.parse(sessionData);
            this.setState({
                goal,
                time,
                theme,
                narration,
            })
            //console.log("I'm loaded from context");
        }
    }

    
    // Handle before feel
    afterFeelOnChange = (ratingValue) => {
        this.setState({
            afterFeel: ratingValue
        })
    }

    // Handle before feel
    beforeFeelOnChange = (ratingValue) => {
        this.setState({
            previousFeel: ratingValue
        })
    }

    // Handle Toggle favorite button
    toggleFavorite = (exerciseID) => {
        let token = localStorage.getItem('token');
        let {is_favorite, action} = this.state;

        let changedState = is_favorite === 0 ? 1 : 0 ;
        let changedAction = action === 0 ? 1 : 0 ;

        this.setState({
            action: changedAction,
            is_favorite: changedState
        });

        let proxyurl = "https://quiet-retreat-79741.herokuapp.com/";
        let fetchUrl = `https://www.breathconductor.com/api_v1/library/favoriteExercise/${exerciseID}?action=${action}`;

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


    // handle confirmation for welcome screen
    handleFeelOption = () => {
        let sessionData = localStorage.getItem('sessionData')
        if(sessionData){
            localStorage.removeItem('sessionData')
        }
        this.setState({
            sowoFeelOption: false,
            showTutorial: true,
        });
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            [e.target.name]: value,
        })
    }

    // Handle theme popup show
    handleThemePopUp = () => {
        this.setState({
            themePopup: true
        });
    }

    // Handle time popup show
    handleTimePopUp = () => {
        this.setState({
            timePopup: true
        });
    }

    // Handle time popup show
    handlenarrationPopUp = () => {
        this.setState({
            narrationPopup: true
        });
    }

    // Handle time popup show
    handleGoalPopUp = () => {
        this.setState({
            goalPopup: true
        });
    }

    // handle theme option 
    handleThemePopUpAction = (value) => {
        //console.log("I'm clicked theme popup")
        if(value === "Cancel"){
            this.setState({
                theme: "Sunrise",
                themePopup: false
            })
        }else{
            this.setState({
                themePopup: false
            })
        }
    }
    
    // handle theme option 
    handlenarrationPopUpAction = (value) => {
        //console.log("I'm clicked narration popup")
        if(value === "Cancel"){
            this.setState({
                narration: "None",
                narrationPopup: false
            })
        }else{
            this.setState({
                narrationPopup: false
            })
        }
    }
    
    // handle time option 
    handleTimePopUpAction = (value) => {
        //console.log("I'm clicked time popup")
        if(value === "Cancel"){
            this.setState({
                time: "2 min",
                timePopup: false
            })
        }else{
            this.setState({
                timePopup: false
            })
        }
    }
    
    // handle theme option 
    handleGoalPopUpAction = (value) => {
        //console.log("I'm clicked goal popup")
        if(value === "Cancel"){
            this.setState({
                goal: "Relax",
                goalPopup: false
            })
        }else{
            this.setState({
                goalPopup: false
            })
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

    // Handle reset session options
    reSetSession = () => {
        this.setState({
            exerciseVideo: '',
            exercise_id: '',
            intro_duration: '',
            exerciseTitle: '',
            is_favorite: 0,
            goal: "Relax",
            time: "2 min",
            theme: "Sunrise",
            narration: "None",            
        })
    }

    // handle confirmation for welcome screen
    handleHomeStart = () => {
        this.setState({
            sowoFeelOption: true
        });

        const {goal, time, theme, narration} = this.state;

        const golId = goal === "Relax" ? 1 : 0;
        const timeId = time === "-1 min" ? 9 : 1 && time === "1 min" ? 1 : 1 && time === "2 min" ? 2 : 1 && time === "5 min" ? 8 : 1;
        const themeId = theme === "Sunrise" ? 1 : 2 && theme === "Earth" ? 2 : 1 && theme === "Moon" ? 3 : 1;
        const narrationId = narration === "None" ? 1 : 3 && narration === "Full" ? 3 : 1 ;

        //console.log('Goal == ' + golId + ' time = ' + timeId + ' theme = ' + themeId + ' narration =' + narrationId)

        let token = localStorage.getItem('token');
        let proxyurl = "https://quiet-retreat-79741.herokuapp.com/";
        let fetchUrl = `https://www.breathconductor.com/api_v1/exercise/search_exercise?goal_id=${golId}&narration_id=${narrationId}&theme_id=${themeId}&duration_minute_id=${timeId}`;

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("device-id", "1");
        myHeaders.append("timezone", "UTC");
        myHeaders.append("device-type", "1");

        var requestOptions = {
            //credentials: 'include',
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(proxyurl + fetchUrl, requestOptions)
        .then(response => response.text())
        .then(result => {
            let resultjson = JSON.parse(result);
            let status = resultjson.data.data_found;
            
            if(status){
                let id = resultjson.data.exercise.exerciseID;
                let intro_duration = resultjson.data.exercise.intro_duration;
                let title = resultjson.data.exercise.title;
                let is_favorite = parseInt(resultjson.data.exercise.is_favorite);
                let changeActionState = is_favorite === 1 ? 0 : 1;
                this.setState({
                    exerciseVideo: resultjson.data.exercise.exercise_video,
                    exercise_id: id,
                    intro_duration,
                    exerciseTitle: title,
                    is_favorite,
                    action: changeActionState
                })
            }else{
                this.setState({
                    videoFallback: "No data found",
                });
            }
            console.log(resultjson)
        })
        .catch(error => {
            console.log('error', error);
        });

    }

    // Handle back button on tutorial component
    backToPrev = () => {
        this.setState({
            sowoFeelOption: true,
            showTutorial: false
        })
    }

    hideActionButtons = () => {
        this.setState({
            hideActionButton: true
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
            goHome: true,
            goal: "Relax",
            time: "2 min",
            theme: "Sunrise",
            narration: "None",
        })
    }

    // Home page go back frist stape
    setDefaultStep = () => {
        this.setState({
            showWelcome: false,
            goHome: true,
            sowoFeelOption: false,
            showTutorial: false,
            showReplay: false,
            setFeeling: 3,
        });
        this.reSetSession()
        localStorage.removeItem('sessionData')
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
                handleFeedback: this.handleFeedback,
                setDefaultStep: this.setDefaultStep,

                handleChange: this.handleChange,
                handleThemePopUpAction: this.handleThemePopUpAction,
                handleTimePopUpAction: this.handleTimePopUpAction,
                handlenarrationPopUpAction: this.handlenarrationPopUpAction,
                handleGoalPopUpAction: this.handleGoalPopUpAction,
                handleGoalPopUp: this.handleGoalPopUp,
                handleThemePopUp: this.handleThemePopUp,
                handleTimePopUp: this.handleTimePopUp,
                handlenarrationPopUp: this.handlenarrationPopUp,
                toggleFavorite: this.toggleFavorite,
                reSetSession: this.reSetSession,
                beforeFeelOnChange: this.beforeFeelOnChange,
                afterFeelOnChange: this.afterFeelOnChange,
                updateComponentFromHome: this.updateComponentFromHome,
                handleShareModal: this.handleShareModal,
                hideActionButtons: this.hideActionButtons,
            }}>
                {this.props.children}
            </BreathContext.Provider>
        )
    }
}

const BreathConsumer = BreathContext.Consumer;

export { BreathContext, BreathProvider, BreathConsumer };
