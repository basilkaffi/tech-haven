const bcrypt = require('bcrypt')

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(8)
    const hashedPwd = bcrypt.hashSync(password, salt)
    return hashedPwd
}

const checkPassword = (password, hashedPwd) => {
    return bcrypt.compareSync(password, hashedPwd)
}

module.exports = {
    hashPassword,
    checkPassword
}