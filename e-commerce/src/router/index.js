import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Enter from "../views/Enter";
import CartPage from "../views/CartPage";
import Category from "../views/Category.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/products",
  },
  {
    path: "/products",
    name: "Home",
    component: Home,
  },
  {
    path: "/carts",
    name: "CartPage",
    component: CartPage,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/products/:category",
    name: "Category",
    component: Category,
  },
  {
    path: "/:enter",
    name: "Enter",
    component: Enter
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

export default router;
