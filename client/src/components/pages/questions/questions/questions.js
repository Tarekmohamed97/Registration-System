import React, {useEffect, useState} from 'react'
import { fetchQuestions_action } from '../../../../redux/actions';
import {connect} from 'react-redux';
import { useHistory } from 'react-router-dom';
import AOS from 'aos';
import "aos/dist/aos.css";
import './questions.css'


function Questions({questions, fetchQuestions_action}) {

    const [userScore, setUserScore] = useState(0);
    let [currentQuestion, setCurrentQuestion] = useState(0);
    let [shuffledQuestions, setShuffledQuestions] =  useState([]);
    const [flag, setFlag] = useState(true);
    const [showScore, setShowScore] = useState(false);
    const history = useHistory();


    const shuffleArray = (array) => {
        let currentIndex = array.length;
        let temporaryElement, randomIndex;

        while(currentIndex !== 0){
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryElement = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryElement;
        }
        return array;
    }

    useEffect(() => {
        fetchQuestions_action();
        setFlag(true);
        AOS.init({
            duration : 1000
          });
    }, [])


    if(questions.questions.length !== 0 && flag){
            setShuffledQuestions(shuffleArray(questions.questions));
            setFlag(false) 
    }


    const handleScore = (e, currentQuestion) => {
        e.preventDefault()
        const quizForm = document.querySelector('#quizForm');
        if(quizForm.answer1.checked){
            if(quizForm.answer1.value === shuffledQuestions[currentQuestion].correctAnswer){
                setUserScore(userScore+1)
            }
            else{
                setUserScore(userScore)
            }
        }
        if(quizForm.answer2.checked){
            if(quizForm.answer2.value === shuffledQuestions[currentQuestion].correctAnswer){
                setUserScore(userScore+1)
            }
            else{
                setUserScore(userScore)
            }
        }
        if(quizForm.answer3.checked){
            if(quizForm.answer3.value === shuffledQuestions[currentQuestion].correctAnswer){
                setUserScore(userScore+1)
            }
            else{
                setUserScore(userScore)
            }
        }
        if(quizForm.answer4.checked){
            if(quizForm.answer4.value === shuffledQuestions[currentQuestion].correctAnswer){
                setUserScore(userScore+1)
            }
            else{
                setUserScore(userScore)
            }
        }
        if(currentQuestion < shuffledQuestions.length-1)
            setCurrentQuestion(currentQuestion + 1)
    }

    return (
        <div>
            {
                !showScore && shuffledQuestions.length !== 0? (
                    <div className = "questionSection__container" key = {currentQuestion}>
                        <form id = "quizForm">
                            <label className = "questionBody__section">{shuffledQuestions[currentQuestion].questionBody}</label>
                            <div data-aos = "fade-left" className = "singleOption__section">
                                <input name = "answer1" id = "answer1" type= "radio" value = {shuffledQuestions[currentQuestion].answer1} />
                                <label htmlFor = {shuffledQuestions[currentQuestion].answer1}>{shuffledQuestions[currentQuestion].answer1}</label>
                            </div>
                            <div data-aos = "fade-left" className = "singleOption__section">
                                <input name = "answer2" id = "answer2" type= "radio" value = {shuffledQuestions[currentQuestion].answer2} />
                                <label htmlFor = {shuffledQuestions[currentQuestion].answer2}>{shuffledQuestions[currentQuestion].answer2}</label>
                            </div>
                            <div data-aos = "fade-left" className = "singleOption__section">
                                <input name = "answer3" id = "answer3" type= "radio" value = {shuffledQuestions[currentQuestion].answer3} />
                                <label htmlFor = {shuffledQuestions[currentQuestion].answer3}>{shuffledQuestions[currentQuestion].answer3}</label>
                            </div>
                            <div data-aos = "fade-left" className = "singleOption__section">
                                <input name = "answer4" id = "answer4" type= "radio" value = {shuffledQuestions[currentQuestion].answer4} />
                                <label htmlFor = {shuffledQuestions[currentQuestion].answer4}>{shuffledQuestions[currentQuestion].answer4}</label>
                            </div>
                            {
                                currentQuestion+1 === shuffledQuestions.length?( 
                                    <div>
                                        <button onClick = {(e) =>{
                                         e.preventDefault()
                                         setShowScore(true)
                                        }}
                                         data-aos = 'fade-up'
                                         className = "quizButtons__section"
                                         >ShowScore</button>
                                    </div>
                                ) : <div>
                                        <button onClick = {(e) =>
                                        handleScore(e, currentQuestion)
                                        }
                                        data-aos = 'fade-up'
                                        className = "quizButtons__section"
                                        >Next</button>
                                    </div>
                            }
                        </form>
                    </div>
                ) : (
                    <div className = "userScore__section">
                        <h3 data-aos = "fade-down">Your Score is {userScore}</h3>
                        <button data-aos = "fade-up" className = "quizButtons__section" onClick = {() => history.push('/questions/introduction')}>
                            Try Again
                        </button>
                    </div>
                )
            }
        </div>
    )
}


const mapStateToProps = state => {
    return{
        questions: state.questions
    }
}


const mapDispatchToProps = dispatch => {
    return {
        fetchQuestions_action : () => dispatch(fetchQuestions_action())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Questions)
