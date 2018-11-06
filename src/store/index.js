import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import auth from './auth/reducer';
import profile from './profile/reducer';

export const reducer = combineReducers({
    auth,
    profile
});

export const store = createStore(reducer, applyMiddleware(thunk));

if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./', () => store.replaceReducer(reducer))
}