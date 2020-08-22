const { Item } = require('../models')

const authorization = (req, res, next) => {
    const { id } = req.params
    Item.findOne({
        where: {id}
    })
    .then(item => {
        if(item.UserId === req.userId){
            next()
        } else {
            throw {message:'unauthorized to do this action'}
        }
    })
    .catch(err => {
        err = {errorCode: 'authorizationFailed', message: err.message, status: 403}
        next(err)
    })
}

module.exports = authorization