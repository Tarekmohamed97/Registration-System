import {FETCH_QUESTIONS} from './questionsTypes'


export const fetchQuestions_action = () => {
    return {
        type: FETCH_QUESTIONS,
    }
}