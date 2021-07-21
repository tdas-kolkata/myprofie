//meeting route
const meetingRouter = require('express').Router();
const {getData} = require('../Database/dataSource');


const connStr = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5433/Market";

meetingRouter.get('/all',async(req,res)=>{
    var {rows} = await getData(connStr,'SELECT * FROM PUBLIC.TODOLIST;');
    //get pull will get the pool object which we can use to execute the query
    res.json(rows);
});


module.exports = meetingRouter;