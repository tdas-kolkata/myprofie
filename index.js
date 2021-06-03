"use strict";

const express = require("express");
const PORT = process.env.PORT || 8000;
const path = require("path");
const bodyParser = require("body-parser");


var app = express();

app.get('/',(req,res)=>{
	res.send('Hello World');
})

app.listen(PORT,()=>{
	console.log(`App is running on port ${PORT}`);
})

