const jwt = require('jsonwebtoken');

// function authenticateToken(req, res, next) {
	
// 	try {
// 		const authToken = req.headers.authentication
// 		// console.log(authToken)
	
// 		if (!authToken) return res.json({error: true})
	
// 		const verified = jwt.verify(authToken, process.env.JWT_SECRET)
// 		// console.log(verified)

// 		req.user = verified
// 		console.log(req.user)
	
// 		next()
// 	} catch (error) {
// 		return res.json({error: true})
		
// 	}

// }

// module.exports = { authenticateToken }

// check


exports.protect = async (req, res, next) => {

	// console.log("hi")
	let token;
	if (
	  req.headers.authorization &&
	  req.headers.authorization.startsWith('Bearer')
	) {
	  token = req.headers.authorization.split(' ')[1];
	} else if (req.headers.cookie) {
	  token = req.headers.cookie.split('=')[1];
	  
	}

	// let token = req.headers.cookie.split('=')[1]
	// console.log(token)


	if (!token) {
		console.log('no token found')
		res.redirect('/')
	  	return 
		// new AppError('You are not logged in! Please log in to get access.', 401)
	  
	}
  
	// 2) Verification token
	//   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	// console.log("decode", decoded);

	next()
  
	// 3) Check if user still exists
// 	const currentUser = await User.findById(decoded.id);
// 	if (!currentUser) {
// 	  return next(
// 		new AppError(
// 		  'The user belonging to this token does no longer exist.',
// 		  401
// 		)
// 	  );
// 	}
// 	req.user = currentUser;
// 	next();
  };
  
