import React, {useContext} from 'react';
import {UserContext} from '../../../context/userContext'

function Profile() {

    const {userData, setUserData} = useContext(UserContext);

    return (
        <div>
            {userData.user? <p>{userData.user.displayname}</p> : null }
        </div>
    )
}

export default Profile
