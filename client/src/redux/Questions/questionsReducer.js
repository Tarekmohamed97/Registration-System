import {FETCH_QUESTIONS} from './questionsTypes'


const initialState = {
    questions: [
        {
            questionBody: 'What is the capital of Egypt?',
            answer1: 'Giza',
            answer2: 'Cairo',
            answer3: 'Alexandria',
            answer4: 'Daqahlya',
            correctAnswer: 'Cairo'
        },
        {
            questionBody: 'What is the capital of USA?',
            answer1: 'NewYork',
            answer2: 'Wachington DC',
            answer3: 'California',
            answer4: 'Nevada',
            correctAnswer: 'Wachington DC'
        },
        {
            questionBody: 'What is the capital of Saudi Arabia?',
            answer1: 'Ryad',
            answer2: 'Gadda',
            answer3: 'El dahal',
            answer4: 'El madina',
            correctAnswer: 'Ryad'
        },
        {
            questionBody: 'What is the sum of  (4 + 9) ?',
            answer1: '12',
            answer2: '4',
            answer3: '14',
            answer4: '13',
            correctAnswer: '13'
        },
        {
            questionBody: 'What is the sum of  (10 + 9) ?',
            answer1: '13',
            answer2: '17',
            answer3: '4',
            answer4: '19',
            correctAnswer: '19'
        }
    ]
}

const QuestionsReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_QUESTIONS:
            return {
                ...state
            }
        default:
            return state
    }
}

export default QuestionsReducer