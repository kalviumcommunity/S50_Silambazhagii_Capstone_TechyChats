const express = require('express');
const cors = require('cors'); // Importing the CORS middleware
const app = express();
const connectDB = require('./config.js/connect');
const port = 3000; 
const userRouter = require("./Routes/user")
const postRouter = require("./Routes/post")

connectDB();

app.use(express.json());

// Adding CORS middleware
app.use(cors());

app.get('/ping', (req, res) => {
    res.send("pong");
});

app.use("/users", userRouter)
app.use("/posts", postRouter)

app.listen(port, () => {
    console.log(`🚀 Server running on PORT: ${port}`);
});

module.exports = app;
