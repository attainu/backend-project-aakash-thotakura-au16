const express = require('express');
const app = express();
const expHbs = require('express-handlebars')
const session = require('express-session')
// const mysql = require("mysql");
const database = require('./core/database')


app.engine('hbs', expHbs({ extname: 'hbs'  }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(express.static('views/images')); 

app.use(express.json());
app.use(express.urlencoded({extended: true}))

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root@admin25",
//     database: "nodejs"
// });

// connection.connect(function(error) {
// 	if (error) throw error
// 	else console.log("connection to database established")
// });

app.get('/', (req, res) => {
	res.render('ds-main')
})

app.get('/login', (req, res) => {
	res.render('login')
})	

app.post('/login', (req, res) => {
	let email = req.body.email;
	let password = req.body.password;
	
	connection.query("select * from loginuser where user_email = ? and user_pass = ?", [email, password], function(error, results, fields) {
		if (error) {throw error}
		else {
			if (results.length > 0) {
				res.redirect("/home");
			} else {
				res.redirect('/');
			}
		}
		res.end();
	})
})


app.get('/register', (req, res) => {
	console.log('rendering register')
	res.render('register')
})

app.post('/register', (req, res) => {
	// res.send('registerd your details')
	res.json({ 
		"username": req.body.name,
		"email": req.body.email,
		"password": req.body.password
	})
})

app.get("/home", (req, res) => {
	res.render('home')
})

app.post('/notepad', (req, res) => {
	res.send('this is a notepad for your to scribble')
})

app.post('/events', (req, res) => {
	res.send('add important events')
})

app.post('/tasks', (req, res) => {
	res.send('add list of to-do lists with reminder')
})

app.post('/photos', (req, res) => {
	res.send('save your pictures')
})

app.post('/videos', (req, res) => {
	res.send('save your videos')
})

app.post('/game', (req, res) => {
	res.send('idea is not developed yet')
})

app.post('/record', (req, res) => {
	res.send('record songs or notes')
})

app.post('/books', (req, res) => {
	res.send('track your books (fav, finished, to_be_read)')
})

app.listen(3000, () => {console.log('Server Initiated')})