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

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: Token is not provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.decoded = decoded;
        next();
    } catch (error) {
        console.log(error)
        return res.status(403).json({ error1: "Forbidden: Failed to authenticate token", error });
    }
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

router.post("/users/tokenvalidate", verifyToken, (req, res) => {
    res.status(200).json({ valid: true, user: req.decoded });
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
