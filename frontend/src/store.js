import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { createSecretReducer } from './reducers/createSecretReducer';
import { userSigninReducer } from './reducers/userReducer';

const initialState = [];

const reducer = combineReducers({
    createSecret: createSecretReducer,
    userSignin: userSigninReducer,
});

const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;