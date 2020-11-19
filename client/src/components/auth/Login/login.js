import React, {useContext, useState} from 'react';
import axios from 'axios';
import '../Register/register.css';
import {UserContext} from '../../../context/userContext'
import { useHistory } from 'react-router-dom';


function Login() {

    const [state, setState] = useState({
        email: "",
        password: ""
    })

    const {setUserData} = useContext(UserContext);
    const history = useHistory()

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.id ]: e.target.value
        })
    }

    const submitForm = async (e) => {
        e.preventDefault()
        const {email, password} = state;
        const loginRes = await axios.post('http://localhost:5000/users/login', {email, password});
        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user
        });
        localStorage.setItem('auth-token', loginRes.data.token);
        history.push('/profile');
    };



    return (
        <div style = {{width: '100%'}}>
            <div className = "form__Container">
                <h1>Log in</h1>
                <form onSubmit = {submitForm} className = "inputs__container">
                    <div className = "inputForm__section">
                        <label>email:</label>
                        <input id = "email" type = "email" onChange = {(e) => handleChange(e)} />
                    </div>
                    <div className = "inputForm__section">
                        <label>Password:</label>
                        <input id = "password" type = "password" onChange = {(e) => handleChange(e)}/>
                    </div>
                    <div>
                        <button className = "submitButton__form" type = "submit">Log in</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
