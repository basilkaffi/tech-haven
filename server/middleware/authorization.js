const { User } = require('../models')

const authorization = (req, res, next) => {
    User.findByPk(req.userId)
    .then(user => {
        if(user.role === 'admin') {
            next()
        } else {
            throw {errorCode: 'authorizationFailed', message:'only admin can do this action', status: 403}
        }
    })
    .catch(next)
}

module.exports = authorization