import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListSecret } from '../actions/adminActions';
import { Redirect } from 'react-router';

function AdminScreen(props){
    const userSignin = useSelector(state => state.userSignin);
    let { userInfo } = userSignin;
    const listSecret = useSelector(state => state.listSecret);
    let { loading, secrets, error} = listSecret;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getListSecret());
    }, [])
    useEffect(() => {
        console.log(secrets);
    }, [secrets])
    if(userInfo)
    return(
        <div>
            <p>Admin Screen</p>
        </div>
    )
    else return(<Redirect to="/"/>)
}

export default AdminScreen;