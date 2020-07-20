import express from 'express';
import Secret from '../models/secretModel';
import User from '../models/userModel';
import crypto from 'crypto';
import { isAdmin, isAuth, notifyEmail } from '../util';
import fs from 'fs';
import path from 'path';

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

const encode = (buffer, password) => {
    const key = crypto.createCipher(algorithm, password); 
    let crypted = Buffer.concat([key.update(buffer),key.final()]);
    return crypted;
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
        let { secret, password, lifetime, userId, email } = req.body; 
        let fileName = null;
        const userIdFound = userId ? await findUserId(userId) : null;
        console.log('userId: ' + userId + ' userIdFound: ' +userIdFound+ ' email: ' +email);
        if(secret.length === 0) {
            secret = req.files.file.data;
            fileName = req.files.file.name;
        }       
        const secretCode = encode(new Buffer(secret, "utf8"), password);
        const secretModel = new Secret({
            secret : secretCode,
            expire: calculateLifetime(lifetime),
            viewed: false,
            email,
            userId: userIdFound ? userIdFound : null,
            fileName
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
    let dec = Buffer.concat([key.update(secretModel.secret) , key.final()]);
    return dec;
}

// Get a secret
router.post("/id", async (req, res) => {
    const { id :secretId, password } = req.body;
    if (secretId.match(/^[0-9a-fA-F]{24}$/)) {
        const secretModel = await Secret.findById(secretId);
        if(!secretModel) return res.status(403).send({ msg: 'Secret Expired!'});
        try {
            const secret = secretModel.fileName ? decode(secretModel, password) : decode(secretModel, password).toString('utf8');
            await Secret.findByIdAndUpdate(secretId, {
                viewed: true
            });
            if(secretModel.email) notifyEmail(secretModel.email);           
            if(secretModel.fileName) { 
                try{
                    fs.writeFileSync(path.join(__dirname, `../views/secretFiles/${secretModel.fileName}`), secret);
                    console.log(`Stored ${secretModel.fileName} in ${__dirname}"\views\secretFiles\" folder`);   
                    res.setHeader("filename", secretModel.fileName);               
                    return res.status(200).download(path.join(__dirname, `../views/secretFiles/${secretModel.fileName}`));
                    // TODO: Clean secretFiles folder
                }catch(e){
                    console.log(e);
                    return res.status(403).send({ msg: 'Send file failed!'}) 
                }  
            } else {                         
                return res.status(200).send(secret);
            }
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