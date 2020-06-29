import { CREATE_SECRET_REQUEST, CREATE_SECRET_SUCCESS, CREATE_SECRET_FAIL } from "../constants/createSecretConstants";

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

export {createSecretReducer};