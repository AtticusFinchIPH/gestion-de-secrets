import express from 'express';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import bodyParse from 'body-parser';

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));

const app = express();

app.use(bodyParse.json());
app.use("/api/users", userRoute);

app.get("/api/sayHello", (req, res) => {
    res.send("Hello, come get me!");
});

app.post("/api/secret", (req, res) => {
    return res.status(200).send({link: "hello there!"});
});

app.listen(5000, () => {console.log("Server started at http://localhost:5000")});