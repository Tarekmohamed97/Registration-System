import {combineReducers} from 'redux';
import QuestionsReducer from './Questions/questionsReducer'


const rootReducer = combineReducers({
    questions: QuestionsReducer
})

export default rootReducer;