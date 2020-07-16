import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import path from 'path';
import userRoute from './routes/userRoute';
import secretRoute from './routes/secretRoute';
import bodyParse from 'body-parser';
import passport from 'passport'
import passportSetup from './passport-setup';
import cookieSession from 'cookie-session';
import cors from 'cors';
import Secret from './models/secretModel';

import User from './models/userModel'

dotenv.config();

const mongodbUrl = config.DATABASE_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).catch(error => console.log(error.reason));

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.use(bodyParse.json());
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [config.COOKIE_SECRET]
}))
app.use(passport.initialize());
app.use(passport.session());
var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

app.use("/api/users", userRoute);
app.use("/api/secrets", secretRoute);
app.get("/api/sayHello", (req, res) => {
    res.send("Hey, come get me!");
});
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '/../frontend/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../frontend/build/index.html'))
})

io.on('connection', (socket) => {

})

server.listen(config.PORT, () => {
    main();
});

const main = () => {
    console.log("Server started at http://localhost:5000")
    const createInitialAdmin = async () => {
        try {
            const findAdmin = await User.findOne({
                email: 'tranvanduc@gmail.com'
            })
            if(findAdmin) return;
            const user = new User({
                name: 'atticus',
                email: 'tranvanduc@gmail.com',
                password: 'admin',
                isAdmin: true
            });
            const newUser = await user.save();
            return;
        } catch (error) {
            console.log(error);
        }
    }
    createInitialAdmin();
    setInterval( async () => {
        try {
            const now = new Date().getTime();
            const deleted = await Secret.deleteMany({ expire: { $lt: now }});
            if(deleted.deletedCount > 0) {
                console.log(deleted.deletedCount +" secrets have been expired.");   
            }
        } catch (error) {
            console.log(error);
        }
    }, 60000)
}