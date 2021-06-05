const { initDatabaseConnection } = require('../config/database')
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');



exports.login_get = (req, res) => {
	res.render('login')
}


exports.login_post = async (req, res) => {
	const connection = await initDatabaseConnection()

	try {
		const { email, pass } = req.body;

		// console.log(req.body)

		if ( !email || !pass ) {
			return res.status(400).render('login', { message: 'Please enter valid Email and Password' })
		}

		const [result] = await connection.query('SELECT * FROM loginuser WHERE user_email=?', req.body.email)
		// console.log(result[0].user_pass)
		// console.log(req.body.pass)

		if (result[0].user_pass === req.body.pass) {

			const accessToken = jwt.sign(req.body, process.env.JWT_SECRET, { expiresIn: "1h"})
			const refreshToken = jwt.sign(req.body, process.env.REFRESH_KEY)

			// console.log(accessToken, refreshToken)

			// res.json({
			// 	'accessToken': accesstoken,
			//  	'refreshToken': refreshToken
			// })
			// console.log(token)

			res.cookie('jwt', accessToken, {
				expires: new Date(
				  Date.now() + process.env.JWT_COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
				),
				httpOnly: true, // cookie cannot be accessed or modified in any way by the browser
				secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
			  });


			res.redirect('/')
			// res.render('game')

		} else {
			res.render('login', { message: 'Invalid credentials' })
		}
		// res.json({ accessToken: token})

	} catch (error) {
		
	}
}

exports.logout_get = (req, res) => {
	// res.send({message: 'Logged Out'})
	res.render('logout')
}

exports.logout_post = (req, res) => {
	const tokenToDelete = req.body.headers.cookie

    refreshToken = refreshToken.filter(token => token !== tokenToDelete)
	
    // res.json({deleted: true})
	res.redirect('/')
}

function generateJwt(payload) {
	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h"})
}




		// 	if ( !result || !(await bcrypt.compare(pass, result[0].password)) ) {
		// 		res.status(401).render('login', { message: 'Email or Password is Incorrect' })
		// 	} else {

		// 		//generate jwt token
		// 		const id = result[0].id;

		// 		const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION});
		// 		console.log(token);

		// 		const cookieOptions = { expires: new Date(
		// 			Date.now() + process.env.JWT_COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
		// 		), httpOnly: true}
		// 	}

		// 	res.cookie('jwt', token, cookieOptions );
		// 	res.status(200).redirect('/game')
		// })


// 	} catch (error) {
		
// 	}
// }

// exports.login_post = [
//     check('email','Invalid email').isEmail(),

// ], async (req, res, next) => {
//     const err = validationResult(req);

//     if (!err.isEmpty()) {
//         return res.status(400).json({
//             success: false,
//             err: err.array()
//         })
//     }

//     res.status(200).json({
//         success: true,
//         message: 'Login Successful'
//     })
// }

// exports.login_post = async (req,res,next) =>{
//     const errors = validationResult(req);
// 	const connection = await initDatabaseConnection()

//     if(!errors.isEmpty()){
//         return res.status(422).json({ errors: errors.array() });
//     }

//     try{

//         const [row] = await connection.execute(
//             `SELECT * FROM loginuser WHERE user_email=?`,
//             [req.body.email]
//           );

//         if (row.length === 0) {
//             return res.status(422).json({
//                 message: "Invalid email address",
//             });
//         }

//         const passMatch = await bcrypt.compare(req.body.password, row[0].password);
//         if(!passMatch){
//             return res.status(422).json({
//                 message: "Incorrect password",
//             });
//         }

//         const theToken = jwt.sign({id:row[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });

//         return res.json({
//             token:theToken
//         });

//     }
//     catch(err){
//         next(err);
//     }
// }