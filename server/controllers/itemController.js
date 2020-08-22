const { Item, Product, sequelize } = require('../models')
const { queryInterface } = sequelize

class ItemController {
    static getItems(req, res, next) {
        Item.findAll({
            where: {UserId: req.userId},
            include: Product,
            attributes: ['id', 'ProductId', 'UserId', 'Order']
        })
        .then(items => {
            res.status(200).json({items})
        })
        .catch(next)
    }
    static createItem(req, res, next) {
        const { ProductId, Order } = req.body
        Item.create({
            ProductId,
            UserId: req.userId,
            Order
        })
        .then(newItem => {
            res.status(200).json(newItem)
        })
        .catch(next)
    }
    static updateItem(req, res, next) {
        const { id } = req.params
        const { Order } = req.body
        Item.update({
            Order
        }, {
            where: { id }
        })
        .then(response => {
            if(response[0] === 1) {
                res.status(200).json({message: "item has been updated"})
            } else {
                throw { errorCode: 'errorUpdate', message: 'item not found', status: 404 }
            }
        })
        .catch(next)
    }
    static deleteItem(req, res, next) {
        const id = req.params.id
        Item.destroy( { where: {id} } )
        .then(response => {
            if(response === 1) {
                res.status(200).json({message: "item has been deleted"})
            } else {
                throw { errorCode: 'errorDelete', message: 'item not found', status: 404 }
            }
        })
        .catch(next)
    }
    static bulkDelete(req, res, next) {
        queryInterface.bulkDelete('Items', {
            UserId: req.userId
        })
        .then(response => {
            res.status(200).json({message: 'items has been deleted'})
        })
        .catch(next)
    }
}

module.exports = ItemController