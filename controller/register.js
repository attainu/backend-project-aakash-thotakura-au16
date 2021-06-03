
const { initDatabaseConnection } = require('../config/database')
const { check, validationResult } = require('express-validator');


exports.register_get = (req, res) => {
	res.render('register')
}

exports.register_post = async (req, res) => {
    console.log(req.body)

    const { name, email, password } = req.body

    connection.query('SELECT email FROM loginuser WHERE email=?', [email], async (error, result) => {
        if (error) {
            console.log(error);
        }

        if (result.length > 0) {
            return res.render('register', {
                message: 'Email already in use'
            })
        }

        let hashword = await bcrypt.hash(password, 4)
        console.log(hashword)
    })
}





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



