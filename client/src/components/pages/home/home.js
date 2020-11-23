import React, {useContext} from 'react'
import {UserContext} from '../../../context/userContext'

function Home() {

    const {userData, setUserData} = useContext(UserContext);

    return (
        <div>
            homee
        </div>
    )
}

export default Home
