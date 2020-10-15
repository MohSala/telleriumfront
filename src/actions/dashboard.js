import axios from 'axios';

import {
  CREATE_MARKET_ACTION_TYPES,
  ADD_IMAGES_ACTION_TYPES,
  GET_MARKET_ACTION_TYPES
} from "./actionTypes";


const {
  CREATE_MARKET_FULFILLED,
  CREATE_MARKET_REJECTED,
  CREATE_MARKET_REQUEST
} = CREATE_MARKET_ACTION_TYPES;

const {
  ADD_IMAGES_FULFILLED,
  ADD_IMAGES_REJECTED,
  ADD_IMAGES_REQUEST
} = ADD_IMAGES_ACTION_TYPES

const {
  GET_MARKET_FULFILLED,
  GET_MARKET_REJECTED,
  GET_MARKET_REQUEST
} = GET_MARKET_ACTION_TYPES


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

const getMarket = (data) => {
  return async (dispatch) => {
    dispatch(getMarketRequest());
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/market`, {}
      );
      const result = response.data.data;
      console.log('data', result);
      return dispatch(getMarketFulfilled(result));
    } catch (e) {
      console.log(e);
      dispatch(getMarketRejected(e));
    }
  };
};

const addImages = (id, data) => {
  const file = new FormData()
  file.append('photos', data)

  return async (dispatch) => {
    dispatch(addImagesRequest());
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/market/uploadImages/${id}`,
        file,


      );
      const result = response.data.data;
      console.log('data', result);
      return dispatch(addImagesFulfilled(result));
    } catch (e) {
      console.log(e);
      dispatch(addImagesRejected(e));
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

const getMarketRequest = () => ({
  type: GET_MARKET_REQUEST,
});

const getMarketFulfilled = data => ({
  type: GET_MARKET_FULFILLED,
  payload: data
});

const getMarketRejected = (data) => ({
  type: GET_MARKET_REJECTED,
  payload: data
});

const addImagesRequest = () => ({
  type: ADD_IMAGES_REQUEST,
});

const addImagesFulfilled = data => ({
  type: ADD_IMAGES_FULFILLED,
  payload: data
});

const addImagesRejected = (data) => ({
  type: ADD_IMAGES_REJECTED,
  payload: data
});


export { creatMarket, addImages, getMarket }