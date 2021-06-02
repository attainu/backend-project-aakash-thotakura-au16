const { initDatabaseConnection } = require('../config/database')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');


exports.login_get = (req, res) => {
	res.render('login')
}

exports.login_post = async (req,res,next) =>{
    const errors = validationResult(req);
	const connection = await initDatabaseConnection()

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [row] = await connection.execute(
            `SELECT * FROM loginuser WHERE user_email=?`,
            [req.body.email]
          );

        if (row.length === 0) {
            return res.status(422).json({
                message: "Invalid email address",
            });
        }

        const passMatch = await bcrypt.compare(req.body.password, row[0].password);
        if(!passMatch){
            return res.status(422).json({
                message: "Incorrect password",
            });
        }

        const theToken = jwt.sign({id:row[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });

        return res.json({
            token:theToken
        });

    }
    catch(err){
        next(err);
    }
}