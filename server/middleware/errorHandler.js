const errorHandler = (err, req, res, next) => {
    let statusCode = 500
    let errorCode = 'unknownError'
    let detail = null

    if(err.errorCode) {
        errorCode = err.errorCode
        detail = err.message
        if(err.status){
            statusCode = err.status
        }
    } else if(err.name === 'SequelizeValidationError') {
        statusCode = 400
        errorCode = 'validationError'
        let details = []
        err.errors.forEach(error => {
            details.push(error.message)
        });
        detail = details
    } else {
        console.log('DARI ERROR HANDLER', err)
        detail = 'internal server error'
    }
    res.status(statusCode).json({errorCode, detail})
}

module.exports = errorHandler