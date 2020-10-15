import axios from 'axios';

import {
  CREATE_MARKET_ACTION_TYPES
} from "./actionTypes";


const {
  CREATE_MARKET_FULFILLED,
  CREATE_MARKET_REJECTED,
  CREATE_MARKET_REQUEST
} = CREATE_MARKET_ACTION_TYPES;


const BASE_URL = "http://127.0.0.1:7500";


// THUNKS
const creatMarket = (data) => {
  return async (dispatch) => {
    dispatch(creatMarketRequest());
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/market`,
        data
      );
      const result = response.data.data;
      console.log('data', result);
      return dispatch(creatMarketFulfilled(result));
    } catch (e) {
      console.log(e);
      dispatch(creatMarketRejected(e));
    }
  };
};

// ACTION CREATORS

const creatMarketRequest = () => ({
  type: CREATE_MARKET_REQUEST,
});

const creatMarketFulfilled = data => ({
  type: CREATE_MARKET_FULFILLED,
  payload: data
});

const creatMarketRejected = (data) => ({
  type: CREATE_MARKET_REJECTED,
  payload: data
});


export { creatMarket }