import React, {Component, Fragment} from 'react';
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