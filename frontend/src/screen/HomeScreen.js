import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { createSecret, polluteSecret } from '../actions/secretActions';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';

function HomeScreen(props){
    const [isText, setIsText] = useState(true);
    const [secret, setSecret] = useState('');
    const [password, setPassword] = useState('');
    const [lifetime, setLifetime] = useState(1);
    const [email, setEmail] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    let { userInfo } = userSignin;
    const linkSecret = useSelector(state => state.linkSecret);
    let { loading, link, error } = linkSecret;
    const isFreshSecret = useSelector(state => state.isFreshSecret);

    const onFileChange = (e) => { 
        setSecret(e.target.files[0]);      
      }; 
    
    useEffect(() => {
        if(isFreshSecret){
            setSecret('');
            setPassword('');
            setLifetime(1);
        }
    }, [isFreshSecret])
    const dispatch = useDispatch();
    const submitSecret = (e) => {
        e.preventDefault();
        if(isValidate()) dispatch(createSecret({secret, password, lifetime, userId: userInfo ? userInfo._id : null, email}));
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
    <form className="home-screen" onSubmit={submitSecret}>
        <div className="input-section">
            <h2>
                Collez votre mot de passe, message secret ou lien privé ci-dessous
            </h2>
            <div className="can-toggle">
                <input id="toggle" type="checkbox" value={isText} onChange={(e) => setIsText(!isText)}/>
                <label for="toggle">
                    <div className="can-toggle__switch" data-checked="Text" data-unchecked="Fichier"></div>
                </label>
            </div>
            <p>
                Ne stockez aucune information confidentielle dans vos emails ou fils de discussion
            </p>
            {
                isText ?
                <div className="input-upload">
                    <label >Fichier secret:</label>
                    <input type="file" onChange={onFileChange} /> 
                </div>
                :
                <textarea rows="10" cols="80" 
                    onChange={(e) => {
                        makePollution();
                        setSecret(e.target.value)}
                    }
                    value={secret} readOnly={link ? true : false}
                    placeholder="Votre contenu secret est à coller ici">           
                </textarea>
            }
            
        </div>
        <div className="keys-section">
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
            <label htmlFor="email" className="email-label">Email notifié:</label>
            <input id="email" name="email" className="email-input" type="email" 
                onChange={(e) => {
                    makePollution();
                    setEmail(e.target.value)}
                }
                value={email}  readOnly={link ? true : false}
                placeholder="Nous vous notifierons quand votre secret est vue (optionnel)"/>
        </div>
        <div className="link-section">
            {   
                link 
                ?   
                (
                    <div className="link-show">
                        <label htmlFor="link" className="link-label">Votre lien secret:</label>
                        <input id="link" name="link" className="link-input" value={window.location.hostname +":"+ window.location.port + link} readOnly={true}/>
                        <div className="link-clipboard">
                            <CopyToClipboard text={window.location.hostname +":"+ window.location.port + link} style={{marginRight: "1rem"}}>
                                <i className="fa fa-link fa-lg" aria-hidden="true" title="Copy to clipboard"></i>
                            </CopyToClipboard>
                            <Link to={{pathname: `${link}`}} target="_blank">
                                <i className="fa fa-send fa-lg" aria-hidden="true" title="Access link"></i>
                            </Link>
                        </div>
                    </div>
                )
                : <button type="submit">Créer un lien secret</button>
            }
        </div>
    </form>
    );
}

export default HomeScreen;