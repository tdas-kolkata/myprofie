const meetingRouter = require('express').Router();

meetingRouter.get('/api',async(req,res)=>{
    res.send("response from meeting route");
});

module.exports = meetingRouter;