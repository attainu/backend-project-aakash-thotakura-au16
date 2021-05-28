// const {initDatabaseConnection} = require('./core/database')
const express = require('express');
const app = express();
const expHbs = require('express-handlebars')
const session = require('express-session')
const route = require('./routes/index')
const mysql = require("mysql2/promise");
require('dotenv').config()


app.engine('hbs', expHbs({ extname: 'hbs'  }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(express.static('views/images')); 

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/', route);

let connection = null

async function initDatabaseConnection() {

    connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.MYSQL_DB
    });
    console.log("Connection Established with Database Successfully")
}

initDatabaseConnection()

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
})
