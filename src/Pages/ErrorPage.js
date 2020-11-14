import React, {useContext} from 'react';
import { Link } from 'react-router-dom'
import {BreathContext} from '../context';

export const ErrorPage = () => {
const {closeProfileDropdown} = useContext(BreathContext);

    return (
        <div className="container" onClick={closeProfileDropdown}>
            <div className="container-inner error-page-inner">
                <div className="contents-wrap">
                    <h2 className="session-title ">😥 Ops 404 error!!! </h2>
                    <Link to="/"  className="btn btn-primary">Go back home</Link>
                </div>
            </div>
        </div>
    )
}
