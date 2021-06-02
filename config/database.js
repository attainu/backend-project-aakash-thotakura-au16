// const mysql = require('mysql2/promise');

// async function initDatabaseConnection(){

//     let connection = await mysql.createConnection({
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASS,
//         database: process.env.MYSQL_DB
//     });
//     await connection.connect()

//     console.log("Connection Established with Database Successfully")
//     // console.log(connection)
//     return connection

// }

// module.exports = { initDatabaseConnection }