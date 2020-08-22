const { Product } = require('../models')

class ProductController {
    static getProducts(req, res, next) {
        Product.findAll({ order: [['id', 'ASC']] })
        .then(products=>{
            res.status(200).json({products})
        })
        .catch(next)
    }
    static productCreate(req, res, next) {
        const { name, image_url, price, stock, category} = req.body
        Product.create({
            name,
            image_url,
            price,
            stock,
            category
        }).then(product => {
            res.status(201).json(product)
        }).catch(next)
    }
    static updateProduct(req, res, next) {
        const id = req.params.id
        const { name, price, stock, category } = req.body
        Product.update({
            name,
            price,
            stock,
            category
        }, { where: {id} })
        .then(response => {
            if(response[0] === 1) {
                res.status(200).json({message: "product has been updated"})
            } else {
                throw { errorCode: 'errorUpdate', message: 'product not found', status: 404 }
            }
        })
        .catch(next)
    }
    static deleteProduct(req, res, next) {
        const id = req.params.id
        Product.destroy( { where: {id} } )
        .then(response => {
            if(response === 1) {
                res.status(200).json({message: "product has been deleted"})
            } else {
                throw { errorCode: 'errorDelete', message: 'product not found', status: 404 }
            }
        })
        .catch(next)
    }
}

module.exports = ProductController