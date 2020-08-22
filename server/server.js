const express = require ('express')
const app = express()
const cors = require('cors')
const productController = require('./controllers/productController')
const userController = require('./controllers/userController')
const itemController = require('./controllers/itemController')
const bannerController = require('./controllers/bannerController')
const authentication = require('./middleware/authentication')
const authorization = require('./middleware/authorization')
const clientAuthorization = require('./middleware/clientAuthorization')
const errorHandler = require('./middleware/errorHandler')
require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/register', userController.register)
app.post('/login/admin', userController.loginAdmin)
app.post('/login/customer', userController.loginCustomer)

app.post('/products', authentication, productController.productCreate)
app.get('/products', authentication, productController.getProducts)
app.get('/products/customer', productController.getProducts)
app.patch('/products/:id', authentication, productController.updateProduct)
app.put('/products/:id', authentication, authorization, productController.updateProduct)
app.delete('/products/:id', authentication, authorization, productController.deleteProduct)

app.post('/items', authentication, itemController.createItem)
app.get('/items', authentication, itemController.getItems)
app.patch('/items/:id', authentication, clientAuthorization, itemController.updateItem)
app.delete('/items/:id', authentication, clientAuthorization, itemController.deleteItem)
app.delete('/items', authentication, itemController.bulkDelete)

app.post('/banners', authentication, bannerController.bannerCreate)
app.get('/banners', authentication, bannerController.getBanners)
app.get('/banners/customer', bannerController.getBanners)
app.put('/banners/:id', authentication, authorization, bannerController.updatebanner)
app.delete('/banners/:id', authentication, authorization, bannerController.deletebanner)

app.use(errorHandler)

module.exports = app