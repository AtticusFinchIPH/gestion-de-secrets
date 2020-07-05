import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getListSecret } from '../actions/adminActions';
import { useHistory } from 'react-router';

function AdminScreen(props){
    const [link, setLink] = useState('');
    const [userName, setUserName] = useState('');
    const [viewed, setViewed] = useState(null);
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
    const chooseSecret = (secret) => {
        if(secret.userId) setUserName(secret.userId.name);
        else setUserName('Anonymous user');
        setViewed(String(secret.viewed));
        setLink(secret.secret);
    }
    return(
        <div className="admin-screen">
            <div className="list-container">
                <div className="list-secret">
                    <h3>List des secrets</h3>
                    <ul>
                    {
                        secrets ? 
                        secrets.map((secret) =>{
                            return (
                                <li key={secret._id} onClick={() => chooseSecret(secret)}>                              
                                    {`${window.location.hostname}:${window.location.port}/secrets/${secret._id}`}
                                </li>)
                        })
                        :
                        <></>
                    }
                    </ul>
                    <p>Nombre de secrets : <b>{secrets ? secrets.length : 0}</b></p>
                </div>
                <div className="detail-conatiner">
                    <div className="secret-detail">
                        <div className="author">Auteur: {userName}</div>
                        <div className="status">Status: <span className={viewed}>{viewed !== null ? viewed == "true" ? 'Vue' : 'Pas vue' : ''}</span></div>
                    </div>
                    <div className="link-section">
                    {   
                        link 
                        ?   
                        (
                            <div className="link-show">
                                <label htmlFor="link" className="link-label">Lien secret:</label>
                                <input id="link" name="link" className="link-input" value={window.location.hostname +":"+ window.location.port +"/secrets/"+ link} readOnly={true}/>
                                <div className="link-clipboard">
                                    <CopyToClipboard text={window.location.hostname +":"+ window.location.port +"/secrets/"+ link} style={{marginRight: "1rem"}}>
                                        <i className="fa fa-link fa-lg" aria-hidden="true" title="Copy to clipboard"></i>
                                    </CopyToClipboard>
                                    {/* <Link to={{pathname: `${link}`}} target="_blank">
                                        <i className="fa fa-send fa-lg" aria-hidden="true" title="Access link"></i>
                                    </Link> */}
                                </div>
                            </div>
                        )
                        : <></>
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminScreen;