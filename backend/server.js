import express from 'express';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import secretRoute from './routes/secretRoute';
import bodyParse from 'body-parser';
import Secret from './models/secretModel';

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
app.use("/api/secrets", secretRoute);

app.get("/api/sayHello", (req, res) => {
    res.send("Hello, come get me!");
});

app.listen(5000, () => {
    main();
});

const main = () => {
    console.log("Server started at http://localhost:5000")
    setInterval( async () => {
        const deleted = await Secret.deleteMany({ $where: function(){ return this.expire < new Date().getTime()}});
        console.log(deleted)
        if(deleted.deletedCount > 0) {
            console.log(deleted.deletedCount +" secrets have been expired.");   
        }
    }, 60000)
}