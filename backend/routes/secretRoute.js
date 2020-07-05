import express from 'express';
import Secret from '../models/secretModel';
import User from '../models/userModel';
import crypto from 'crypto';
import { isAdmin, isAuth, notifyEmail } from '../util';

const router = express.Router();

const algorithm = 'aes-128-cbc';
const FIFTEEN_MINS = "1", TWENTYFOUR_HOURS = "2", ONE_WEEK = "3";

const calculateLifetime = (lifetime) => {
    const now = new Date().getTime();
    switch (String(lifetime)) {
        case FIFTEEN_MINS:
            console.log("FIFTEEN_MINS");
            return now + 15*60*1000;
        case TWENTYFOUR_HOURS:
            console.log("TWENTYFOUR_HOURS");
            return now + 24*60*60*1000;
        case ONE_WEEK:
            console.log("ONE_WEEK");
            return now + 7*24*60*60*1000;
        default:
            console.log("NOW");
            return now;
    }
}

const encode = (secret, password) => {
    const key = crypto.createCipher(algorithm, password); 
    let secretCode = key.update(secret, 'utf8', 'hex');
    secretCode += key.final('hex');
    return secretCode;
}

const findUserId = async (userId) => {
    if(userId.match(/^[0-9a-fA-F]{24}$/)) {
        const userModel = await User.findById(userId);
        console.log(userModel)
        if(userModel) return userModel._id;         
    }
    return;
}

// Create new secret
router.post("/", async (req, res) => {
    try {
        const { secret, password, lifetime, userId, email } = req.body; 
        const userIdFound = userId ? await findUserId(userId) : null;
        console.log('userId: ' + userId + ' userIdFound: ' +userIdFound+ ' email: ' +email)
        const secretCode = encode(secret, password);
        const secretModel = new Secret({
            secret : secretCode,
            expire: calculateLifetime(lifetime),
            viewed: false,
            email,
            userId: userIdFound ? userIdFound : null,
        })
        const newSecret = await secretModel.save();
        if(newSecret){
            return res.status(201).send(`/secrets/${newSecret._id}`);
        }
        return res.status(500).send({ msg: 'Error in creating Secret'});
    } catch (error) {
        return res.status(500).send({ msg: 'Error in creating Secret'});
    }
    
})

const decode = (secretModel, password) => {
    const key = crypto.createDecipher(algorithm, password);
    let secret = key.update(secretModel.secret, 'hex', 'utf8');
    secret += key.final('utf8');
    return secret;
}

// Get a secret
router.post("/id", async (req, res) => {
    const { id :secretId, password } = req.body;
    if (secretId.match(/^[0-9a-fA-F]{24}$/)) {
        const secretModel = await Secret.findById(secretId);
        if(!secretModel) return res.status(403).send({ msg: 'Secret Expired!'});
        try {
            const secret = decode(secretModel, password);
            await Secret.findByIdAndUpdate(secretId, {
                viewed: true
            });
            if(secretModel.email) notifyEmail(secretModel.email);
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
    const secrets = await Secret.find({}).populate({path: 'userId', select: 'name'});
    console.log("Sent back all secrets: " + secrets);
    res.status(200).send(secrets); 
})

export default router; 