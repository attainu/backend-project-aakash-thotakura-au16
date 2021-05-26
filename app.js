const express = require('express');
const app = express();
const expHbs = require('express-handlebars')
// const cookieParser = require('cookie-parser')
const session = require('express-session')

app.engine('hbs', expHbs({ extname: 'hbs'  }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(express.static('views/images')); 

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
	res.render('ds-main')
})

app.get('/signIn', (req, res) => {
	res.render('signIn')
})	

app.post('/signIn', (req, res) => {
	console.log('text')	
})

app.get('/signUp', (req, res) => {
	console.log('rendering signUp')
	res.render('signUp')
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