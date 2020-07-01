import express from 'express';
import Secret from '../models/secretModel';
import crypto from 'crypto';

const router = express.Router();

const algorithm = 'aes-128-cbc'; 

router.post("/", async (req, res) => {
    const { secret, password, lifetime } = req.body; 
    const key = crypto.createCipher(algorithm, password); 
    let secretCode = key.update(secret, 'utf8', 'hex');
    secretCode += key.final('hex');
    const secretModel = new Secret({
        secret : secretCode,
        lifetime,
    })
    const newSecret = await secretModel.save();
    if(newSecret){
        return res.status(201).send(`/secrets/${newSecret._id}`);
    }
    return res.status(500).send({ msg: 'Error in creating Secret'});
})

router.post("/id", async (req, res) => {
    const { id :secretId, password } = req.body;
    if (secretId.match(/^[0-9a-fA-F]{24}$/)) {
        const secretModel = await Secret.findById(secretId);
        try {
            const key = crypto.createDecipher(algorithm, password);
            let secret = key.update(secretModel.secret, 'hex', 'utf8');
            secret += key.final('utf8');
            res.status(200).send(secret);
        } catch (error) {
            res.status(403).send({ msg: 'Wrong Password!'});
        }
    } else {
        res.status(403).send({ msg: 'Secret Not Found'});
    }  
})

router.get("/", async (req, res) => {
    const secrets = await Secret.find({});
    res.status(200).send(secrets);
})

export default router;