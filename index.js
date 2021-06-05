"use strict";

const express = require("express");
const PORT = process.env.PORT || 8000;
const path = require("path");
const bodyParser = require("body-parser");
const https = require('https');


var app = express();

app.use(express.static('public'));

app.get('/details',(req,res)=>{
	let total_data = '';
	https.get("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=711101&date=05-06-2021",(data_res)=>{
		// console.log(data_res.statusCode);
		// console.log(data_res.headers);
		data_res.on('data',data_chunk=>{
			total_data = total_data + data_chunk;
		});
		data_res.on('end',()=>{
			res.json(JSON.parse(total_data));
		});
	});
	// res.json(pay_load);
})

app.get('/',(req,res)=>{
	res.render('./public/index.html');
})


app.listen(PORT,()=>{
	console.log(`App is running on port ${PORT}`);
})

