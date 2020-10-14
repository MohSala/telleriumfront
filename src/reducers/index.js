import { combineReducers } from "redux";

import authReducer from './auth';
// import dashReducer from './dashboard';

export default combineReducers({
    auth: authReducer,
    // dash: dashReducer,
})