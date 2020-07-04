import axios from 'axios';
import { GET_LIST_SECRET_REQUEST, GET_LIST_SECRET_SUCCESS, GET_LIST_SECRET_FAIL } from '../constants/adminConstants'

const getListSecret = () => async (dispatch, getState) => {
    try {
        const {
            userSignin: { userInfo },
        } = getState();
        dispatch({
            type: GET_LIST_SECRET_REQUEST,
        })
        const config = {
            headers: {
                'Authorization': 'Bearer ' + userInfo.token
            }
        }
        const {data} = await axios.get(`/api/secrets/`, config);
        dispatch({ type: GET_LIST_SECRET_SUCCESS, payload: data});
    } catch (error) {
        dispatch({ type: GET_LIST_SECRET_FAIL, payload: error.message});
    }
}

export {getListSecret};