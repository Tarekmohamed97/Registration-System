import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
//import { addUser_action } from '../../redux/users/userActions';
import { useHistory } from 'react-router-dom';
import './questionsIntro.css';
import AOS from 'aos';
import "aos/dist/aos.css";


function QuestionsIntro({addUser_action}) {

    const [userName, setUserName] = useState('');
    const [error, setError] = useState('')
    const history = useHistory()

    const handleEnrollUser = () => {
        if(!userName){
            setError('Please Enter a valid name')
        }
        else {
            //addUser_action(userName);
            history.push('/questions/main')
        }
    }

    useEffect(() => {
        AOS.init({
            duration : 1000
          });
    })

    return (
        <div className = "container">
            <div data-aos = "fade-down" className = "heading__Container">
                <h1>Welcome to Our Quiz</h1>
                <h2>Please Enter Your Name</h2>
            </div>
            <div data-aos = "fade-up" className = "inputContainer">
                <input type = 'text' onChange = {(e) => setUserName(e.target.value)} />
            </div>
            {
                error? <div className = "error__container">
                            <span style = {{color: 'red', textAlign: 'center'}}>{error}</span>
                        </div> : null
            }
            <div data-aos = "fade-up" className = "enrollButton__container">
                <button className = "enrolButton" onClick = {handleEnrollUser}>
                    Enroll
                </button>
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //addUser_action : () => dispatch(addUser_action())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuestionsIntro)
