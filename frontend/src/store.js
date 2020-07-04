import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { createSecretReducer, getSecretReducer, refreshSecretReducer } from './reducers/secretReducer';
import { userSigninReducer, userRegisterReducer } from './reducers/userReducer';
import { listSecretReducer } from './reducers/adminReducers';

const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = { userSignin: { userInfo }};

const reducer = combineReducers({
    linkSecret: createSecretReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    secretObtain: getSecretReducer,
    isFreshSecret: refreshSecretReducer, 
    listSecret: listSecretReducer
});

const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;