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
            feedback: false,
            expanded: false, // Profile Dropdown

            // Exercise data
            generalList: [],
            goalOptions: [{id:1, name:"Relax"}, {id:3, name:"Balance"}],
            timeOptionsArray: [],
            timeOptions: [{id: 2, name:"1 min"}, {id: 3, name: "2 min"}, {id:4, name:"5 min"}],
            narrationOptions: [{id:1, name: "None"}, {id:3, name:"Full"}],
            themeOptions: [{id:1, name: "Sunrise"}, {id: 2, name: "Earth"}, {id: 3, name:"Moon"}],
            goal: "Relax",
            time: "1 min",
            theme: "Earth",
            narration: "Full",
            timeId: 0,
            themePopup: false,
            goalPopup: false,
            timePopup: false,
            narrationPopup: false,

            exerciseVideo: '',
            exercise_id: '',
            videoFallback: '',
            hasVideo: true,
            intro_duration: '',
            exerciseTitle: '',
            previousFeel: 3,
            afterFeel: 3,
            hideActionButton: false,
            infinity: false,

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

            feedbackMessage: '',
            errorMessage: '',
            error: false,
            warning: false,
            processing: false

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
        this.setWelcome = this.setWelcome.bind(this); // Go on welcome screen
        this.handleChange = this.handleChange.bind(this);
        this.handlePopUpAction = this.handlePopUpAction.bind(this) // close popup

        this.handleGoalPopUp = this.handleGoalPopUp.bind(this) // Handle goal popup
        this.handleThemePopUp = this.handleThemePopUp.bind(this) // Handle theme popup
        this.handleTimePopUp = this.handleTimePopUp.bind(this) // Handle Time popup
        this.handlenarrationPopUp = this.handlenarrationPopUp.bind(this) // Handle narration popup
        this.toggleFavorite = this.toggleFavorite.bind(this) // Toggle Favorite function
        this.beforeFeelOnChange = this.beforeFeelOnChange.bind(this) // Toggle Favorite function
        this.afterFeelOnChange = this.afterFeelOnChange.bind(this) // Toggle Favorite function
        this.updateComponentFromHome = this.updateComponentFromHome.bind(this) // Update componetn for duplicate function
        this.handleShareModal = this.handleShareModal.bind(this) // Handle share model
        this.hideActionButtons = this.hideActionButtons.bind(this) // Hide action buttons
        this.handleProfileDropdown = this.handleProfileDropdown.bind(this) // Handle profile dropdown
        this.closeProfileDropdown = this.closeProfileDropdown.bind(this) // Close provide dropdown
        this.handleFeedbackMessage = this.handleFeedbackMessage.bind(this) // Open feedback message
        this.closeFeedbackMessage = this.closeFeedbackMessage.bind(this) // Close feedback message
        this.submitFeedbackMessage = this.submitFeedbackMessage.bind(this) // Close feedback message
        this.handleMessageOnChange = this.handleMessageOnChange.bind(this) // Close feedback message
        this.getGeneralList = this.getGeneralList.bind(this) // Get general list
        this.checkInfinity = this.checkInfinity.bind(this) // Check infinity value

    }

    // componentDidMount(){
        
    // }

    getGeneralList = () => {
        var token = localStorage.getItem('token');
        var userId = localStorage.getItem('userID');
        if(token){

            let proxyurl = "https://quiet-retreat-79741.herokuapp.com/";
            let BaseUrl = `https://www.breathconductor.com/api/v2/general/list?user_id=${userId}`;

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

            this.setState({
                ...this.state,
                loading: true
            })

            fetch(proxyurl+BaseUrl, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                this.setGeneralList(result.data)
                this.setState({
                    ...this.state,
                    loading: false
                })
            })
            .catch(error => console.log('error', error));
        }

        const timer = setTimeout(() => {
            this.setState({
                time: "1 min",
                narration: "Full",
                theme: "Earth"
            })
        }, 1000);
        return () => clearTimeout(timer);
    }

    setGeneralList = (data) => {
        let goal_list = data.goal_list;
        let narration_list = data.narration_list;
        let time_list = data.duration_minutes;
        let theme_list = data.theme_list;
        //Get goal options
        let goalOptions = goal_list.map(item => {
            let id = item.goalID;
            let name = item.title;
            const optionList = {id, name, ...item}
            return optionList;
        })
        //Get time options
        let timeOptions = time_list.map(item => {
            let id = item.durationMinuteID;
            let name = item.minute === '-1' ? "Infinity" : item.minute+' min'
            //let infinity = item.minute === '-1' ? "Infinity" : item.minute+' min'
            const optionList = {id, name, ...item}
            return optionList;
        })
        //Get narration options
        let narrationOptions = narration_list.map(item => {
            let id = item.narrationID;
            let name = item.title;
            const optionList = {id, name, ...item}
            return optionList;
        })
        //Get theme options
        let themeOptions = theme_list.map(item => {
            let id = item.themeID;
            let name = item.title;
            const optionList = {id, name, ...item}
            return optionList;
        })
        this.setState({
            generalList: data,
            goalOptions,
            timeOptions,
            timeOptionsArray: timeOptions,
            narrationOptions,
            themeOptions
        })
        //console.log(goalOptions, timeOptions, narrationOptions, themeOptions)
    }




    // Profile dropdown function
    handleProfileDropdown = () => {
        this.setState({
            expanded: !this.state.expanded
        });
        //console.log("I'm clicked");
    }

    closeProfileDropdown = () => {
        const {expanded} = this.state;
        if(expanded === true){
            this.setState({
                expanded: false
            })
        }
    }
    
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

    //Check infinity on change/Reset session data
    resetSessionData = (value) => {
        const { timeOptionsArray } = this.state;
        if(value === "Relax"){
            const newtimeOptions = timeOptionsArray.filter(option => option.name !== "Infinity");
            console.log(newtimeOptions)
            this.setState({
                timeOptions: newtimeOptions,
                time: "Select",
                narration: "Select",
                theme: "Select"
            })
        }else if(value === "Balance"){
            this.setState({
                timeOptions: timeOptionsArray,
                time: "Select",
                narration: "Select",
                theme: "Select"
            })
        }
    }

    // Check infinity on load component
    checkInfinity = (value) => {
        const { timeOptionsArray } = this.state;
        if(value === "Relax"){
            const newtimeOptions = timeOptionsArray.filter(option => option.name !== "Infinity");
            console.log(newtimeOptions)
            this.setState({
                timeOptions: newtimeOptions
            })
        }else if(value === "Balance"){
            this.setState({
                timeOptions: timeOptionsArray
            })
        }
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            [e.target.name]: value,
            themePopup: false,
            goalPopup: false,
            timePopup: false,
            narrationPopup: false,
        })
        this.resetSessionData(value); // Reset session data
        if(value === "Infinity"){
            this.setState({
                narration: 'No narration',
                theme: "Select",
                narrationOptions: [
                    {id: "NULL", name: "No narration"}
                ]
            })
        }else if(value === "1 min" || value === "2 min" || value === "5 min"){
            this.setState({
                //[e.target.name]: value,
                narration: "Select",
                theme: "Select"
            })
        }else{
            this.setState({
                [e.target.name]: value
            })
        }
    }

    // Handle theme popup show
    handleThemePopUp = () => {
        const {narration} = this.state;
        if(narration === "Select") return false;
        this.setState({
            themePopup: true
        });
    }

    // Handle time popup show
    handleTimePopUp = () => {
        const { goal } = this.state;
        if(goal === "Select") return false
        this.setState({
            timePopup: true
        });
    }

    // Handle time popup show
    handlenarrationPopUp = () => {
        const {time, narration} = this.state
        if(time === 'Select' || narration === 'No narration') return false;
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

    handlePopUpAction = () => {
        const { goalPopup, timePopup, themePopup, narrationPopup} = this.state
        if(goalPopup !== false){
            this.setState({
                goalPopup: false
            })
        }
        if(timePopup !== false){
            this.setState({
                timePopup: false
            })
        }
        if(themePopup !== false){
            this.setState({
                themePopup: false
            })
        }
        if(narrationPopup !== false){
            this.setState({
                narrationPopup: false
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
            time: "1 min",
            theme: "Earth",
            narration: "Full",   
            themePopup: false,
            timePopup: false,
            goalPopup: false,
            narrationPopup: false         
        })
    }

    getId = (optionArray, optionName) => {
        const returnOption = optionArray.filter(option => {
            let selectedOption = option.name === optionName;
            const getOptions = selectedOption;
            return getOptions;
        })
        return returnOption;
    }

    // handle confirmation for welcome screen
    handleHomeStart = () => {
        const {goal, time, theme, narration} = this.state;

        if(theme === "Select"){
            alert("Please select theme")
        }else{
            this.setState({
                sowoFeelOption: true
            });

            // get goal id
            const goalOption = this.getId(this.state.goalOptions, goal);
            const goalId = goalOption[0].id ? goalOption[0].id : null;

            // get time id
            const timeOption = this.getId(this.state.timeOptions, time);
            const timeId = timeOption[0].id ? timeOption[0].id : null;
            
            // get narration id
            const narrationOption = this.getId(this.state.narrationOptions, narration);
            
            console.log('Narration Option: ', narrationOption);
            
            const nId = narrationOption[0].id ? narrationOption[0].id : null;
            const narrationId = time === "Infinity" ? "NULL" : nId;

            // get theme id
            const themeOption = this.getId(this.state.themeOptions, theme);
            const themeId = themeOption[0].id ? themeOption[0].id : null;
            

            let token = localStorage.getItem('token');
            let proxyurl = "https://quiet-retreat-79741.herokuapp.com/";
            let fetchUrl = `https://www.breathconductor.com/api/v2/exercise/search?goal_id=${goalId}&narration_id=${narrationId}&theme_id=${themeId}&duration_minute_id=${timeId}&output=EXERCISE`;

            // https://www.breathconductor.com/api_v1/exercise/search_exercise?goal_id=${goalId}&narration_id=${narrationId}&theme_id=${themeId}&duration_minute_id=${timeId}

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
                let hasVideo = resultjson.data.data_found;
                let message = resultjson.message;

                console.log('goal Id: ', goalId, 'time id: ', timeId, 'narration Id: ', narrationId, 'theme Id: ', themeId);

                this.setState({
                    timeId,
                    hasVideo
                })

                if(hasVideo){
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
                        action: changeActionState,
                    })
                }else{
                    this.setState({
                        videoFallback: message,
                    });
                }
                console.log(resultjson)
            })
            .catch(error => {
                console.log('error', error);
            });
        }
        

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

    // Handle feedback message from video 
    handleFeedbackMessage = () => {
        this.setState({
            showTutorial: false,
            showReplay: false,
            feedback: true,
        })
    }

    // Close feedback message 
    closeFeedbackMessage = () => {
        this.setState({
            showTutorial: false,
            feedback: false,
            showReplay: true,
        })
    }

    handleMessageOnChange = (e) => {
        let value = e.target.value;
        this.setState({
            feedbackMessage: value,
        });
        console.log(value)
    }

    submitFeedbackMessage = (e) => {
        e.preventDefault();
        const {feedbackMessage, exercise_id} = this.state;
        let token = localStorage.getItem('token');
        let proxyurl = "https://quiet-retreat-79741.herokuapp.com/";
        let fetchUrl = "https://www.breathconductor.com/api_v1/exercise/feedback"

        var myHeaders = new Headers();
        myHeaders.append("device-id", "1");
        myHeaders.append("timezone", "UTC");
        myHeaders.append("device-type", "1");
        myHeaders.append("Authorization", `Bearer ${token}`);

        var formdata = new FormData();
        formdata.append("exercise_id", exercise_id);
        formdata.append("description", feedbackMessage);

        var requestOptions = {
        method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        if(feedbackMessage !== ""){  
            this.setState({
                errorMessage: "processing your request please wait",
                processing: true
            }) 
            fetch(proxyurl + fetchUrl, requestOptions)
            .then(response => response.text())
            .then(result => {
                let errorStatus = result.status === "error" ? true : false;
                this.closeFeedbackMessage();
                this.setState({
                    errorMessage: result.message,
                    error: errorStatus,
                    processing: false
                });
                console.log(result)
            })
            .catch(error => console.log('error', error));
        }else{
            this.setState({
                errorMessage: 'Please write some feedback!'
            })
        }
            
    }

    //handleFeedback 
    handleFeedback = () => {
        this.setState({
            showReplay: false,
            showTutorial: false,
            goHome: true,
            goal: "Relax",
            time: "1 min",
            theme: "Earth",
            narration: "Full",
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
            feedback: false,
            setFeeling: 3
        });
        this.reSetSession();
        localStorage.removeItem('sessionData');
        this.closeProfileDropdown()
    }

    setWelcome = () => {
        this.setState({
            showWelcome: true,
            goHome: false,
            sowoFeelOption: false,
            showTutorial: false,
            showReplay: false,
            feedback: false,
        });
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
                setWelcome: this.setWelcome,

                handleChange: this.handleChange,
                handlePopUpAction: this.handlePopUpAction,
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
                handleProfileDropdown: this.handleProfileDropdown,
                closeProfileDropdown: this.closeProfileDropdown,
                handleFeedbackMessage: this.handleFeedbackMessage,
                closeFeedbackMessage: this.closeFeedbackMessage,
                handleMessageOnChange: this.handleMessageOnChange,
                submitFeedbackMessage: this.submitFeedbackMessage,
                getGeneralList: this.getGeneralList,
                checkInfinity: this.checkInfinity,
            }}>
                {this.props.children}
            </BreathContext.Provider>
        )
    }
}

const BreathConsumer = BreathContext.Consumer;

export { BreathContext, BreathProvider, BreathConsumer };
