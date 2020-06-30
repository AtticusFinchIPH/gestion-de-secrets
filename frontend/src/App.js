import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import HomeScreen from './screen/HomeScreen';
import SigninScreen from './screen/SigninScreen';
import GetSecretScreen from './screen/GetSecretScreen';
import AdminScreen from './screen/AdminScreen';
import { refreshSecret, removeLink } from './actions/secretActions';

function App() {

  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;

  const dispatch = useDispatch();
  const newSecret = () => {
    dispatch(refreshSecret());
    dispatch(removeLink());
  }
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
            <div className="brand">
                <Link to="/" onClick={newSecret}>New Secret</Link>
            </div>
            <div className="header-links">
              {
                userInfo ? <Link to="/admin"><i className="fa fa-user" aria-hidden="true"></i> {userInfo.name}</Link> : <Link to="/signin">Access Manager</Link>
              }          
            </div>
        </header>
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
