import React, {useContext} from 'react';
import {UserContext} from '../../../context/userContext';
import {Link} from 'react-router-dom'
import './profile.css';
import Unknown from '../../../images/Unknown_person.jpg';

function Profile() {

    const {userData, setUserData} = useContext(UserContext);

    return (
        <div>
            <div className = "profileCard__container">
                <div className = "profileCard__Image__section">
                    <img src = {Unknown} alt = "unknown"/>
                </div>
                <div className = "userData__section">
                    {userData.user? <p>{userData.user.displayname}</p> : null }
                </div>
                <div className = "userButtons__Section">
                    <Link to = "/">
                        <button className = "userButton" >Home</button>
                    </Link>
                    <button className = "userButton">Start Quiz</button>
                    <button className = "userButton">My Scores</button>
                </div>
            </div>
        </div>
    )
}

export default Profile


