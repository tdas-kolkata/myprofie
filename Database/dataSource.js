const {Pool} = require('pg');
var connectionPool = null;

/**
 * Documentation
 * 
 * You can call this synchronous function before you start your express server
 * @param {string} connectionString 
 * @returns {boolean} isDatabaseConnectionCreated
 */
function createPool(connectionString){
    const pool_config = {
        connectionString:connectionString,
        connectionTimeoutMillis: 10000,
        idleTimeoutMillis: 10000,
        max: 10,
    }
    //create new instance of the pool object
    try{
        connectionPool = new Pool(pool_config);
        return true;
    }
    catch(err){
        console.log(`database connection not established : ${err}`);
        return false;
    }
};

/**
 * @returns the connection pool object that was created
 */
async function getPool(){
    return connectionPool;
};

async function getData(sql){
    try{
        console.log(connectionPool);
        console.log(sql);
        var data = await connectionPool.query(sql)
        return data;
    }
    catch(err){
        return {error:err};
    }
}

module.exports = {createPool,getPool,getData}

// unit testing code
// async function test(){
//     var a = createPool(process.env.DATABASE_URL);
//     console.log(process.env.DATABASE_URL);
//     // console.log(a);
//     // const data = await getData('SELECT * FROM PUBLIC.TODOLIST');
//     // console.log(data.rows);
// };
// test();

