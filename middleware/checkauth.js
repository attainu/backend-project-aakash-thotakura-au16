const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {

    try {

        const authToken = req.headers.authentication
        console.log(authToken)

        if (!authToken) return res.json({ error: true })


        const verified = jwt.verify(authToken, process.env.JWT_SECRET)
        console.log(verified)

        req.user = verified

        next()

    } catch (error) {
        return res.json({ error: true })
    }

}

module.exports = { authenticateToken }