import React from 'react'
import {useHistory} from 'react-router-dom'
import './authSwitch.css'

function AuthSwitch() {

    const history = useHistory();

    const register = () => {
        history.push('/register');
    }

    const login = () => {
        history.push('/login');
    }

    return (
        <div className = "buttons__section">
            <button className = "registerButton__section" onClick = {register}>Register</button>
            <button className = "registerButton__section" onClick = {login}>Log in</button>
        </div>
    )
}

export default AuthSwitch
