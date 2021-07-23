//meeting route
const meetingRouter = require('express').Router();
const {getPool} = require('../Database/dataSource');



meetingRouter.get('/all',async(req,res)=>{
    try{
        var pool = await getPool();
    var {rowCount,rows} = await pool.query('SELECT * FROM PUBLIC.TODOLIST;');
        res.json({rowCount,rows});
    }catch(err){
        console.log(err);
        res.send('something went wrong');
    }
    //get pull will get the pool object which we can use to execute the query
});



module.exports = meetingRouter;