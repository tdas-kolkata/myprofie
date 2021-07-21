//todos class is is defined to to describe the todo list table 

class todo{
    meeting_sub = '';
    host = '';
    meeting_id = '';
    passcode = '';
    meeting_date = '';
    meeting_time = '';
    user_id = '';

    constructor(id,name){
        this.id = id;
        this.#name = name;
        this.constructor.c ++;
    }
    privatemethod = ()=>{
        return this.id;
    }
}



