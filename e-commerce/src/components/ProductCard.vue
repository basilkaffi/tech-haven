<template>
  <div class="card-section">
    <div
      class="image"
      :style="[
        {
          background: `url(${product.image_url})`,
          'background-position': 'center center',
          'background-size': 'cover',
        },
      ]"
    ></div>
    <div class="card-body">
      <div class="name">{{ product.name }}</div>
      <div class="price">Rp. {{ formatPrice(product.price) }}</div>
    </div>
    <div class="add-cart">
      <div class="text" @click.prevent="addToCart">Add To Cart</div>
      <img
        class="icon"
        src="https://image.flaticon.com/icons/svg/833/833400.svg"
        alt="cartImg"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: ["product"],
  computed: {
    items() {
      return this.$store.state.cartItems;
    },
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed().replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    addToCart() {
      if (!localStorage.access_token) {
        this.$router.push("/login");
      } else {
        if (this.items.length === 0) {
          this.$store.dispatch("createItem", {
            id: this.product.id,
            order: 1,
          });
        } else {
          const itemIndex = this.items.findIndex((item) => {
            return item.ProductId === this.product.id;
          });
          if (itemIndex != -1) {
            this.$store.dispatch("updateItem", {
              id: this.items[itemIndex].id,
              order: this.items[itemIndex].Order + 1,
            });
          } else {
            this.$store.dispatch("createItem", {
              id: this.product.id,
              order: 1,
            });
          }
        }
      }
    },
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
// $fourth-color: #0e586e;

.card-section {
  width: 90%;
  height: 22rem;
  margin: auto;
  margin-bottom: 2rem;
  box-shadow: 0 0.2rem 0.3rem 0 rgba(47, 79, 79, 0.15);
  transition: ease 200ms;
  cursor: default;
  background-color: $third-color;
  .image {
    height: 65%;
    width: 100%;
  }
  .card-body {
    text-align: left;
    transform: translateX(-0.5rem);
    transition: 300ms;
    padding: 1rem;
    color: $primary-color;
    letter-spacing: 70%;
    .name {
      font-family: $secondary-font;
      font-weight: 700;
    }
    .price {
      font-family: $primary-font;
      font-size: 1.2rem;
    }
  }
  .add-cart {
    transition: 400ms;
    float: right;
    margin-right: 0.8rem;
    display: flex;
    align-items: center;
    visibility: hidden;
    opacity: 0;
    cursor: pointer;
    .text {
      font-family: $secondary-font;
      color: $primary-color;
      margin-right: 0.3rem;
      font-weight: 700;
      transition: 240ms;
    }
    .icon {
      transition: 500ms;
      justify-self: flex-end;
      opacity: 0.8;
      width: 1.7rem;
      filter: invert(30%);
    }
  }
}
.card-section:hover {
  box-shadow: 0 0.3rem 0.5rem 0 rgba(47, 79, 79, 0.2);
  .card-body {
    transform: translateX(0rem);
  }
  .add-cart {
    transform: translateX(-0.5rem);
    visibility: visible;
    opacity: 1;
  }
}
.add-cart:hover {
  .text {
    color: $fourth-color;
  }
  .icon {
    transform: scale(1.1);
    opacity: 1;
    filter: invert(10%);
  }
}
</style>
