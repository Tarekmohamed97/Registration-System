import React, {useState, useContext} from 'react';
import Axios from 'axios'
import './register.css';
import {UserContext} from '../../../context/userContext'
import { useHistory } from 'react-router-dom';

function Register() {

    const {setUserData} = useContext(UserContext);
    const history = useHistory()

    const [state, setState] = useState({
        displayname: "",
        email: "",
        password: "",
        checkpassword: ""
    })

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.id]: e.target.value
         });
    }

    
    const submitForm = async (e) => {
        e.preventDefault();


        try{
            await Axios.post("http://localhost:5000/users/register", {
                email: state.email,
                displayname: state.displayname,
                password: state.password,
                passwordCheck: state.checkpassword
            });
            const loginRes = await Axios.post('http://localhost:5000/users/login', {
                email: state.email,
                password: state.password
            })
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            })
            localStorage.setItem('aut-token', loginRes.data.token);
            history.push('/')
        } catch (e) {
            console.log(e.message)
        }   
    };

    return (
        <div style = {{width: '100%'}}>
            <div className = "form__Container">
                <h1>Sign Up</h1>
                <form onSubmit = {submitForm} className = "inputs__container">
                    <div className = "inputForm__section">
                        <label>Username:</label>
                        <input id = "displayname" type = "text" onChange = {(e) => handleChange(e)} />
                    </div>
                    <div className = "inputForm__section">
                        <label>Email:</label>
                        <input id = "email" type = "email" onChange = {(e) => handleChange(e)} />
                    </div>
                    <div className = "inputForm__section">
                        <label>Password:</label>
                        <input id = "password" type = "password" onChange = {(e) => handleChange(e)}/>
                    </div>
                    <div className = "inputForm__section">
                        <label>Confirm password:</label>
                        <input id = "checkpassword" type = "password" onChange = {(e) => handleChange(e)}/>
                    </div>
                    <div>
                        <button className = "submitButton__form" type = "submit">Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
