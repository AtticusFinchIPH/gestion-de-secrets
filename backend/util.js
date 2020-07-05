import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import config from './config';

const getToken = (user) => {
    return jwt.sign( {
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        config.JWT_SECRET, 
        {
            expiresIn: '48h'
        }
    )
}

const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if(token){
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
            if(err) return res.status(401).send({ msg: 'Invalid Token' });
            req.user = decode;
            next();
            return;
        });
    }
    else return res.status(401).send({ msg: 'Token is not supplied'});
}

const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) return next();
    return res.status(401).send({ msg: 'Admin Token is not valid'});
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    type: "SMTP",
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: config.GMAIL_USER,
      pass: config.GMAIL_PASS
    }
});

const notifyEmail = (to)=> {
    const mailOptions = {
        from: config.GMAIL_USER,
        to,
        subject: 'Notify viewed secret',
        text: 'Hi, your secret has been seen. ' 
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}

export {getToken, isAuth, isAdmin, notifyEmail};