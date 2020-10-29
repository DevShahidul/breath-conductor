import React, {Component, Fragment} from 'react';
import TopNavigation from "../Component/TopNavigation";
import Favorites from "../Component/Favorites";

class FavoritesPage extends Component {
    render() {
        return (
            <Fragment>
                <Favorites/>
            </Fragment>
        );
    }
}

export default FavoritesPage;