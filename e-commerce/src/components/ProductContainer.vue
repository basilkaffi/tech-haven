<template>
  <div class="product-section">
    <div class="title"><span style="margin-left: 1rem">All Product</span></div>
    <div class="product-container">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from "./ProductCard";
export default {
  name: "ProductContainer",
  components: {
    ProductCard,
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
};
</script>

<style lang="scss" scoped>
.product-section {
  width: 60rem;
  margin: 7rem auto;
  .title {
    font-size: 2.2rem;
    text-align: left;
    margin: 1rem;
    margin-bottom: 3rem;
    border-bottom: rgba(47, 79, 79, 0.178) 0.2rem solid;
  }
  .product-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
  .product-container::-webkit-scrollbar {
    display: none;
  }
}
</style>
