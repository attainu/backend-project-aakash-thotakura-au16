const { initDatabaseConnection } = require('../config/database')


exports.register_get = (req, res) => {
	res.render('register')
}

exports.register_post = async (req, res) => {

	const connection = await initDatabaseConnection()

	let sql = `INSERT INTO loginuser (user_name, user_email, user_pass) VALUES('${req.body.name}', '${req.body.email}', '${req.body.password}')`

	const [rows] = await connection.execute(sql)
	res.json(rows)

}
