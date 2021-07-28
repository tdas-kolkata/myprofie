"use strict";

const express = require("express");
// var cors = require('cors')
const path = require("path");
const { createPool, getPool } = require('./Database/dataSource')
require('dotenv').config();
const PORT = process.env.PORT;

var app = express();

// app.use(cors()); # cors has been disabled to prevent cross origin requests
const isConnectedToDB = createPool(process.env.DATABASE_URL);
console.log(`Connected to DB and connection pool is created - ${isConnectedToDB}`);


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', async (req, res) => {
	console.log(req.body);
	res.status(200).json({ "msg": "server alive" });
})

app.get('/pingdatabase', async (req, res) => {
	const pool = await getPool();
	// console.log(pool);
	const client = await pool.connect()
	const data = await client.query('SELECT NOW()')
	client.release()
	res.status(200).json(data.rows);
})

app.get('/vaccineInfo', (req, res) => {
	res.status(200).sendFile(path.join(__dirname, "/public/vaccine.html"))
});

app.get('/home', (req, res) => {
	res.status(200).sendFile(path.join(__dirname, "/public/index.html"))
})

app.get('/resume', (req, res) => {
	res.status(200).sendFile(path.join(__dirname, "/public/Resume_Web_Dev_V1.pdf"))
})

app.use('/meeting', require('./Routes/meetingRouter'));

app.listen(PORT, () => {
	console.log(`App is running on port ${PORT}`);
})