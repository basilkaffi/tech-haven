<template>
  <div class="product-section">
    <div :class="{ title: listTitle }">
      <span style="margin-left: 1rem">{{ listTitle }}</span>
    </div>
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
  props: ["products", "listTitle"],
  components: {
    ProductCard,
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #2f4f4f;
$secondary-color: #f5deb3;
$third-color: #ffffff;
$fourth-color: #808080;

$primary-font: "Merriweather", serif;
$secondary-font: "Roboto Condensed", sans-serif;

// $primary-color: #ffffff;
// $secondary-color: #5bc0de;
// $third-color: #146e8a;
// $fourth-color: #f5deb3;

.product-section {
  width: 60rem;
  margin: 7rem auto 0 auto;
  color: $primary-color;
  .title {
    font-family: $primary-font;
    font-size: 3rem;
    text-align: left;
    margin: 1rem;
    margin-bottom: 3rem;
    border-bottom: rgba(24, 29, 29, 0.541) 0.2rem solid;
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
