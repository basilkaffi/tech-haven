<template>
  <div class="home">
    <Banner />
    <transition name="navbar">
      <Navbar v-show="showNavbar" ref="navRef" />
    </transition>
    <CategoryContainer />
    <ProductContainer v-show="showNavbar" :products="products" :listTitle="'New Products'" />
    <Footer v-show="showNavbar" />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Banner from "@/components/Banner.vue";
import Footer from "@/components/Footer.vue";
import ProductContainer from "@/components/ProductContainer.vue";
import CategoryContainer from "@/components/CategoryContainer.vue";

export default {
  name: "Home",
  components: {
    Navbar,
    Banner,
    Footer,
    CategoryContainer,
    ProductContainer
  },
  data() {
    return {
      showNavbar: false,
    };
  },
  methods: {
    handleScroll(event) {
      window.pageYOffset > (window.innerHeight * 2) / 3
        ? (this.showNavbar = true)
        : (this.showNavbar = false);
    },
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    this.$store.dispatch("getItems")
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    products() {
      const allProducts = this.$store.state.products;
      return allProducts.filter((product, idx) => {
        return idx >= allProducts.length-12 ? product : null
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  min-height: 200vh;
}
.navbar-enter-active {
  transition: all 250ms;
}
.navbar-leave-active {
  transition: all 100ms;
}
.navbar-enter {
  opacity: 0;
}
.navbar-enter {
  transform: translateY(-4rem);
}
.navbar-leave-to {
  transform: translateY(-4rem);
}
</style>
