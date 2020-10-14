import axios from 'axios';

import {
    LOGIN_WITH_EMAIL_ACTION_TYPES,
    CREATE_ACCOUNT_ACTION_TYPES,
} from "./actionTypes";


const {
    LOGIN_WITH_EMAIL_REQUEST,
    LOGIN_WITH_EMAIL_FULFILLED,
    LOGIN_WITH_EMAIL_REJECTED
} = LOGIN_WITH_EMAIL_ACTION_TYPES;


const {
    CREATE_ACCOUNT_REQUEST,
    CREATE_ACCOUNT_FULFILLED,
    CREATE_ACCOUNT_REJECTED
} = CREATE_ACCOUNT_ACTION_TYPES;

const BASE_URL = "http://127.0.0.1:7500";

// THUNKS
const loginWithEmail = data => {
    return async (dispatch) => {
        dispatch(loginWithEmailRequest());
        try {
            const response = await axios.post(
                `${BASE_URL}/api/v1/user/login`,
                data
            );
            const token = `Bearer ${response.data.data.token}`;
            const user = response.data.data;
            console.log('user', user);
            // save token and user details to local storage
            localStorage.setItem("token", token);
            localStorage.setItem("userId", user.data._id)
            return dispatch(loginWithEmailFulfilled(user));
        } catch (e) {
            console.log(e);
            dispatch(loginWithEmailRejected(e));
        }
    };
};

const createAccount = data => {
    console.log('entered register thunk');
    return async (dispatch) => {
        dispatch(createAccountRequest());
        try {
            const response = await axios.post(
                `${BASE_URL}/api/v1/user/create`,
                data
            );
            console.log(response)
            const token = `Bearer ${response.data.data.token}`;
            const user = response.data.data;
            console.log('user', user);
            // save token and user details to local storage
            localStorage.setItem("token", token);
            localStorage.setItem("userId", user.data._id)
            return dispatch(createAccountFulfilled(response));
        } catch (e) {
            console.log(e);
            dispatch(createAccountRejected(e));
        }
    };
};



// ACTION CREATORS

const loginWithEmailRequest = () => ({
    type: LOGIN_WITH_EMAIL_REQUEST,
});

const loginWithEmailFulfilled = user => ({
    type: LOGIN_WITH_EMAIL_FULFILLED,
    payload: user
});

const loginWithEmailRejected = (data) => ({
    type: LOGIN_WITH_EMAIL_REJECTED,
    payload: data
});

const createAccountRequest = () => ({
    type: CREATE_ACCOUNT_REQUEST
});

const createAccountFulfilled = data => ({
    type: CREATE_ACCOUNT_FULFILLED,
    payload: data
});

const createAccountRejected = (data) => ({
    type: CREATE_ACCOUNT_REJECTED,
    payload: data
});



export { loginWithEmail, createAccount }
