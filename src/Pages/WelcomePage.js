import React from 'react'
import { Navigation, Welcome } from '../Component';

const WelcomePage = () => {
    return (
        <>
            <Navigation/>
            <div className="container">
                <Welcome />
            </div>
        </>
    )
}

export default WelcomePage;