import React, {useContext, useEffect} from 'react'
import { Redirect } from 'react-router-dom';
import { Navigation, Welcome } from '../Component';
import { BreathContext } from '../context';

const WelcomePage = () => {
    const { goHome } = useContext( BreathContext );
    const token = sessionStorage.getItem('token')
    useEffect(() => {
        if(token && goHome){
            <Redirect to="/home" />
        }
    })
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