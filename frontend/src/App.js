import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
            <div className="brand">
                <a href="index.html">Create Secret</a>
            </div>
            <div className="header-links">
                <a href="admin.html">Administration</a>
            </div>
        </header>
        <main className="main">
            <div className="content">
                <div className="input-section">
                    <h2>
                        Collez votre mot de passe, message secret ou lien privé ci-dessous
                    </h2>
                    <p>
                        Ne stockez aucune information confidentielle dans vos emails ou fils de discussion
                    </p>
                    <textarea rows="10" cols="80"></textarea>
                </div>
                <div className="keys-section">
                    <label for="pwd" className="pwd-label">Mot de passe:</label>
                    <input id="pwd" className="pwd-input" type="text" value="" placeholder="Un mot ou une phrase qui est difficile à deviner"/>
                    <label for="lifetime" className="lft-label">Lifetime:</label>
                    <select id="lifetime" className="lft-input" value="" >
                        <option>15 minutes</option>
                        <option>24 hours</option>
                        <option>1 week</option>
                    </select>
                </div>
                <div className="link-section">
                    <button>Créer un lien secret</button>
                </div>
            </div>           
        </main>
        <footer className="footer">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
