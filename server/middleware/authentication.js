const jwt = require('jsonwebtoken')
const { User } = require('../models')

const authentication = (req, res, next) => {
    const  {access_token } = req.headers
    try {
        let decoded = jwt.verify(access_token, process.env.SECRET_TOKEN)
        req.userId = decoded.userId
        User.findByPk(decoded.userId)
        .then(user => {
            next()
        })
        .catch(err => {
            console.log(err)
        })
    } catch(err) {
        err = {errorCode: 'authenticationFailed', message:'token either invalid or not exist', status: 401}
        next(err)
    }
}

module.exports = authentication