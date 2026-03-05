const express = require('express');
const Task = require("../models/Task");

const router = express.Router();

router.get("/", async (req, res) =>  {
        const tasks = await Task.find();
        res.json(tasks);
    });

router.post("/", async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.json(task);
    } catch (error) {
        res.json({messsage: "Cannot Post"});
    }
});

module.exports = router;            