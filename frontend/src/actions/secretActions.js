import axios from 'axios';
import { CREATE_SECRET_REQUEST, CREATE_SECRET_SUCCESS, CREATE_SECRET_FAIL, GET_SECRET_REQUEST, GET_SECRET_SUCCESS, GET_SECRET_FAIL, REFRESH_SECRET, POLLUTE_SECRET, REMOVE_SECRET_LINK } from "../constants/secretConstants";

const createSecret = ({secret, password, lifetime, userId, email}) => async (dispatch) => {
    try {
        const newSecret = {secret, password, lifetime, userId, email};
        dispatch({
            type: CREATE_SECRET_REQUEST,
            payload: newSecret
        })
        const formData = new FormData();
        if(typeof secret === 'string') {
            formData.append('secret', secret)
        } else {
            formData.append('secret', '');
            formData.append('file', secret);
        } 
        formData.append('password', password);
        formData.append('lifetime', lifetime);
        formData.append('userId', userId);
        formData.append('email', email);
        const { data } = await axios.post(
            `/api/secrets`,
            formData,
            {
                headers: {
                  'content-type': 'multipart/form-data'
                }
            }
        );
        dispatch({ type: CREATE_SECRET_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_SECRET_FAIL, payload: error.message });
    }
}

const removeLink = () => (dispatch) => {
    dispatch({
        type: REMOVE_SECRET_LINK
    })
}

const getSecret = ({ id, password }) => async (dispatch) => {
    try {
        const secret = {id, password};
        dispatch({
            type: GET_SECRET_REQUEST,
            payload: secret
        })
        const {headers, data} = await axios.post(`/api/secrets/id`, secret);
        if(headers.filename){
            const file = new File([data], headers.filename);
            dispatch({ type: GET_SECRET_SUCCESS, payload: file});
        } else dispatch({ type: GET_SECRET_SUCCESS, payload: data});
    } catch (error) {
        dispatch({ type: GET_SECRET_FAIL, payload: error.response.data.msg || error.message});
    }
}

const refreshSecret = () => (dispatch) => {
    dispatch({
        type: REFRESH_SECRET
    })
}

const polluteSecret = () => (dispatch) => {
    dispatch({
        type: POLLUTE_SECRET
    })
}

export {createSecret, getSecret, refreshSecret, polluteSecret, removeLink};