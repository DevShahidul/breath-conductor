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
import { ErrorPage } from "../Pages/ErrorPage";
import { Protected } from '../Component';

class AppRoute extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/"> 
                    <Protected page={HomePage} />
                </Route>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/signup" component={SignupPage}/>
                <Route exact path="/survey">
                    <Protected page={SurveyPage} />
                </Route>
                <Route exact path="/library/history">
                    <Protected page={HistoryPage} />
                </Route>
                <Route exact path="/library/history/:id">
                    <Protected page={HistoryDetailsPage} />
                </Route>
                <Route exact path="/setting">
                    <Protected page={SettingPage} />
                </Route>
                <Route exact path="/library">
                    <Protected page={LibraryPage} />
                </Route>
                <Route exact path="/library/:id" component={FavoritiesDetailsPage}>
                    <Protected page={FavoritiesDetailsPage} />
                </Route>
                <Route component={ErrorPage} />
            </Switch>
        );
    }
}

export default AppRoute;