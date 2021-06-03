"use strict";

const express = require("express");
const PORT = process.env.PORT || 8000;
const path = require("path");
const bodyParser = require("body-parser");


var app = express();

app.use(express.static('public'));

app.get('/',(req,res)=>{
	res.render('./public/index.html');
})

app.listen(PORT,()=>{
	console.log(`App is running on port ${PORT}`);
})

