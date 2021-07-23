const {Client,Pool} = require('pg');

var pool = null;

function createPool(connectionString){
  try{
    pool = new Pool({
      connectionString: connectionString,
      ssl: {
        rejectUnauthorized: false,
        max: 6,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000
      }
    });
    return true;
  }catch(err){
    console.log(err);
    return false;
  }
};

async function getPool(){
  return pool;
}

module.exports = {createPool,getPool};

// async function test(){
//     let {rows} = await getData("postgres://pqniiokrsjnnzq:db853b738b3b2f13b25a6fe8d1effb514ccf4b53d4a75f31d181851925a41175@ec2-3-226-134-153.compute-1.amazonaws.com:5432/d139paokvtsvuc",'SELECT TO_CHAR(meeting_date,\'DD-MM-YYYY\') AS DATE FROM PUBLIC.TODOLIST;')
//     console.log(rows);
// }
// test();