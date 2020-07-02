import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import HomeScreen from './screen/HomeScreen';
import SigninScreen from './screen/SigninScreen';
import GetSecretScreen from './screen/GetSecretScreen';
import AdminScreen from './screen/AdminScreen';
import { refreshSecret, removeLink } from './actions/secretActions';
import { logout } from './actions/userActions';

function App() {
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;

  const dispatch = useDispatch();
  const newSecret = () => {
    dispatch(refreshSecret());
    dispatch(removeLink());
  }
  const signout = (e) => {
    e.preventDefault();
    setOpenUserOption(!openUserOption);
    dispatch(logout());
  }

  const [openUserOption, setOpenUserOption] = useState(false);
  useEffect(() => {
    if(openUserOption) document.querySelector(".user-options").classList.add("open");
    else document.querySelector(".user-options").classList.remove("open");
  }, [openUserOption])
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
            <div className="brand">
                <Link to="/" onClick={newSecret}><i className="fa fa-home" aria-hidden="true"></i> New Secret</Link>
            </div>
            <div className="header-links">
              {
                userInfo ? 
                <a onClick={(e) => setOpenUserOption(!openUserOption)}><i className="fa fa-user-circle-o" aria-hidden="true"></i> {userInfo.name}</a> 
                : 
                <Link to="/signin">Sign-In</Link>
              }          
            </div>
        </header>
        <aside className="user-options">
            <ul>
              <li><Link to="/admin"><i className="fa fa-star" aria-hidden="true"></i> Manager</Link></li>
              <li><a onClick={signout}><i className="fa fa-sign-out" aria-hidden="true"></i> Sign-out</a></li>
            </ul>
        </aside>
        <main className="main">
            <div className="content">
                <Route exact={true} path="/" component={HomeScreen}/>
                <Route path="/signin" component={SigninScreen}/>
                <Route path="/secrets/:id" component={GetSecretScreen}/>
                <Route path="/admin" component={AdminScreen}/>
            </div>           
        </main>
        <footer className="footer">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
