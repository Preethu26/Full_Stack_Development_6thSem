const express = require("express");
const cors = require("cors");
const moodRoutes = require("./routes/mood");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT
app.use(cors());
app.use(express.json());
app.use("/mood",moodRoutes);
app.listen(PORT,()=>
console.log(`Server in ${PORT}`))