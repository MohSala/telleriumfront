import {
  CREATE_MARKET_ACTION_TYPES,
  ADD_IMAGES_ACTION_TYPES,
  GET_MARKET_ACTION_TYPES
} from "../actions/actionTypes";


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
} = GET_MARKET_ACTION_TYPES;


const initialState = {
  error: false,
  errorMsg: null,
  loading: false,
  fetched: false,
  markets: null,
  created: false,
  added: false,
  data: null
}

const dashReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MARKET_REQUEST:
      return {
        ...state,
        loading: true
      }

    case CREATE_MARKET_FULFILLED:
      return {
        ...state,
        loading: false,
        created: true,
        data: action.payload
      }

    case CREATE_MARKET_REJECTED:
      return {
        ...state,
        loading: false,
        created: false,
        errorMsg: action.payload.response
      }

    case GET_MARKET_REQUEST:
      return {
        ...state,
        loading: true
      }

    case GET_MARKET_FULFILLED:
      return {
        ...state,
        loading: false,
        fetched: true,
        markets: action.payload
      }

    case GET_MARKET_REJECTED:
      return {
        ...state,
        loading: false,
        fetched: false,
        errorMsg: action.payload.response
      }

    case ADD_IMAGES_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ADD_IMAGES_FULFILLED:
      return {
        ...state,
        loading: false,
        added: true,
        data: action.payload
      }

    case ADD_IMAGES_REJECTED:
      return {
        ...state,
        loading: false,
        added: false,
        errorMsg: action.payload.response
      }

    default:
      return state;
  }
}

export default dashReducer;