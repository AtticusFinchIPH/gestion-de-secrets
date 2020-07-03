import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListSecret } from '../actions/adminActions';
import { Redirect } from 'react-router';

function AdminScreen(props){
    const [isAllow, setAllow] = useState(false);
    const userSignin = useSelector(state => state.userSignin);
    let { userInfo } = userSignin;
    const listSecret = useSelector(state => state.listSecret);
    let { loading, secrets, error} = listSecret;
    useEffect(() => {
        if(userInfo) setAllow(true);
        else setAllow(false);
    }, [userInfo]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getListSecret());
    }, [])
    useEffect(() => {
        console.log(secrets);
    }, [secrets])
    if(isAllow)
    return(
        <div>
            <p>Admin Screen</p>
        </div>
    )
    else return(<Redirect to="/"/>)
}

export default AdminScreen;