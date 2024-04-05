const express = require('express');
const router = express.Router();
const userModel = require('../Schema/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const sec = process.env.JWT_SECRET;
const userSchema = require('./userSchema');

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
        // Validate request body against userSchema
        const validationResult = userSchema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({ error: validationResult.error.details[0].message });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;

        const hashedRepeatPassword = await bcrypt.hash(req.body.repeat_password, 10);
        req.body.repeat_password = hashedRepeatPassword;

        const data = await userModel.create(req.body);

        const token = generateToken(data);

        res.status(201).json({ userData: data, token: token });
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred");
    }
});

module.exports = router;
