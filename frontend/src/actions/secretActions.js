import axios from 'axios';
import { CREATE_SECRET_REQUEST, CREATE_SECRET_SUCCESS, CREATE_SECRET_FAIL, GET_SECRET_REQUEST, GET_SECRET_SUCCESS, GET_SECRET_FAIL } from "../constants/secretConstants";

const createSecret = ({secret, password, lifetime}) => async (dispatch) => {
    try {
        const newSecret = {secret, password, lifetime};
        dispatch({
            type: CREATE_SECRET_REQUEST,
            payload: newSecret
        })
        const { data } = await axios.post(
            `/api/secrets`,
            newSecret
        );
        // console.log(data);
        dispatch({ type: CREATE_SECRET_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_SECRET_FAIL, payload: error.message });
    }
}

const getSecret = ({ id, password }) => async (dispatch) => {
    try {
        dispatch({
            type: GET_SECRET_REQUEST,
            payload: {id, password}
        })
        const {data} = await axios.get('/api/secrets:id', {id, password});
        dispatch({ type: GET_SECRET_SUCCESS, payload: data});
    } catch (error) {
        dispatch({ type: GET_SECRET_FAIL, payload: error.message});
    }
}

export {createSecret, getSecret};