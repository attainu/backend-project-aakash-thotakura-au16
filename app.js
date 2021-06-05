require('dotenv').config()
const express = require('express');
const app = express();
const fs = require('fs/promises');
const expHbs = require('express-handlebars');
const session = require('express-session');
const router = require('./routes/index');
const expressUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2
// const jwt = require('jsonwebtoken');
const base64 = require('base64-arraybuffer')


app.engine('hbs', expHbs({ extname: 'hbs'  }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(express.json());
app.use(expressUpload());
app.use(express.urlencoded({ extended: true }))


app.use('/', router);

app.get('/', async (req, res) => {
	res.send('index')
})

// cloudinary.config({ 
//     cloud_name: 'beproject',
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET
// });


// app.get('/test', (req, res) => {
//     res.render('test')
// })

// app.post('/test', async (req, res) => {

// 	// console.log(req.body)
// 	// console.log(req.files)

// 	// //move to local file system
// 	// const fileName = req.files.myData.name
// 	// await req.files.myData.mv(`./uploads/${fileName}`)

// 	// // upload to cloudinary
// 	// const moved = await cloudinary.uploader.upload(`./uploads/${fileName}`)
// 	// const uploadFile = await fs.unlink(`./uploads/${fileName}`)

// 	// console.log(moved, uploadFile)
// 	// console.log("removed")

// 	try {
		
// 		const bas64FormattedString = await base64.encode(req.files.myData.data)
// 		// res.json({
// 		// 	data: req.files.myData,
// 		// 	data2: req.files.myData.data,
// 		// 	string: bas64FormattedString
// 		// })
// 		// res.send(bas64FormattedString)

// 		// const uploadFile = await cloudinary.uploader.upload(bas64FormattedString)
// 		const uploadFile = await cloudinary.uploader.upload(`data:${req.files.myData.mimetype};base64,${bas64FormattedString}`)
// 		// res.json({
// 		// 	success: true,
// 		// 	json: uploadFile
// 		// })
// 		res.send({"success": true})
// 	} catch (error) {
// 		console.log(error)
		
// 	}


// })




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
	console.log("Server Initiated; Listening at", process.env.PORT)
   // await initDatabaseConnection()
})
