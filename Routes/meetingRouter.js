//meeting route
const meetingRouter = require('express').Router();
const {getData} = require('../Database/dataSource');

meetingRouter.get('/all',async(req,res)=>{
    var data = await getData();
    //get pull will get the pool object which we can use to execute the query
    res.json(data);
});


module.exports = meetingRouter;