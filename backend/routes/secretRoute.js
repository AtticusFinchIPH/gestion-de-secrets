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
        // return res.status(201).send({ msg: 'New Secret created', data: newSecret});
        return res.status(201).send(`/api/secrets/${newSecret._id}`);
    }
    return res.status(500).send({ msg: 'Error in creating Secret'});
})

router.get("/:id", async (req, res) => {
    const secretId = req.params.id;
    const secret = await Secret.findById(secretId);
    if(secret) {
        res.status(200).send({ msg: "Password is correct", secret: secret.secret});
    } else {
        res.status(403).send({ msg: 'Secret Not Found'});
    }
})

router.get("/", async (req, res) => {
    const secrets = await Secret.find({});
    res.status(200).send(secrets);
})

export default router;