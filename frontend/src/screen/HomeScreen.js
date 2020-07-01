import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { createSecret, polluteSecret } from '../actions/secretActions';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function HomeScreen(props){
    const [secret, setSecret] = useState('');
    const [password, setPassword] = useState('');
    const [lifetime, setLifetime] = useState(1);
    const linkSecret = useSelector(state => state.linkSecret);
    let { loading, link, error } = linkSecret;
    const isFreshSecret = useSelector(state => state.isFreshSecret);

    useEffect(() => {
        if(isFreshSecret){
            setSecret('');
            setPassword('');
            setLifetime(1);
        }
        console.log(isFreshSecret);
    }, [isFreshSecret])
    const dispatch = useDispatch();
    const submitSecret = (e) => {
        e.preventDefault();
        if(isValidate()) dispatch(createSecret({secret, password, lifetime}));
    }
    const isValidate = () => {
        if(!secret) {
            alert("Secret field must not be empty!");
            return false;
        }
        if(!password) {
            alert("Password must not be empty!");
            return false;
        }
        return true;
    }
    const makePollution = () => {
        dispatch(polluteSecret());
    }
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
                onChange={(e) => {
                    makePollution();
                    setSecret(e.target.value)}
                }
                value={secret} readOnly={link ? true : false}
                placeholder="Votre contenu secret est à coller ici">           
            </textarea>
        </form>
        <form className="keys-section">
            <label htmlFor="pwd" className="pwd-label">Mot de passe:</label>
            <input id="pwd" name="pdw" className="pwd-input" type="text" 
                onChange={(e) => {
                    makePollution();
                    setPassword(e.target.value)}
                }
                value={password}  readOnly={link ? true : false}
                placeholder="Un mot ou une phrase qui est difficile à deviner"/>
            <label htmlFor="lifetime" className="lft-label">Lifetime:</label>
            <select id="lifetime" name="lifetime" className="lft-input"
                onChange={(e) => {
                    makePollution();
                    setLifetime(e.target.value)}
                }
                value={lifetime} disabled={link ? true : false}>
                <option value="1">15 minutes</option>
                <option value="2">24 hours</option>
                <option value="3">1 week</option>
            </select>
        </form>
        <div className="link-section">
            {   
                link 
                ?   
                (
                    <div className="link-show">
                        <label htmlFor="link" className="link-label">Votre lien secret:</label>
                        <input id="link" name="link" className="link-input" value={window.location.hostname +":"+ window.location.port + link} readOnly={true}/>
                        <div className="link-clipboard">
                            <CopyToClipboard text={window.location.hostname +":"+ window.location.port + link}>
                                <i className="fa fa-clipboard fa-lg" aria-hidden="true" title="Copy to clipboard"></i>
                            </CopyToClipboard>
                        </div>
                    </div>
                )
                : <button onClick={submitSecret}>Créer un lien secret</button>
            }
        </div>
    </>
    );
}

export default HomeScreen;