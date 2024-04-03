const express = require('express');
const router = express.Router(); 
const userModel = require('../Schema/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const sec = process.env.JWT_SECRET;

const generateToken = (user) => {
    return jwt.sign({ user }, sec, { expiresIn: '1h' });
};

router.get("/", async (req, res) => {
    try {
        const data = await userModel.find();
        res.json(data);
    } catch (error) {
        console.log(error);     
        res.status(500).send("An error occurred");
    }
});

router.post("/", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        console.log(hashedPassword)

        const hashedRepeatPassword = await bcrypt.hash(req.body.repeat_password, 10);
        req.body.repeat_password = hashedRepeatPassword;
        console.log(hashedRepeatPassword);

        const data = await userModel.create(req.body);
        console.log(data);

        const token = generateToken(data);
        console.log(token);

        res.status(201).json({ userData: data, token: token });
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred");
    }
});

module.exports = router;
