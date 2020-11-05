import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import SignupPage from "../Pages/SignupPage";
import HomePage from "../Pages/HomePage";
import SurveyPage from "../Pages/SurveyPage";
import SettingPage from "../Pages/SettingPage";
import LibraryPage from "../Pages/LibraryPage";
import FavoritiesDetailsPage from "../Pages/FavoritiesDetailsPage";
import HistoryPage from "../Pages/HistoryPage";
import HistoryDetailsPage from "../Pages/HistoryDetailsPage";

class AppRoute extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/signup" component={SignupPage}/>
                <Route exact path="/survey" component={SurveyPage}/>
                <Route exact path="/favorites" component={LibraryPage}/>
                <Route exact path="/favoritesdetails" component={FavoritiesDetailsPage}/>
                <Route exact path="/history" component={HistoryPage}/>
                <Route exact path="/historydetails" component={HistoryDetailsPage}/>
                <Route exact path="/setting" component={SettingPage}/>
                <Route exact path="/library" component={LibraryPage}/>
            </Switch>
        );
    }
}

export default AppRoute;