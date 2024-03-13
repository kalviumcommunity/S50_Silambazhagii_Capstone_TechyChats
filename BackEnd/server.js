const express = require('express');
const app = express();
const connectDB = require('./config.js/connect');
const port = 3000; 
const userRouter = require("./Routes/user")
const postRouter = require("./Routes/post")

connectDB();

app.use(express.json());

app.get('/ping', ( req , res ) => {
    res.send("pong");
});

app.use("/users", userRouter)
app.use("/posts", postRouter)

app.listen(port, () => {
    console.log(`🚀 Server running on PORT: ${port}`);
});

module.exports = app;