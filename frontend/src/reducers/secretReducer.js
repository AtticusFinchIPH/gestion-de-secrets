import { CREATE_SECRET_REQUEST, CREATE_SECRET_SUCCESS, CREATE_SECRET_FAIL, GET_SECRET_REQUEST, GET_SECRET_SUCCESS, GET_SECRET_FAIL } from "../constants/secretConstants";

function createSecretReducer(state = { link: ""}, action){
    switch (action.type){
        case CREATE_SECRET_REQUEST:
            return {loading: true};
        case CREATE_SECRET_SUCCESS:
            return {loading: false, link: action.payload};
        case CREATE_SECRET_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function getSecretReducer(state = { secret: ""}, action){
    switch (action.type){
        case GET_SECRET_REQUEST:
            return {loading: true};
        case GET_SECRET_SUCCESS:
            return {loading: false, secret: action.payload};
        case GET_SECRET_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export {createSecretReducer, getSecretReducer};