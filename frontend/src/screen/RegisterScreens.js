import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';

function RegisterScreen(props){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [isAdmin, setAdmin] = useState(false);
    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error } = userRegister;
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        if (userInfo) {
          props.history.push("/admin");
        }
        return () => {
          //
        };
    }, [userInfo]);
    const submitHandler = (e) => {
        e.preventDefault();
        if(isValidate()) dispatch(register(name, email, password, isAdmin));
    }
    const isValidate = () => {
        if(!name) { alert("Name must not be empty"); return false }
        if(!email) { alert("Email must not be empty"); return false }
        if(!password) { alert("Password must not be empty"); return false }
        if(password !== rePassword) { alert("Password not match!"); return false }
        return true;
    }
    return (<div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
        <li>
          <h2>Create Account</h2>
        </li>
        <li>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
        </li>
        <li>
          <label htmlFor="name">
            Name
          </label>
          <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
          </input>
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
          <label htmlFor="rePassword">Re-Enter Password</label>
          <input type="password" id="rePassword" name="rePassword" onChange={(e) => setRePassword(e.target.value)}>
          </input>
        </li>
        <li id="register-admin">
            <label htmlFor="isAdmin">Make me an admin :</label>
            <input type="checkbox" id="isAdmin" name="isAdmin" onChange={(e) => setAdmin(!isAdmin)} checked={isAdmin}/>
        </li>
        <li>
          <button type="submit" className="button primary">Register</button>
        </li>
        {/* <li>
            Already have an account?
        </li>
        <li>
          <Link to="/signin" className="button-register">Signin your Secret account</Link>
        </li> */}
      </ul>
    </form>
  </div>
  );
}

export default RegisterScreen;