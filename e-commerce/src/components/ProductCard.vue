<template>
  <div class="card-section">
    <div class="image">
      <img :src="product.image_url" width="100%" />
    </div>
    <div class="card-body">
      <div class="name">{{ product.name }}</div>
      <div class="price">Rp. {{ formatPrice(product.price) }}</div>
    </div>
    <div class="add-cart">
      <b-icon
        icon="cart3"
        class="icon"
        variant="secondary"
        style="width: 1.2rem; height: 1.2rem;"
      ></b-icon>
      Add to Cart
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: ["product"],
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>

<style lang="scss" scoped>
.card-section {
  height: 22rem;
  width: 90%;
  margin: auto;
  margin-bottom: 2rem;
  box-shadow: 0 0.2rem 0.3rem 0 rgba(47, 79, 79, 0.15);
  transition: ease 200ms;
  cursor: default;
  .image {
    display: flex;
    flex-direction: column;
    height: 65%;
    img {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .card-body {
    text-align: left;
    transform: translateX(-0.8rem);
    transition: 300ms;
    .name {
      font-weight: 700;
      font-size: 1.1rem;
    }
  }
  .add-cart {
    font-weight: 600;
    transition: 300ms;
    transform: translate(3rem, -0.3rem);
    visibility: hidden;
    opacity: 0;
    cursor: pointer;
    display: inline-block;
    .icon {
      transition: 500ms;
    }
  }
}
.card-section:hover {
  box-shadow: 0 0.3rem 0.5rem 0 rgba(47, 79, 79, 0.2);
  .card-body {
    transform: translateX(0rem);
  }
  .add-cart {
    transform: translate(1.8rem, -0.3rem);
    visibility: visible;
    opacity: 1;
  }
}
.add-cart:hover {
  color: gray;
  .icon {
    transform: scale(1.1);
  }
}
</style>
