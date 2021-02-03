import React, {useContext} from 'react';
import {BreathContext} from '../context';

const AppleCallback = () => {
const {closeProfileDropdown} = useContext(BreathContext);
    return (
        <div className="container" onClick={closeProfileDropdown}>
            <div className="container-inner">
                <div className="contents-wrap">
                    <h1 style={{color: "white"}}>This is apple callback page</h1>
                </div>
            </div>
        </div>
    )
}

export default AppleCallback
