const express = require('express')
const fs = require("fs")

const app=express();

app.use(express.json())
const PORT=3006

function readData(){
    const data=fs.readFileSync("./data.json");
    return JSON.parse(data);
}
app.get("/products" , (req,res)=>{
    const products=readData();
    res.json(products);
});

app.get("/products/:id",(req,res)=>{
    const products=readData();
    const id=parseInt(req.params.id);
    const product=products.find(p=>p.id===p.id);
    if(!product){
        return res.json({message: "Product not found"});
    }
    res.json(product);
})

app.listen(PORT);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});