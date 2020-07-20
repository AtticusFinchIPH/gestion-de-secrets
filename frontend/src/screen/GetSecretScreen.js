import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getSecret } from '../actions/secretActions';

function GetSecretScreen(props){
    const secretId = props.match.params.id;
    const [password, setPassword] = useState('');
    const secretObtain = useSelector(state => state.secretObtain);
    const { loading, secret, error } = secretObtain;
    
    useEffect(() => {
        if( secret  && typeof secret !== 'string') {
            const url = window.URL.createObjectURL(secret);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', secret.name);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        }
    }, [secret]); 

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
    <form className="get-secret-screen" onSubmit={submitPassword}>
        <div className="input-section">
            <h2>
                Entrez un correct mot de passe pour obtenir le secret message
            </h2>
            <p>
                Le contenu du secret apparaîtrait ci-dessous avec un bon mot de passe
            </p>
            <textarea rows="10" cols="80" 
                value={error ? '' : (secret  && typeof secret !== 'string' ? 'Votre secret est un fichier' : secret)}
                readOnly={true} placeholder="">           
            </textarea>
        </div>
        <div className="pwd-section">
            <label htmlFor="pwd" className="pwd-label">Mot de passe:</label>
            <input id="pwd" name="pdw" className="pwd-input" type="text" 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe ici"/>
            <div className="pwd-info">{error ? error : ''}</div>
        </div>
        <div className="link-section">
            <button type="submit">Envoyez votre mot de passe</button>
        </div>
    </form>
    );
}

export default GetSecretScreen;