import React, {Component, Fragment} from 'react';
import Navigation from "../Component/Navigation";
import Library from "../Component/Library";

class LibraryPage extends Component {
    render() {
        return (
            <Fragment>
                <Navigation/>
                <Library/>
            </Fragment>
        );
    }
}

export default LibraryPage;