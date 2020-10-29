import React, {Component, Fragment} from 'react';
import TopNavigation from "../Component/TopNavigation";
import Favorites from "../Component/Favorites";
import {Link} from "react-router-dom";
import TopNavigationTwo from "../Component/TopNavigationTwo";
import Library from "../Component/Library";

class LibraryPage extends Component {
    render() {
        return (
            <Fragment>
                <TopNavigationTwo/>
                <Library/>
            </Fragment>
        );
    }
}

export default LibraryPage;