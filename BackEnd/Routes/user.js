const express = require('express');
const router = express.Router(); 
const userModel = require('../Schema/userModel');

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
        const data = await userModel.create(req.body);
        console.log(data)
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred");
    }
});

module.exports = router;