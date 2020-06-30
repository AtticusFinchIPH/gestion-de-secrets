import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getSecret } from '../actions/secretActions';

function GetSecretScreen(props){
    const secretId = props.match.params.id;
    const [password, setPassword] = useState('');
    const secretObtain = useSelector(state => state.secretObtain);
    const { loading, secret, error } = secretObtain;

    const dispatch = useDispatch();
    const submitPassword = (e) => {
        e.preventDefault();
        if(isValidate()) dispatch(getSecret({id: secretId, password}));
    }
    const isValidate = () => {
        if(!password) {
            alert("Password must not be empty!");
            return false;
        }
        return true;
    }
    return(
    <>
        <form className="input-section">
            <h2>
                Entrez un correct mot de passe pour obtenir le secret message
            </h2>
            <p>
                Le contenu du secret apparaîtrait ci-dessous avec un bon mot de passe
            </p>
            <textarea rows="10" cols="80" 
                value={secret}
                readOnly={true} placeholder="">           
            </textarea>
        </form>
        <form className="keys-section">
            <label htmlFor="pwd" className="pwd-label">Mot de passe:</label>
            <input id="pwd" name="pdw" className="pwd-input" type="text" 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe ici"/>
        </form>
        <div className="link-section">
            <button onClick={submitPassword}>Envoyez votre mot de passe</button>
        </div>
    </>
    );
}

export default GetSecretScreen;