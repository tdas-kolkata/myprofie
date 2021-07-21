const {Client} = require('pg');

// const client = new Client("postgres://postgres:postgres@localhost:5433/Market");

// client
//   .connect()
//   .then(() => console.log('connected'))
//   .catch(err => console.error('connection error', err.stack));

// client
// .query('SELECT * FROM PUBLIC.TODOLIST;')
// .then(res=>{console.log(res);})
// .catch(err=>{console.log(err);})
// .finally(()=>{client.end();})

async function getData(connectionString,sql){
    // let isConnected = false;
    // let client = new Client(connectionString);
    // client.connect().then(()=>{isConnected=true;}).catch(err=>console.log(err));
    // if(isConnected){
    //     return client;
    // }
    // else{
    //     return null;
    // }
    let data = null;
    let client = new Client(connectionString);
    try{
        await client.connect();
        data = await client.query(sql)
        client.end();
        return data;
    }
    catch(e){
        return e;
    }
};

module.exports = {getData};

// async function test(){
//     let {rows} = await getData("postgres://postgres:postgres@localhost:5433/Market",'SELECT * FROM PUBLIC.TODOLIST;')
//     console.log(rows);
// }
// test();