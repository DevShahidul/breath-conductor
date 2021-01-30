import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import ResetPasswordPage from "../Pages/ResetPasswordPage";
import LoginPage from "../Pages/LoginPage";
import SignupPage from "../Pages/SignupPage";
import HomePage from "../Pages/HomePage";
//import SurveyPage from "../Pages/SurveyPage";
import SettingPage from "../Pages/SettingPage";
import LibraryPage from "../Pages/LibraryPage";
import HistoryPage from "../Pages/libraryHistory";
import FavoritiesDetailsPage from "../Pages/FavoritiesDetailsPage";
import HistoryDetailsPage from "../Pages/HistoryDetailsPage";
import { ErrorPage } from "../Pages/ErrorPage";
import { Protected } from '../Component';
import { TermsOfService } from '../Pages/TermsOfService';
import Support from '../Pages/Support';
import AppleCallback from '../Pages/AppleCallback';

class AppRoute extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/apple/callback" component={AppleCallback} />
                <Route exact path="/resetpassword" component={ResetPasswordPage} />
                <Route exact path="/signup" component={SignupPage} />
                <Route exact path="/">
                    <Protected page={HomePage} />
                </Route>
                <Route exact path="/library">
                    <Protected page={LibraryPage} />
                </Route>
                <Route exact path='/library/:id' component={FavoritiesDetailsPage} />
                <Route exact path="/history">
                    <Protected page={HistoryPage} />
                </Route>
                <Route exact path='/history/:id' component={HistoryDetailsPage} />
                <Route exact path="/setting">
                    <Protected page={SettingPage} />
                </Route>
                <Route exact path="/terms">
                    <Protected page={TermsOfService} />
                </Route>
                <Route exact path="/support">
                    <Protected page={Support} />
                </Route>
                <Route component={ErrorPage} />
            </Switch>        
        );
    }
}

export default AppRoute;