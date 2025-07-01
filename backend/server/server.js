const express = require('express');
const cors=require('cors')
const app = express()
const router = require('./routes/routes');
const connectDB =require("./database/db.js");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
connectDB();
app.listen(8000,()=>
{
    console.log("server running on port 8000");
});