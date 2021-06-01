const { initDatabaseConnection } = require('../config/database')


exports.books_get = (req, res) => {
	res.render('books')
	// res.send('add books.hbs')
}

exports.books_post = async (req, res) => {

	const connection = await initDatabaseConnection()
	let sql = `INSERT INTO authors (book_name, author_name) VALUES ('${req.body.book_name}', '${req.body.author_name}')`

	//need to give link to upload the file into cloudinary

	const [row] = await connection.execute(sql)
	// res.send('book saved successfully')
	res.redirect('/books_data')

}

exports.booksdata_get = async (req, res) => {

	const connection = await initDatabaseConnection()
	let sql = 'SELECT * FROM authors'

	const [row] = await connection.execute(sql)
	res.send(row)

}
