const express = require('express');
const router = express.Router(); 
const postModel = require('../Schema/postModel');

router.get("/", async (req, res) => {
    try {
        const data = await postModel.find();
        res.json(data);
    } catch (error) {
        console.log(error); 
        res.status(500).send("An error occurred");
    }
});

module.exports = router;