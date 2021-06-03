const {initDatabaseConnection} = require('./config/database')
require('dotenv').config()
const express = require('express');
const app = express();
const expHbs = require('express-handlebars');
const session = require('express-session');
const router = require('./routes/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


app.engine('hbs', expHbs({ extname: 'hbs'  }))
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use('/', router);

app.get('/index', async (req, res) => {
	res.render('index')
})

// let connection = null

// async function initDatabaseConnection() {

//     connection = await mysql.createConnection({
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASS,
//         database: process.env.MYSQL_DB
//     });
//     connection.connect(function(err){
//         if (err){
//           console.log('error connecting:' + err.stack);
//         }
//         console.log('Connection Established with Database Successfully');
//       });
//     // connection.connect()
//     // console.log("Connection Established with Database Successfully")
//     // return connection
// }

// initDatabaseConnection()


// errors: page not found
app.use((req, res, next) => {
	let err = new Error('Page not found');
	err.status = 404;
	next(err)
})

//handling errros: page not found
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.send((err.message))
});

app.listen(process.env.PORT, async () => {
	console.log("Server Initiated; Listening at 3000")
    await initDatabaseConnection()
})
