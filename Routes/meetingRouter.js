//meeting route
const express = require('express');
const meetingRouter = express.Router();
const {getPool} = require('../Database/dataSource');

//api for getting all todos
meetingRouter.get('/all',async(req,res)=>{
    try{
        var pool = await getPool();
        var {rowCount,rows} = await pool.query('SELECT * FROM PUBLIC.TODOLIST;');
        res.json({rowCount,rows});
    }catch(err){
        console.log(err);
        res.send('something went wrong');
    }
});

//details-get end point is there to get details about a particular todo 
//delete request at the same end points deletes it from the database
meetingRouter.route('/details/:id')
.get(async(req,res)=>{
    var id = req.params.id;
    try{
        var pool = await getPool();
        var {rowCount,rows} = await pool.query('SELECT * FROM PUBLIC.TODOLIST WHERE ID = $1 ;',[id]);
        res.send({rowCount,rows});
    }catch(err){
        console.log(err);
        res.send('something went wrong');  
    }    
})
.delete(async(req, res)=>{
    var id = req.params.id;
    try{
        var pool = await getPool();
        var {rowCount,rows} = await pool.query('DELETE FROM PUBLIC.TODOLIST WHERE ID = $1 ;',[id]);
        res.send({rowCount,rows});
    }catch(err){
        console.log(err);
        res.send('something went wrong');  
    } 
});

//add endpoint adds a new entry in todolist
meetingRouter.post('/add',async(req,res)=>{
    try{
        var pool = await getPool();
        const {meeting_sub,host,meeting_id,passcode,meeting_date,meeting_time,user_id} = req.body
        // console.log({meeting_sub,host,meeting_id,passcode,meeting_date,meeting_time,user_id});
        const data = await pool.query(`INSERT INTO public.todolist\
        (meeting_sub, host, meeting_id, passcode, meeting_date, meeting_time, user_id\) 
        VALUES \($1,$2,$3,$4,$5,$6,$7\)`
        ,[meeting_sub ,host ,meeting_id ,passcode ,meeting_date ,meeting_time ,user_id ]);
        // console.log(data);
        if(data.rowCount==1){
            res.json({insert:"OK"});
            console.log({meeting_sub,host,meeting_id,passcode,meeting_date,meeting_time,user_id}); 
        }
        else{
            throw data
        }
    }
    catch(err){
        console.log(err);
        res.json('{insert : "Failed"}');
    }
})

meetingRouter.post('/update/:id',async(req,res)=>{
    try{
        var pool = await getPool();
        var id = req.params.id;
        const {meeting_sub,host,meeting_id,passcode,meeting_date,meeting_time,user_id} = req.body;
        const data =  await pool.query(`UPDATE public.todolist SET 
        meeting_sub=$2, host=$3, meeting_id=$4, passcode=$5, meeting_date=$6, meeting_time=$7, user_id=$8 
        WHERE id=$1`
        ,[id,meeting_sub ,host ,meeting_id ,passcode ,meeting_date ,meeting_time ,user_id ]);

        if(data.rowCount==1){
            res.json({update:"OK"});
            console.log({meeting_sub,host,meeting_id,passcode,meeting_date,meeting_time,user_id}); 
        }
        else{
            throw data
        }
    }catch(err){
        res.send('{update:"failed"}');
        console.log(err);
    }
});

module.exports = meetingRouter;