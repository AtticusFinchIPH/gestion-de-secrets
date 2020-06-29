import express from 'express';

const app = express();

app.get("/api/get", (req, res) => {
    res.send("hello");
});

app.post("/api/secret", (req, res) => {
    return res.status(200).send({link: "hello there!"});
});

app.listen(5000, () => {console.log("Server started at http://localhost:5000")});