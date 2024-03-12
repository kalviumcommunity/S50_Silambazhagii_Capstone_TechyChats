const express = require('express');
const app = express();
const connectDB = require('./config.js/connect');
const port = 3000; 

connectDB();

app.listen(port, () => {
    console.log(`🚀 Server running on PORT: ${port}`);
});

module.exports = app;