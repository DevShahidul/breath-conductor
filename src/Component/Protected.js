import React from 'react'
import { Redirect } from 'react-router-dom';

const Protected = (props) => {
    const Page = props.page;
    var token = localStorage.getItem('token');
    return token ? <Page /> : <Redirect to="/login" />; 
}

export default Protected;
