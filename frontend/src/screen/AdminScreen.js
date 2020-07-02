import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HomeScreen from './HomeScreen';
import { getListSecret } from '../actions/adminActions';

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
    else return(<HomeScreen/>)
}

export default AdminScreen;