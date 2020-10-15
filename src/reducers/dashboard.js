import {
  CREATE_MARKET_ACTION_TYPES
} from "../actions/actionTypes";


const {
  CREATE_MARKET_FULFILLED,
  CREATE_MARKET_REJECTED,
  CREATE_MARKET_REQUEST
} = CREATE_MARKET_ACTION_TYPES;


const initialState = {
  error: false,
  errorMsg: null,
  loading: false,
  created: false,
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

    default:
      return state;
  }
}

export default dashReducer;