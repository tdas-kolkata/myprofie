"use strict";

const express = require("express");
// var cors = require('cors')
const PORT = process.env.PORT || 8000;
const path = require("path");
const  {createPool,getPool} = require('./Database/dataSource')
require('dotenv').config();


var app = express();

// app.use(cors()); # cors has been disabled to prevent cross origin requests
const a = createPool(process.env.DATABASE_URL);
console.log(a);


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/ping',async (req,res)=>{
	res.status(200).json({"msg": "server alive"});
})

app.get('/ping2',async (req,res)=>{
	const pool = await getPool();
	// console.log(pool);
	const client = await pool.connect()
	const data = await client.query('SELECT NOW()')
	client.release()
	res.status(200).json(data.rows);
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

