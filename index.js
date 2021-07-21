"use strict";

const express = require("express");
// var cors = require('cors')
const PORT = process.env.PORT || 8000;
const path = require("path");
require('dotenv').config();
const {createPool} = require('./Database/dataSource');

//create the database pool connection synchronousy
const isDatabaseConnectionCreated = createPool(process.env.DATABASE_URL);

if(isDatabaseConnectionCreated){
	console.log('database pool connection created.....')
}

var app = express();

// app.use(cors()); # cors has been disabled to prevent cross origin requests

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/ping',(req,res)=>{
	res.status(200).json({"msg": "server alive"});
})

app.get('/vaccineInfo',(req,res)=>{
	res.status(200).sendFile(path.join(__dirname, "/public/vaccine.html"))
});

app.get('/home',(req,res)=>{
	res.status(200).sendFile(path.join(__dirname, "/public/index.html"))
})

app.use('/meeting',require('./Routes/meetingRouter'));

app.listen(PORT,()=>{
	console.log(`App is running on port ${PORT}`);
})

