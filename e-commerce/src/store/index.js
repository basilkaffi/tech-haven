import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";
import Swal from "sweetalert2";

Vue.use(Vuex);

const loading = () => {
  Swal.fire({
    background: "#2f4f4f",
    html: `<div class="loading"></div>`,
    showConfirmButton: false,
    padding: "0px",
  });
};

const alert = (text) => {
  Swal.fire({
    background: "#2f4f4f",
    width: 550,
    html: `<div style="color:#ffffff; font-size:1.5rem; font-family: 'Roboto Condensed', sans-serif;">
        ${text}</div>`,
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });
}

export default new Vuex.Store({
  state: {
    url: "https://e-cms.herokuapp.com",
    username: null,
    products: [],
    banners: [],
    product: {},
    cartItems: [],
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload;
    },
    setBanners(state, payload) {
      state.banners = payload;
    },
    setProduct(state, payload) {
      state.product = payload;
    },
    setUsername(state, payload) {
      state.username = payload;
    },
    setCartItems(state, payload) {
      state.cartItems = payload;
    },
    updateCartItems(state, payload) {
      const checkId = (obj) => obj.id == payload.id;
      const objIndex = state.cartItems.findIndex(checkId);
      state.cartItems[objIndex].Order = payload.order;
    },
    deleteCartItem(state, payload) {
      const checkId = (obj) => obj.id != payload;
      state.cartItems = state.cartItems.filter(checkId);
    },
  },
  actions: {
    getAllDatas(context, payload) {
      loading()
      axios({
        method: "get",
        url: `${context.state.url}/${payload}/customer`,
      })
        .then((response) => {
          const datas = response.data;
          if (datas.products) {
            context.commit("setProducts", datas.products);
          } else {
            context.commit("setBanners", datas.banners);
          }
          Swal.close();
        })
        .catch((err) => {
          console.log(err.response || err);
          Swal.close();
        });
    },

    setProduct(context, payload) {
      const checkId = (obj) => obj.id == payload;
      const objIndex = context.state.products.findIndex(checkId);
      const product = context.state.products[objIndex];
      context.commit("setProduct", product);
    },

    register(context, payload) {
      axios({
        method: "post",
        url: `${context.state.url}/register`,
        data: payload,
      })
        .then((response) => {
          const data = {
            email: payload.email,
            password: payload.password,
          };
          context.dispatch("login", data);
        })
        .catch((err) => {
          console.log(err.response || err);
        });
    },

    login(context, payload) {
      loading()
      axios({
        method: "post",
        url: `${context.state.url}/login/customer`,
        data: payload,
      })
        .then((response) => {
          localStorage.setItem("access_token", response.data.token);
          localStorage.setItem("username", response.data.username);
          Swal.close();
          router.push("/products");
        })
        .catch((err) => {
          console.log(err.response || err);
          Swal.close();
        });
    },

    setUsername(context, payload) {
      context.commit("setUsername", payload);
    },

    updateStock(context, payload) {
      const stock = payload.stock - 1;
      return new Promise ((res, rej) => {
        axios({
          method: "patch",
          url: `${context.state.url}/products/${payload.id}`,
          data: {
            stock: stock,
          },
          headers: {
            access_token: localStorage.access_token,
          },
        })
          .then((response) => {
            res()
          })
          .catch((err) => {
            console.log(err.response || err);
          });
        })
    },

    createItem(context, payload) {
      axios({
        method: "post",
        url: `${context.state.url}/items`,
        data: {
          ProductId: payload.id,
          Order: payload.order,
        },
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((response) => {
          console.log(response.data);
          const currentItems = context.state.cartItems;
          const newItems = currentItems.concat(response.data);
          context.commit("setCartItems", newItems);
          alert('Your Item Has Been Added To Your Cart')
        })
        .catch((err) => {
          console.log(err.response || err);
        });
    },

    getItems(context, payload) {
      loading()
      axios({
        method: "get",
        url: `${context.state.url}/items`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((response) => {
          console.log(response.data, "get items");
          context.commit("setCartItems", response.data.items);
          Swal.close()
        })
        .catch((err) => {
          console.log(err.response || err);
          Swal.close()
        });
    },

    updateItem(context, payload) {
      return new Promise((res, rej) => {
        axios({
          method: "patch",
          url: `${context.state.url}/items/${payload.id}`,
          data: { Order: payload.order },
          headers: {
            access_token: localStorage.access_token,
          },
        })
          .then((response) => {
            context.commit("updateCartItems", payload);
            res(alert)
          })
          .catch((err) => {
            console.log(err.response || err);
          });
        })
    },

    deleteItem(context, payload) {
      axios({
        method: "delete",
        url: `${context.state.url}/items/${payload.id}`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((response) => {
          context.commit("deleteCartItem", payload.id);
          const checkId = (obj) => obj.id == payload.ProductId;
          const objIndex = context.state.products.findIndex(checkId);
          context.state.products[objIndex].stock =
            context.state.products[objIndex].stock + payload.Order;
          context.commit("setProducts", context.state.products);
          alert('Item Has Been Deleted')
        })
        .catch((err) => {
          console.log(err.response || err);
        });
    },
    bulkDelete(context, payload) {
      axios({
        method: "delete",
        url: `${context.state.url}/items`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((response) => {
          context.commit("setCartItems", []);
          alert('Thank You for Purchasing in Our Store')
        })
        .catch((err) => {
          console.log(err.response || err);
        });
    },
  },
});
