const express = require("express");
const axios = require("axios");
const Sentiment = require("sentiment");
require('dotenv').config()
const router = express.Router();
const sentiment = new Sentiment();
function detectMood(text){
    const score = sentiment.analyze(text).score;
    if(score > 2){
        return "happy";
    }
    if(score < -2){
        return "sad";
    }
    return "relaxed";
}
router.post("/", async (req, res) => {
    try {
        const mood = detectMood(req.body.text);
        const API = process.env.API_KEY;

        const query = {
            happy: "Happy music",
            sad: "comfort music",
            relaxed: "relaxing music"
        };

        const searchQuery = encodeURIComponent(query[mood]);

        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&key=${API}&type=video&maxResults=5`;

        const response = await axios.get(url);

        res.json(response.data.items);
    } catch (err) {
    console.log(err.response.data);   // very important
    res.status(500).json({ error: "YouTube API request failed" });
}
});
module.exports = router;