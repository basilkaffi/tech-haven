import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    url: 'https://e-cms.herokuapp.com',
    username: null,
    products: [],
    banners: [],
    product: {},
    cartItems: []
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload
    },
    setBanners(state, payload) {
      state.banners = payload
    },
    setProduct(state, payload) {
      state.product = payload
    },
    setUsername(state, payload) {
      state.username = payload
    },
    setCartItems(state, payload) {
      state.cartItems = payload
    },
    updateCartItems(state, payload) {
      const checkId = (obj) => obj.id == payload.id
      const objIndex = state.cartItems.findIndex(checkId)
      state.cartItems[objIndex].Order = payload.order
    },
    deleteCartItem(state, payload) {
      const checkId = (obj) => obj.id != payload
      state.cartItems = state.cartItems.filter(checkId);
    }
  },
  actions: {
    getAllDatas(context, payload) {
      axios({
        method: 'get',
        url: `${context.state.url}/${payload}/customer`,
      })
        .then((response) => {
          const datas = response.data;
          if (datas.products) {
            context.commit('setProducts', datas.products);
          } else {
            context.commit('setBanners', datas.banners);
          }
        })
        .catch((err) => {
          console.log(err.response || err);
        });
    },

    setProduct(context, payload) {
      const checkId = (obj) => obj.id == payload
      const objIndex = context.state.products.findIndex(checkId)
      const product = context.state.products[objIndex]
      context.commit('setProduct', product)
    },


    register(context, payload){
      axios({
        method: 'post',
        url: `${context.state.url}/register`,
        data: payload
      })
      .then(response => {
        const data = {
          email: payload.email,
          password: payload.password
        }
        context.dispatch('login', data)
      })
      .catch(err => {
        console.log(err.response || err)
      })
    },

    login(context, payload) {
      axios({
        method: 'post',
        url: `${context.state.url}/login/customer`,
        data: payload
      })
      .then(response => {
        localStorage.setItem('access_token', response.data.token)
        localStorage.setItem('username', response.data.username)
        router.push('/products')
      })
      .catch(err => {
        console.log(err.response || err)
      })
    },

    setUsername(context, payload) {
      context.commit('setUsername', payload)
    },
    
    updateStock(context, payload) {
      axios({
        method: 'patch',
        url: `${context.state.url}/products/${payload.id}`,
        data: {
          stock: payload.stock
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(response => {
      })
      .catch(err => {
        console.log(err.response || err)
      })
    },


    createItem(context, payload) {
      axios({
        method:'post',
        url:`${context.state.url}/items`,
        data: {
          ProductId: payload.id,
          Order: payload.order
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(response => {
        console.log(response.data)
      })
      .catch(err => {
        console.log(err.response || err)
      })
    },

    getItems(context, payload) {
      axios({
        method:'get',
        url:`${context.state.url}/items`,
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(response => {
        console.log(response.data)
        context.commit('setCartItems', response.data.items)
      })
      .catch(err => {
        console.log(err.response || err)
      })
    },

    updateItem(context, payload) {
      axios({
        method: 'patch',
        url:`${context.state.url}/items/${payload.id}`,
        data: {Order: payload.order},
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(response => {
        context.commit('updateCartItems', payload)
      })
      .catch(err => {
        console.log(err.response || err)
      })
    },

    deleteItem(context, payload) {
      axios({
        method: 'delete',
        url:`${context.state.url}/items/${payload.id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(response => {
        context.commit('deleteCartItem', payload.id)
        const checkId = (obj) => obj.id == payload.ProductId
        const objIndex = context.state.products.findIndex(checkId)
        context.state.products[objIndex].stock = context.state.products[objIndex].stock + payload.Order
        context.commit('setProducts', context.state.products)
      })
      .catch(err => {
        console.log(err.response || err)
      })
    },
    bulkDelete(context, payload) {
      axios({
        method:'delete',
        url:`${context.state.url}/items`,
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(response => {
        context.commit('setCartItems', [])
      })
      .catch(err => {
        console.log(err.response || err)
      })
    }
  }
})
