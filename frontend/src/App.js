import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import './App.css';
import HomeScreen from './screen/HomeScreen';

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
            <div className="brand">
                <Link to="/">New Secret</Link>
            </div>
            <div className="header-links">
                <a href="signin.html">Sign In</a>
            </div>
        </header>
        <main className="main">
            <div className="content">
                <Route exact={true} path="/" component={HomeScreen}/>
            </div>           
        </main>
        <footer className="footer">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
