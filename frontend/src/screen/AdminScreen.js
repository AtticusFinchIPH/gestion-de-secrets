import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListSecret } from '../actions/adminActions';
import { useHistory } from 'react-router';

function AdminScreen(props){
    const userSignin = useSelector(state => state.userSignin);
    let { userInfo } = userSignin;
    const listSecret = useSelector(state => state.listSecret);
    let { loading, secrets, error} = listSecret;
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(getListSecret());
    }, [])
    useEffect(() => {
        if(!userInfo) history.replace("/"); 
    }, [userInfo])
    useEffect(() => {
        console.log(secrets);
    }, [secrets])
    return(
        <div className="admin-screen">
            <div className="list-container">
                <div className="list-secret">
                    <h3>List des secrets</h3>
                    <ul>
                    {
                        secrets ? 
                        secrets.map((secret) =>{
                            return <li key={secret._id}>
                                {`${window.location.hostname}:${window.location.port}/secrets/${secret._id}`}
                                </li>
                        })
                        :
                        <></>
                    }
                    </ul>
                <p>Nombre de secrets : <b>{secrets ? secrets.length : 0}</b></p>
                </div>
                <div className="pagination">

                </div>
            </div>
        </div>
    )
}

export default AdminScreen;