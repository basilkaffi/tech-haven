const { User } = require('../models')
const { generateToken } = require('../helper/jwt')
const { checkPassword } = require('../helper/bcrypt')
const { Op } = require('sequelize')

class UserController {
    static register(req, res, next){
        const { name, email, password, role } = req.body
        User.findOne({
            where: { 
                [Op.or]: [ 
                    { email },
                    { name }
                ]
            }
        })
        .then(user => {
            if(!user) {
                return User.create({
                    name,
                    email,
                    password,
                    role: role || 'customer'
                })
            } else {
                throw {errorCode: 'registerFailed', message: 'email or username already exist', status:400}
            }
        })
        .then(user => {
            res.status(201).json(user)
        })
        .catch(next)
    }
    static loginAdmin(req, res, next) {
        const { email, password } = req.body
        User.findOne({
            where: { email }
        }).then(user=>{
            if(user.role === 'admin') {
                const isValid = checkPassword(password, user.password)
                if(isValid){
                    const token = generateToken(user)
                    res.status(200).json({token, username: user.name})
                } else {
                    throw { message: 'wrong password' }
                }
            } else {
                throw { message: 'user not an admin' }
            }
        }).catch(err => {
            err = {errorCode: 'loginFailed', message: err.message || 'wrong email', status: 400}
            next(err)
        })
    }
    static loginCustomer(req, res, next) {
        const { email, password } = req.body
        User.findOne({
            where: { email }
        }).then(user=>{
            if(user.role === 'customer') {
                const isValid = checkPassword(password, user.password)
                if(isValid){
                    const token = generateToken(user)
                    res.status(200).json({token, username: user.name})
                } else {
                    throw { message: 'wrong password' }
                }
            } else {
                throw { message: 'user not a customer' }
            }
        }).catch(err => {
            err = {errorCode: 'loginFailed', message: err.message || 'wrong email', status: 400}
            next(err)
        })
    }
}
module.exports = UserController