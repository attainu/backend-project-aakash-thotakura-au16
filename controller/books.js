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

// books
exports.booksdata_get = async (req, res) => {

	const connection = await initDatabaseConnection()
	let sql = 'SELECT * FROM authors'

	const [row] = await connection.execute(sql)
	res.send(row)

}

// update books
exports.books_update =  async (req, res) => {

    let sql = `UPDATE authors SET book_name='${req.body.book_name}', author_name='${req.body.author_name}' WHERE book_id='${req.params.book_id}'`;
    
    const [rows] = await connection.execute(sql) 
    res.json(rows)
}

// delete books
exports.books_delete =  async (req, res) => {
    
    let sql = `DELETE FROM authors WHERE book_id='${req.params.book_id}'`;
    console.log(sql)
    
    const [rows] = await connection.execute(sql)
    
    res.json(rows)
}
