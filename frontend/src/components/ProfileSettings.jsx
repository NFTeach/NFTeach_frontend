import React from 'react';
import moralis, { Moralis } from "moralis";

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

const ProfileSettings = () => {
    
    return (
        <>
        <h1>Profile Settings!</h1>
        </>
    )
}

export default ProfileSettings
