import express from 'express';
import Secret from '../models/secretModel';
import crypto from 'crypto';
import { isAdmin, isAuth } from '../util';

const router = express.Router();

const algorithm = 'aes-128-cbc';
const FIFTEEN_MINS = "1", TWENTYFOUR_HOURS = "2", ONE_WEEK = "3";

const calculateLifetime = (lifetime) => {
    const now = new Date().getTime();
    switch (lifetime) {
        case FIFTEEN_MINS:
            return now + 15*60*1000;
        case TWENTYFOUR_HOURS:
            return now + 24*60*60*1000;
        case ONE_WEEK:
            return now + 7*24*60*60*1000;
        default:
            return now;
    }
}

// Create new secret
router.post("/", async (req, res) => {
    const { secret, password, lifetime } = req.body; 
    const key = crypto.createCipher(algorithm, password); 
    let secretCode = key.update(secret, 'utf8', 'hex');
    secretCode += key.final('hex');
    const secretModel = new Secret({
        secret : secretCode,
        expire: calculateLifetime(lifetime),
    })
    const newSecret = await secretModel.save();
    if(newSecret){
        return res.status(201).send(`/secrets/${newSecret._id}`);
    }
    return res.status(500).send({ msg: 'Error in creating Secret'});
})

// Get a secret
router.post("/id", async (req, res) => {
    const { id :secretId, password } = req.body;
    if (secretId.match(/^[0-9a-fA-F]{24}$/)) {
        const secretModel = await Secret.findById(secretId);
        if(!secretModel) return res.status(403).send({ msg: 'Secret Expired!'});
        try {
            const key = crypto.createDecipher(algorithm, password);
            let secret = key.update(secretModel.secret, 'hex', 'utf8');
            secret += key.final('utf8');
            return res.status(200).send(secret);
        } catch (error) {
            return res.status(403).send({ msg: 'Wrong Password!'});
        }
    } else {
        return res.status(403).send({ msg: 'Secret Not Exist!'});
    }  
})

// Get list of secret
router.get("/", isAuth, isAdmin, async (req, res) => {
    const secrets = await Secret.find({});
    res.status(200).send(secrets); 
})

export default router; 