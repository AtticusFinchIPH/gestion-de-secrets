const { GET_LIST_SECRET_REQUEST, GET_LIST_SECRET_SUCCESS, GET_LIST_SECRET_FAIL } = require("../constants/adminConstants");

function listSecretReducer(state = { secret: ""}, action){
    switch (action.type){
        case GET_LIST_SECRET_REQUEST:
            return {loading: true};
        case GET_LIST_SECRET_SUCCESS:
            return {loading: false, secrets: action.payload};
        case GET_LIST_SECRET_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export { listSecretReducer };