import axios from 'axios';
import { CREATE_SECRET_REQUEST, CREATE_SECRET_SUCCESS, CREATE_SECRET_FAIL } from "../constants/createSecretConstants";

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
        console.log(data);
        dispatch({ type: CREATE_SECRET_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_SECRET_FAIL, payload: error.message });
    }
}

export {createSecret};