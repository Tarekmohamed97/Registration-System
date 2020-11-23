import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthSwitch from '../auth/authSwitch';
import './header.css'

function Header() {


    return (
        <div className = "header__container">
            <div>
                <Link to = "/">
                    <h1 className = "Logo__title">MERN</h1>
                </Link>
            </div>
            <AuthSwitch />
        </div>
    )
}

export default Header
