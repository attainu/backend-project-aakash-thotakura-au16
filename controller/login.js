
exports.login_get = (req, res) => {
	res.render('login')
}

exports.login_post = (req, res) => {
	let sql = `SELECT user_email, user_pass FROM loginuser WHERE user_email = '${req.user.email}' and user_pass = '${req.user.password}'`;

	jwt.sign(payload, secretKey, (err, token) => {
		if (err) {
			console.log('Error occured while generating token', err);
			return false
		} else {
			if (token != false) {
				// res.send(token)
				res.header();
				res.json({
					"results": {"status":true},
					"token": token,
					"data": results
				})
				res.end();
			}
			else {
				res.send("could not create token")
				res.send()
			}
		}
		
	})
}
