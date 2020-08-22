const request = require('supertest')
const app = require('./server.js')
const { sequelize } = require('./models');
const { queryInterface } = sequelize;

afterAll(done => {
    queryInterface
        .bulkDelete('Users', null, {})
        .then(() => done())
        .catch(err => done(err))
    queryInterface
        .bulkDelete('Products', null, {})
        .then(() => done())
        .catch(err => done(err))
    queryInterface
        .bulkDelete('Banners', null, {})
        .then(() => done())
        .catch(err => done(err))
  })

let token = null
let productId = null
let bannerId = null

describe('test userController', () => {
    describe('Register User', () => {
        describe('register success admin', () => {
            test('should return (status = 201) and object of new admin', done => {
                request(app)
                .post('/register')
                .send({
                    name: 'admin cms',
                    email: 'admin@email.com',
                    password: 'admincms',
                    role: 'admin'
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(201)
                    expect(body).toHaveProperty('name', 'admin cms')
                    expect(body).toHaveProperty('email', 'admin@email.com')
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
        describe('register success customer', () => {
            test('should return (status = 201) and object of new customer', done => {
                request(app)
                .post('/register')
                .send({
                    name: 'customer',
                    email: 'customer@email.com',
                    password: '12345'
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(201)
                    expect(body).toHaveProperty('name', 'customer')
                    expect(body).toHaveProperty('email', 'customer@email.com')
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
        describe('register failed because name or email already exist', () => {
            test('should return (status = 400) and (errorCode = registerFailed)', done => {
                request(app)
                .post('/register')
                .send({
                    name: 'admin cms',
                    email: 'admin@email.com',
                    password: 'admincms'
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('errorCode', 'registerFailed')
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
        describe('register failed because name is empty', () => {
            test('should return (status = 400) and (detail = name cannot be empty)', done => {
                request(app)
                .post('/register')
                .send({
                    name: '',
                    email: 'admin2@email.com',
                    password: 'admincms'
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('detail')
                    expect(body.detail).toEqual(expect.arrayContaining(['name cannot be empty']))
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
        describe('register failed because email format is wrong', () => {
            test('should return (status = 400) and (detail = email format is wrong)', done => {
                request(app)
                .post('/register')
                .send({
                    name: 'admin2 cms',
                    email: 'adminAtEmailDotCom',
                    password: 'admincms'
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('detail')
                    expect(body.detail).toEqual(expect.arrayContaining(['email format is wrong']))
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
        describe('register failed because password not between 5 and 12 characters', () => {
            test('should return (status = 400) and (detail = password must between 5 to 12 characters)', done => {
                request(app)
                .post('/register')
                .send({
                    name: 'admin2 cms',
                    email: 'admin2@email.com',
                    password: '1234'
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('detail')
                    expect(body.detail).toEqual(expect.arrayContaining(['password must between 5 to 12 characters']))
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
    })
    describe('login user', () => {
        describe('login success admin', () => {
            test('should return (status = 200) and token', done => {
                request(app)
                .post('/login/admin')
                .send({
                    email: 'admin@email.com',
                    password: 'admincms'
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('token',expect.any(String))
                    token = body.token
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
        describe('login success customer', () => {
            test('should return (status = 200) and token', done => {
                request(app)
                .post('/login/customer')
                .send({
                    email: 'customer@email.com',
                    password: '12345'
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('token',expect.any(String))
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
        describe('login failed because user is not admin', () => {
            test('should return (status = 400) and (errorCode = loginFailed)', done => {
                request(app)
                .post('/login/admin')
                .send({
                    email: 'customer@email.com',
                    password: '12345'
                })
                .then(response => {
                    const { body, status } = response
                    console.log(body)
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('errorCode', 'loginFailed')
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
        describe('login failed because user is not customer', () => {
            test('should return (status = 400) and (errorCode = loginFailed)', done => {
                request(app)
                .post('/login/customer')
                .send({
                    email: 'admin@email.com',
                    password: 'admincms'
                })
                .then(response => {
                    const { body, status } = response
                    console.log(body)
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('errorCode', 'loginFailed')
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
        describe('login failed because email is wrong', () => {
            test('should return (status = 400) and (errorCode = loginFailed)', done => {
                request(app)
                .post('/login/admin')
                .send({
                    email: 'adn@email.com',
                    password: 'admincms'
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('errorCode', 'loginFailed')
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
        describe('login failed because password is wrong', () => {
            test('should return (status = 400) and (errorCode = loginFailed)', done => {
                request(app)
                .post('/login/admin')
                .send({
                    email: 'admin@email.com',
                    password: '12345'
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('errorCode', 'loginFailed')
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
    })    
})

describe('test productController', () => {
    describe('create product', () => {
        describe('create product success', () => {
            test('should return (status = 201) and product object', done => {
                request(app)
                .post('/products')
                .send({
                    name: 'new product',
                    image_url: 'product_image.jpeg',
                    price: 7000,
                    stock: 15,
                    category: 'uncategorized'
                })
                .set('access_token', token)
                .then(response => {
                    const {body, status} = response
                    expect(status).toBe(201)
                    expect(body).toHaveProperty('name', 'new product')
                    productId = body.id
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
        describe('create product failed because name is empty', () => {
            test('should return (status = 400) and (detail = product name cannot be empty)', done => {
                request(app)
                .post('/products')
                .send({
                    name: '',
                    image_url: 'product_image.jpeg',
                    price: 7000,
                    stock: 15,
                    category: 'uncategorized'
                })
                .set('access_token', token)
                .then(response => {
                    const {body, status} = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('detail')
                    expect(body.detail).toEqual(expect.arrayContaining(['product name cannot be empty']))
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
        describe('create product failed because image_url is empty', () => {
            test('should return (status = 400) and (detail = image cannot be empty)', done => {
                request(app)
                .post('/products')
                .send({
                    name: 'new product',
                    image_url: '',
                    price: 7000,
                    stock: 15,
                    category: 'uncategorized'
                })
                .set('access_token', token)
                .then(response => {
                    const {body, status} = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('detail')
                    expect(body.detail).toEqual(expect.arrayContaining(['image cannot be empty']))
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
        describe('create product failed because price is null', () => {
            test('should return (status = 400) and (detail = price is null)', done => {
                request(app)
                .post('/products')
                .send({
                    name: 'new product',
                    image_url: 'product_image.jpeg',
                    price: null,
                    stock: 15,
                    category: 'uncategorized'
                })
                .set('access_token', token)
                .then(response => {
                    const {body, status} = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('detail')
                    expect(body.detail).toEqual(expect.arrayContaining(['price is null']))
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
        describe('create product failed because stock is empty', () => {
            test('should return (status = 400) and (detail = stock is null)', done => {
                request(app)
                .post('/products')
                .send({
                    name: 'new product',
                    image_url: 'product_image.jpeg',
                    price: 7000,
                    stock: null,
                    category: 'uncategorized'
                })
                .set('access_token', token)
                .then(response => {
                    const {body, status} = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('detail')
                    expect(body.detail).toEqual(expect.arrayContaining(['stock is null']))
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
        describe('create product failed because price is minus', () => {
            test('should return (status = 400) and (detail = price cannot be minus)', done => {
                request(app)
                .post('/products')
                .send({
                    name: 'new product',
                    image_url: 'product_image.jpeg',
                    price: -2000,
                    stock: 15,
                    category: 'uncategorized'
                })
                .set('access_token', token)
                .then(response => {
                    const {body, status} = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('detail')
                    expect(body.detail).toEqual(expect.arrayContaining(['price cannot be minus']))
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
        describe('create product failed because stock is empty', () => {
            test('should return (status = 400) and (detail = stock cannot be minus)', done => {
                request(app)
                .post('/products')
                .send({
                    name: 'new product',
                    image_url: 'product_image.jpeg',
                    price: 7000,
                    stock: -10,
                    category: 'uncategorized'
                })
                .set('access_token', token)
                .then(response => {
                    const {body, status} = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('detail')
                    expect(body.detail).toEqual(expect.arrayContaining(['stock cannot be minus']))
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
        describe('create product failed because category is empty', () => {
            test('should return (status = 400) and (detail = category cannot be empty)', done => {
                request(app)
                .post('/products')
                .send({
                    name: 'new product',
                    image_url: 'product_image.jpeg',
                    price: 2000,
                    stock: 15,
                    category: ''
                })
                .set('access_token', token)
                .then(response => {
                    const {body, status} = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('detail')
                    expect(body.detail).toEqual(expect.arrayContaining(['category cannot be empty']))
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
    })
    describe('get products data', () => {
        test('should return (status = 200) and array of product', done => {
            request(app)
            .get('/products')
            .set('access_token', token)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('products')
                expect(body.products).toEqual(expect.any(Array))
                done()
            })
            .catch(err => {
                done(err)
            })
        })
    })
    describe('update product', () => {
        describe('update product success', () => {
            test('should return (status = 200) and (message = product has been updated)', done => {
                request(app)
                .put(`/products/${productId}`)
                .send({
                    name: 'edited name',
                    image_url: 'product_image2.jpeg',
                    price: 6500,
                    stock: 12
                })
                .set('access_token', token)
                .then(response => {
                    const {body, status} = response
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('message', 'product has been updated')
                    done()
                })
                .catch(err => (
                    done(err)
                ))
            })
        })
        describe('update product failed because product target does not exist', () => {
            test('should return (status = 404) and (errorCode = errorUpdate)', done => {
                request(app)
                .put(`/products/${productId+1}`)
                .send({
                    name: 'edited name',
                    image_url: 'product_image2.jpeg',
                    price: 6500,
                    stock: 12
                })
                .set('access_token', token)
                .then(response => {
                    const {body, status} = response
                    expect(status).toBe(404)
                    expect(body).toHaveProperty('errorCode', 'errorUpdate')
                    done()
                })
                .catch(err => (
                    done(err)
                ))
            })
        })
    })
    describe('delete product', () => {
        describe('delete product success', () => {
            test('should return (status = 200) and (message = product has been deleted)', done => {
                request(app)
                .delete(`/products/${productId}`)
                .set('access_token', token)
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('message', 'product has been deleted')
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
        describe('delete product failed because product target does not exist', () => {
            test('should return (status = 404) and (errorCode = errorDelete)', done => {
                request(app)
                .delete(`/products/${productId+1}`)
                .set('access_token', token)
                .then(response => {
                    const {body, status} = response
                    expect(status).toBe(404)
                    expect(body).toHaveProperty('errorCode', 'errorDelete')
                    done()
                })
                .catch(err => (
                    done(err)
                ))
            })
        })
    })
})

describe('test bannerController', () => {
    describe('create banner', () => {
        describe('create banner success', () => {
            test('should return (status = 201) and object of banner', done => {
                request(app)
                .post('/banners')
                .send({
                    name: 'banner 1',
                    img_url: 'banner picture'
                })
                .set('access_token', token)
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(201)
                    expect(body).toHaveProperty('name', 'banner 1')
                    bannerId = body.id
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
        describe('create banner failed because name is empty', () => {
            test('should return (status = 400) and (detail = banner name cannot be empty)', done => {
                request(app)
                .post('/banners')
                .send({
                    name: '',
                    img_url: 'product_image.jpeg'
                })
                .set('access_token', token)
                .then(response => {
                    const {body, status} = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('detail')
                    expect(body.detail).toEqual(expect.arrayContaining(['banner name cannot be empty']))
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
        describe('create banner failed because image url is empty', () => {
            test('should return (status = 400) and (detail = image url cannot be empty)', done => {
                request(app)
                .post('/banners')
                .send({
                    name: 'banner 2',
                    img_url: ''
                })
                .set('access_token', token)
                .then(response => {
                    const {body, status} = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('detail')
                    expect(body.detail).toEqual(expect.arrayContaining(['image url cannot be empty']))
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
    })
    describe('get banners data', () => {
        test('should return (status = 200) and array of banners', done => {
            request(app)
            .get('/banners')
            .set('access_token', token)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('banners')
                expect(body.banners).toEqual(expect.any(Array))
                done()
            })
            .catch(err => {
                done(err)
            })
        })
    })
    describe('update banner', () => {
        describe('update banner success', () => {
            test('should return (status = 200) and (message = banner has been updated)', done => {
                request(app)
                .put(`/banners/${bannerId}`)
                .send({
                    name: 'edited name',
                    image_url: 'image url edited'
                })
                .set('access_token', token)
                .then(response => {
                    const {body, status} = response
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('message', 'banner has been updated')
                    done()
                })
                .catch(err => (
                    done(err)
                ))
            })
        })
        describe('update banner failed because banner target does not exist', () => {
            test('should return (status = 404) and (errorCode = errorUpdate)', done => {
                request(app)
                .put(`/banners/${bannerId+1}`)
                .send({
                    name: 'edited name',
                    image_url: 'banner_image2.jpeg'
                })
                .set('access_token', token)
                .then(response => {
                    const {body, status} = response
                    expect(status).toBe(404)
                    expect(body).toHaveProperty('errorCode', 'errorUpdate')
                    done()
                })
                .catch(err => (
                    done(err)
                ))
            })
        })
    })
    describe('delete banner', () => {
        describe('delete banner success', () => {
            test('should return (status = 200) and (message = banner has been deleted)', done => {
                request(app)
                .delete(`/banners/${bannerId}`)
                .set('access_token', token)
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('message', 'banner has been deleted')
                    done()
                })
                .catch(err => {
                    done(err)
                })
            })
        })
        describe('delete banner failed because banner target does not exist', () => {
            test('should return (status = 404) and (errorCode = errorDelete)', done => {
                request(app)
                .delete(`/banners/${bannerId+1}`)
                .set('access_token', token)
                .then(response => {
                    const {body, status} = response
                    expect(status).toBe(404)
                    expect(body).toHaveProperty('errorCode', 'errorDelete')
                    done()
                })
                .catch(err => (
                    done(err)
                ))
            })
        })
    })
})

describe('authentication failed', () => {
    describe('authentication failed because of invalid token', () => {
        test('should return (status = 401) and (errorCode = authenticationFailed)', done => {
            request(app)
            .post('/products')
            .send({
                name: 'new product',
                image_url: 'product_image.jpeg',
                price: 7000,
                stock: 15,
                category: 'uncategorized'
            })
            .set('access_token', 'invalid token')
            .then(response => {
                const {body, status} = response
                expect(status).toBe(401)
                expect(body).toHaveProperty('errorCode', 'authenticationFailed')
                productId = body.id
                done()
            })
            .catch(err => {
                done(err)
            })
        })
    })
    describe('authentication failed because token not found', () => {
        test('should return (status = 401) and (errorCode = authenticationFailed)', done => {
            request(app)
            .post('/products')
            .send({
                name: 'new product',
                image_url: 'product_image.jpeg',
                price: 7000,
                stock: 15,
                category: 'uncategorized'
            })
            .set('access_token', null)
            .then(response => {
                const {body, status} = response
                expect(status).toBe(401)
                expect(body).toHaveProperty('errorCode', 'authenticationFailed')
                productId = body.id
                done()
            })
            .catch(err => {
                done(err)
            })
        })
    })
})