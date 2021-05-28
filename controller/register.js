
exports.register_get = (req, res) => {
	res.render('register')
}

exports.register_post = (req, res) => {

	console.log(req.body.name, req.body.email, req.body.password)

	let sql = `INSERT INTO loginuser (user_name, user_email, user_pass) VALUES('${req.body.name}', '${req.body.email}', '${req.body.password}')`

	const [rows] = await connection.execute(sql)
	res.json(rows)

}
