import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin, googleSignin } from '../actions/userActions';
import { GoogleButton } from 'react-google-button';
import { SERVER_URL } from '../constants/commonConstants'

function SigninScreen(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (userInfo) {
      history.replace("/admin");
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  }
  const receiveMessage = event => {
    if (event.origin !== SERVER_URL) {
      console.log("Different origin: "+ event.origin);
      return;
    }
    const { data } = event;
    if (data) {   
      console.log(data);
      dispatch(googleSignin(data));
    }
  };

  let windowObjectReference = null;
  let previousUrl = null;
  const GOOGLE_API_PATH = '/api/users/google';

  const signinGoogle = () => {
    window.removeEventListener('message', receiveMessage);

    const strWindowFeatures = 'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';
    if (windowObjectReference === null || windowObjectReference.closed) {
      windowObjectReference = window.open(GOOGLE_API_PATH, '', strWindowFeatures);
    } else if (previousUrl !== GOOGLE_API_PATH) {
      windowObjectReference = window.open(GOOGLE_API_PATH, '', strWindowFeatures);
      windowObjectReference.focus();
    } else {
      windowObjectReference.focus();
    }
    window.addEventListener('message', event => receiveMessage(event), false);
    previousUrl = GOOGLE_API_PATH;
  };
  return <div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
        <li>
          <h2>Sign-In</h2>
        </li>
        <li>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
        </li>
        <li>
          <label htmlFor="email">
            Email
          </label>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
          </input>
        </li>
        <li>
          <button type="submit" className="button primary">Signin</button>
        </li>
        <li>
          New to Secret Management?
        </li>
        <li>
          <Link to="/register" className="button-register" >Create your Secret account</Link>
        </li>
        <li style={{textAlign: 'center'}}>
          --- Or ---
        </li>
        <li style={{alignItems: 'center'}}>
          <GoogleButton onClick={signinGoogle} type='light'/>
        </li>
      </ul>
    </form>
  </div>
}
export default SigninScreen;