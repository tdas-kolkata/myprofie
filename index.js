"use strict";

const express = require("express");
// var cors = require('cors')
const PORT = process.env.PORT || 8000;
const path = require("path");
const bodyParser = require("body-parser");
const https = require('https');


var app = express();

// app.use(cors()); # cors has been disabled to prevent cross origin requests

app.use(express.static('public'));

app.get('/vaccine_details',(req,res)=>{
	let date = req.query.date;
	let pincode = req.query.pincode;
	let total_data = '';
	https.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${date}`,(data_res)=>{
		// console.log(data_res.statusCode);
		// console.log(data_res.headers);
		data_res.on('data',data_chunk=>{
			total_data = total_data + data_chunk;
		});
		data_res.on('end',()=>{
			console.log(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${date}`,res.statusCode);
			console.log(total_data);
			res.status(200).json(JSON.parse(total_data));
		});
		data_res.on('error',(e)=>{
			console.log(e);
		});
	});
	// res.json(pay_load);
})

app.get('/ping',(req,res)=>{
	res.status(200).json({"msg": "server alive"});
})

app.get('/vaccineInfo',(req,res)=>{
	res.status(200).sendFile(path.join(__dirname, "/public/vaccine.html"))
});

app.get('/home',(req,res)=>{
	res.status(200).sendFile(path.join(__dirname, "/public/index.html"))
})


app.listen(PORT,()=>{
	console.log(`App is running on port ${PORT}`);
})

