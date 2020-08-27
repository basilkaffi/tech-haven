<template>
  <div>
    <div
      class="category"
      v-if="
        params === 'cpu' ||
          params === 'gpu' ||
          params === 'accessories' ||
          params === 'console' ||
          params === 'cars'
      "
    >
      <Navbar />
      <Header />
      <ProductContainer :products="products" />
      <Footer />
    </div>
    <div v-else>
      <h1>Category Not Found</h1>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductContainer from "../components/ProductContainer";
import CategoryContainer from "../components/CategoryContainer.vue";
export default {
  name: "Category",
  components: {
    Navbar,
    Header,
    Footer,
    ProductContainer,
    CategoryContainer,
  },
  created() {
    this.$store.dispatch("getItems")
  },
  computed: {
    params() {
      return this.$route.params.category;
    },
    products() {
      const allProducts = this.$store.state.products;
      return allProducts.filter((product) => {
        return product.category == this.params ? product : null;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.category {
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
