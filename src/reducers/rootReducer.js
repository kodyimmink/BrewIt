import {combineReducers} from 'redux';
//import someReducer from './someReducer';

export default combineReducers({
    //something: someReducer
    message: console.log("Combining reducers")
})