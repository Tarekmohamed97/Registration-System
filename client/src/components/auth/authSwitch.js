import React, {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import './authSwitch.css';
import {UserContext} from '../../context/userContext';
import Unknown from '../../images/Unknown_person.jpg';

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
        localStorage.setItem("auth-token", " ");
        history.push('/');
    }

    return (
        <div className = "buttons__section">
            {
                userData.user? (
                    <div className = "userData-Section__header">
                        <div className = "userData--photo__header__section">
                            <img src = {Unknown} alt = "unknown"/>
                            <p className = "userName__Section__header">{userData?.user.displayname}</p>
                            <div className="userDropDownOptionContent__section">
                                <div  className = "dropDown__option">
                                    <Link  to = "/profile" style = {{outline: "none", color: "white"}}>My Profile</Link>
                                </div>
                                <div  className = "dropDown__option">
                                    <span>Log out</span>
                                </div>
                            </div>
                        </div>
                    </div>     
                ) :
                <>
                <button className = "registerButton__section" onClick = {register}>Register</button>
                <button className = "registerButton__section" onClick = {login}>Log in</button>
                </>
            }
        </div>
    )
}

export default AuthSwitch
