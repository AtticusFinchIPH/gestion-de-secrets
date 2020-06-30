import express from 'express';
import Secret from '../models/secretModel'
import { getToken } from '../util';

const router = express.Router();

router.post("/", async (req, res) => {
    console.log(req.body);
    const secret = new Secret({
        secret: req.body.secret,
        password: req.body.password,
        lifetime: req.body.lifetime,
    })
    const newSecret = await secret.save();
    if(newSecret){
        return res.status(201).send(`/api/secrets/${newSecret._id}`);
    }
    return res.status(500).send({ msg: 'Error in creating Secret'});
})

router.post("/id", async (req, res) => {
    const secretId = req.body.id;
    const password = req.body.password;
    if (secretId.match(/^[0-9a-fA-F]{24}$/)) {
        const secret = await Secret.findById(secretId);
        if(secret.password == password) {
            res.status(200).send(secret.secret);
        } else {
            res.status(403).send({ msg: 'Wrong password'});
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