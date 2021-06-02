const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const { initDatabaseConnection } = require('../config/database')


exports.register_get = (req, res) => {
	res.render('register')
}

exports.register_post = async(req,res,next) => {
    const errors = validationResult(req);
    const connection = await initDatabaseConnection()

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [row] = await connection.execute(
            `SELECT user_email FROM loginuser WHERE user_email=?`,
            [req.body.email]
          );


        if (row.length > 0) {
            return res.status(201).json({
                message: "The E-mail already in use",
            });
        }

        // const hashPass = await bcrypt.hash(req.body.password, 12);

        // let sql = `INSERT INTO actor (first_name, last_name) VALUES('${req.body.firstName}', '${req.body.lastName}')`

        const [rows] = await connection.execute(`INSERT INTO loginuser(user_name,user_email,user_pass) VALUES(?,?,?),[
            ${req.body.name},
            ${req.body.email},
            ${req.body.password}
        ]`);

        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "The user has been successfully inserted.",
            });
        }
        
    }catch(err){
        // next(err);
        console.log(err)
    }
}
//  const connection = await initDatabaseConnection()
    
// 	let sql = `INSERT INTO loginuser(user_name,user_email,user_pass) VALUES('${req.body.name}','${req.body.email}','${req.body.password}')`;

// 	const [row] = await connection.execute(sql)
// 	res.send(row)

// }
