import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk'

import rootReducer from '../reducers'

export const configureStore = () => {
    const middleware = [thunk, logger];
    const store = createStore(rootReducer, compose(applyMiddleware(...middleware)))
    return store
};