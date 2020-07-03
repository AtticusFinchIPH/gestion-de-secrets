import express from 'express';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import secretRoute from './routes/secretRoute';
import bodyParse from 'body-parser';
import Secret from './models/secretModel';

import User from './models/userModel'

dotenv.config();

const mongodbUrl = config.DATABASE_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));

const app = express();

// const path = require('path')
// // Serve static files from the React frontend app
// app.use(express.static(path.join(__dirname, 'frontend/build')))
// // Anything that doesn't match the above, send back index.html
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/frontend/build/index.html'))
// })

app.use(bodyParse.json());
app.use("/api/users", userRoute);
app.use("/api/secrets", secretRoute);

app.get("/api/sayHello", (req, res) => {
    res.send("Hello, come get me!");
});

app.get("/api/secrets", async (req, res) => {
    console.log("Create Admin from server...");
    try {
        const user = new User({
            name: 'atticus',
            email: 'tranvanduc@gmail.com',
            password: 'admin',
            isAdmin: true
        });
        console.log(user);
        const newUser = await user.save();
        res.send(user);
    } catch (error) {
        res.send({msg: error.message});
    }
});

app.listen(config.PORT, () => {
    main();
});

const main = () => {
    console.log("Server started at http://localhost:5000")
    const user = new User({
        name: 'atticus',
        email: 'tranvanduc@gmail.com',
        password: 'admin',
        isAdmin: true
    });
    console.log(user);
    const run = async () => {
        const newUser = await user.save();
        console.log(newUser);
    }
    run();
    setInterval( async () => {
        const deleted = await Secret.deleteMany({ $where: function(){ return this.expire < new Date().getTime()}});
        console.log(deleted)
        if(deleted.deletedCount > 0) {
            console.log(deleted.deletedCount +" secrets have been expired.");   
        }
    }, 60000)
}