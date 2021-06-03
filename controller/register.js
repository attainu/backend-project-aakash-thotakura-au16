
const { initDatabaseConnection } = require('../config/database')
const bcrypt = require('bcryptjs');


exports.register_get = (req, res) => {
	res.render('register')
}

exports.register_post = async (req, res) => {

    const connection = await initDatabaseConnection()

    try {
        const { name, email, password, cpassword } = req.body;

        console.log("body", req.body)

        const result = await connection.query('SELECT user_email FROM loginuser WHERE user_email=?', email)

        // const result = await connection.query('SELECT user_email FROM loginuser WHERE user_email="aakash@gmail.com"', email)[0]
        console.log("queryRes", result[0])
        // console.log(result[0].length)
        
        
        // check for duplicate email address
        if (result[0].length > 0) {
            return res.render('register', { message: 'Email already registered' })
        }
        // check for same password
        else if ( password !== cpassword) {
            return res.render('register', {message: 'Password mismatch'})
        }

        let hashedPassword = await bcrypt.hash(password, 8)
        // console.log(hashedPassword)

        connection.query('INSERT INTO loginuser SET ?', {'user_name': name, 'user_email': email, 'user_pass': password}), (err, result) => {
            if (err) throw err
            else {
                res.render('login', {message: 'User Registered'})
            }
        }

    } catch (error) {
        console.log(error)
    }
}

//     const { name, email, password } = req.body

//     connection.query('SELECT email FROM loginuser WHERE email=?', [email], async (error, result) => {
//         if (error) {
//             console.log(error);
//         }

//         if (result.length > 0) {
//             return res.render('register', {
//                 message: 'Email already in use'
//             })
//         }

//         let hashword = await bcrypt.hash(password, 4)
//         console.log(hashword)
//     })





 // Validation
//  req.checkBody('email', 'Email is required.').notEmpty();
//  req.checkBody('email', 'Email is not valid').isEmail(); 
//  req.checkBody('password', 'Password is required').notEmpty();
//  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);


    // let verify = body();
    // const connection = await initDatabaseConnection()
    
    // body('email').isEmail()

    // req.check('username', 'Username field cannot be empty.').notEmpty();

    // const errors = req.validationErrors();

    // if (error) {
    //     console.log(error);
    //     res.render('reigster', { title: 'Registration Error' })
    // }

    // const username = req.body.name
    // const email = req.body.email
    // const password = req.body.password
    
	// let sql = `INSERT INTO loginuser(user_name,user_email,user_pass) VALUES('${req.body.name}','${req.body.email}','${req.body.password}')`;

	// const [rows] = await connection.execute(sql)
	// // res.send(row)
    // res.render('register', { tilte: 'Registration Complete'})
// }

// exports.register_post = async(req,res,next) => {
//     const errors = validationResult(req);
//     const connection = await initDatabaseConnection()

//     if(!errors.isEmpty()){
//         return res.status(422).json({ errors: errors.array() });
//     }

//     try{

//         const [row] = await connection.execute(
//             `SELECT user_email FROM loginuser WHERE user_email=?`,
//             [req.body.email]
//           );


//         if (row.length > 0) {
//             return res.status(201).json({
//                 message: "The E-mail already in use",
//             });
//         }

//         // const hashPass = await bcrypt.hash(req.body.password, 12);

//         // let sql = `INSERT INTO actor (first_name, last_name) VALUES('${req.body.firstName}', '${req.body.lastName}')`

//         const [rows] = await connection.execute(`INSERT INTO loginuser(user_name,user_email,user_pass) VALUES(?,?,?),[
//             ${req.body.name},
//             ${req.body.email},
//             ${req.body.password}
//         ]`);

//         if (rows.affectedRows === 1) {
//             return res.status(201).json({
//                 message: "The user has been successfully inserted.",
//             });
//         }
        
//     }catch(err){
//         // next(err);
//         console.log(err)
//     }
// }
// }



