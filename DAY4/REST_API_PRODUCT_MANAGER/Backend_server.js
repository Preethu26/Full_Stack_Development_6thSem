const express=require("express")
const fs=require("fs")

const app=express();

app.use(express.json())

const PORT=3006

function readData(){
    const data=fs.readFileSync("./data.json")
    return JSON.parse(data);


}
app.get("/products",(req,res)=>{
    const products=readData();
    res.json(products);
});

app.listen(PORT);