import React, { useState } from 'react';
import {useDispatch} from 'react-redux';

function HomeScreen(props){
    const [secret, setSecret] = useState('');
    const [password, setPassword] = useState('');
    const [lifetime, setLifetime] = useState(1);

    return(
    <>
        <form className="input-section">
            <h2>
                Collez votre mot de passe, message secret ou lien privé ci-dessous
            </h2>
            <p>
                Ne stockez aucune information confidentielle dans vos emails ou fils de discussion
            </p>
            <textarea rows="10" cols="80" 
                onChange={(e) => setSecret(e.target.value)}
                placeholder="Votre contenu secret est à coller ici">           
            </textarea>
        </form>
        <form className="keys-section">
            <label for="pwd" className="pwd-label">Mot de passe:</label>
            <input id="pwd" name="pdw" className="pwd-input" type="text" 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Un mot ou une phrase qui est difficile à deviner"/>
            <label for="lifetime" className="lft-label">Lifetime:</label>
            <select id="lifetime" name="lifetime" className="lft-input"
                onChange={(e) => setLifetime(e.target.value)}>
                <option value="1">15 minutes</option>
                <option value="2">24 hours</option>
                <option value="3">1 week</option>
            </select>
        </form>
        <div className="link-section">
            <button>Créer un lien secret</button>
        </div>
    </>
    );
}

export default HomeScreen;