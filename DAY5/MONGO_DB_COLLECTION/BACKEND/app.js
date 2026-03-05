require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");  //sharing the resources from one to another
const app=express()
app.use(cors());
app.use(express.json());
const taskRoutes=require("./routes/taskRoutes");
app.use("/api/tasks",taskRoutes);
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Connected to MongoDB"));


const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})