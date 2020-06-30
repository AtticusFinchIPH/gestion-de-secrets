import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { createSecretReducer, getSecretReducer } from './reducers/secretReducer';
import { userSigninReducer } from './reducers/userReducer';

const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = { userSignin: { userInfo }};

const reducer = combineReducers({
    linkSecret: createSecretReducer,
    userSignin: userSigninReducer,
    secretObtain: getSecretReducer
});

const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;