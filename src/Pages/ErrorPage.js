import React from 'react';
import { Link } from 'react-router-dom'

export const ErrorPage = () => {
    return (
        <div className="container">
            <div className="container-inner error-page-inner">
                <h2 className="session-title ">😥 Ops 404 error!!! </h2>
                {/* <Link to="/feel"></Link> */}
                <Link to="/"  className="btn btn-primary">Go back home</Link>
            </div>
        </div>
    )
}
