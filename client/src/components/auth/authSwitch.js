import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import './authSwitch.css';
import {UserContext} from '../../context/userContext'

function AuthSwitch() {

    const {userData, setUserData} = useContext(UserContext); 

    const history = useHistory();

    const register = () => {
        history.push('/register');
    }

    const login = () => {
        history.push('/login');
    }

    const logout = () => {
        setUserData({
            token: undefined,
            user:undefined
        });
        localStorage.setItem("auth-token", " ")
    }

    return (
        <div className = "buttons__section">
            {
                userData.user? <button onClick = {logout} className = "registerButton__section">Log out</button> :
                <>
                <button className = "registerButton__section" onClick = {register}>Register</button>
                <button className = "registerButton__section" onClick = {login}>Log in</button>
                </>
            }
        </div>
    )
}

export default AuthSwitch
