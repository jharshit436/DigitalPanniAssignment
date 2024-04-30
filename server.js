require("dotenv").config()
const express= require("express");
const mongoose=require('mongoose')
const bodyParser=require('body-parser');
const connectDb = require("./service/db");
const authRoutes=require('./routes/auth');
const bookRoutes=require('./routes/book')
const app=express();


app.use(bodyParser.json());

connectDb()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/user/auth",authRoutes);
app.use("/book",bookRoutes);


app.listen(3000,"0.0.0.0",()=>{
    console.log("Server Started");
})