import express from 'express';
import User from '../models/userModel'
import { getToken } from '../util';
import passport from 'passport';

const router = express.Router();

router.post("/signin", async (req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if(signinUser){
        res.send({
            _id: signinUser._id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser)
        })
    } else {
        res.status(401).send({msg: 'Invalid Email or Password'});
    }
})

router.post("/register", async (req, res) => {
    const registerUser = await User.findOne({
        email: req.body.email,
    });
    if(registerUser) res.status(401).send({ msg: 'Email has been used by another user'});
    else {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isAdmin: req.body.isAdmin,
        });
        const newUser = await user.save();
        if (newUser) {
            res.send({
                _id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                token: getToken(newUser),
            });
        } else {
            res.status(401).send({ message: 'Invalid User Data' });
        }
    }
})

router.get("/createadmin", async (req, res) => {
    try {
        const user = new User({
            name: 'atticus',
            email: 'tranvanduc@gmail.com',
            password: 'admin',
            isAdmin: true
        });
        const newUser = await user.save();
        res.send(user);
    } catch (error) {
        res.send({msg: error.message});
    }
})

router.get("/google", (req, res, next) => {
    console.log("-> before /google");
    next();
}, passport.authenticate('google', {
    scope: ['profile', 'email']
}))

router.get("/google/redirect", passport.authenticate('google', { failureRedirect: '/signin' }), (req, res) => {
    console.log('-> /google/redirect');
    const user = {
        _id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        isAdmin: req.user.isAdmin,
        token: getToken(req.user),
    }
    return res.render('googleLogin', user);
})

export default router;