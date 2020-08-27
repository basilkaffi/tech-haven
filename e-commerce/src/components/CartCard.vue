<template>
  <div style="width: 30rem; margin: 2rem;">
    <div class="close-button" @click.prevent="deleteItem">
      <img
        src="https://image.flaticon.com/icons/svg/1828/1828778.svg"
        width="66%"
      />
    </div>
    <div class="cart">
      <div
        class="image"
        :style="[
          {
            background: `linear-gradient(#000000d0,#2f4f4f70),url(${item.Product.image_url})`,
            'background-position': 'center center',
            'background-size': 'cover',
            'background-color': 'white',
          },
        ]"
      >
        <span>{{ productStock }}</span>
      </div>
      <div class="cart-content">
        <div class="cart-description">
          <div class="name">{{ item.Product.name }}</div>
          <div class="price">Rp {{ formatPrice(item.Product.price) }}</div>
        </div>
        <div class="button-container">
          <div class="button">
            <img
              src="https://image.flaticon.com/icons/svg/748/748114.svg"
              alt="minus-icon"
              width="100%"
              @click.prevent="decrease"
            />
          </div>
          <div class="order">{{ item.Order }}</div>
          <div class="button">
            <img
              src="https://image.flaticon.com/icons/svg/748/748113.svg"
              alt="plus-icon"
              width="100%"
              @click.prevent="increase"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartCard",
  props: ["item"],
  computed: {
    products() {
      return this.$store.state.products;
    },
    productStock() {
      const itemIndex = this.products.findIndex((product) => {
        return product.id == this.item.ProductId;
      });
      let product = this.products[itemIndex];
      return product.stock;
    },
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed().replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    deleteItem() {
      const itemIndex = this.products.findIndex((product) => {
        return product.id == this.item.ProductId;
      });
      let product = this.products[itemIndex];
      product.stock = product.stock + this.item.Order;
      this.$store.dispatch("updateStock", product);
      product.stock = product.stock - this.item.Order;
      this.$store.dispatch("deleteItem", this.item);
    },
    decrease() {
      if (this.item.Order > 1) {
        this.item.Order--;
        const itemIndex = this.products.findIndex((product) => {
          return product.id == this.item.ProductId;
        });
        let product = this.products[itemIndex];
        product.stock++;
        this.$store.dispatch("updateItem", {
          id: this.item.id,
          order: this.item.Order,
        });
        this.$store.dispatch("updateStock", product);
      }
    },
    increase() {
      const itemIndex = this.products.findIndex((product) => {
        return product.id == this.item.ProductId;
      });
      let product = this.products[itemIndex];
      if (product.stock > 0) {
        this.item.Order++;
        product.stock--;
        this.$store.dispatch("updateItem", {
          id: this.item.id,
          order: this.item.Order,
        });
        this.$store.dispatch("updateStock", product);
      }
    },
  },
};
</script>

<style lang="scss">

$primary-font: 'Merriweather', serif;
$secondary-font: "Roboto Condensed", sans-serif;

.cart {
  width: 28rem;
  height: 10rem;
  display: flex;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  align-items: center;
  transition: 200ms;
  .image {
    margin: auto 0.6rem;
    height: 90%;
    width: 50%;
    span {
      color: white;
      font-family: $secondary-font;
      font-size: 6rem;
      line-height: 1.5;
    }
  }
  .cart-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 60%;
    margin: 1rem 2rem;
    align-items: center;
    .cart-description {
      .name {
        font-family: $secondary-font;
        font-weight: 700;
      }
      .price {
        font-size: 1.42rem;
        font-family: $primary-font;
      }
    }
    .button-container {
      display: flex;
      width: 45%;
      align-items: center;
      justify-content: space-between;
      justify-self: flex-end;
      .button {
        width: 1.3rem;
        cursor: pointer;
        transition: 400ms;
      }
      .button:hover {
        transform: scale(1.2);
      }
      .order {
        cursor: default;
        font-size: 3rem;
      }
    }
  }
}
.cart:hover {
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.336);
}
.close-button {
  width: 1.5rem;
  float: right;
  cursor: pointer;
  transform: translate(-1.5rem,-0.5rem);
  background-color: gray;
  border-radius: 100%;
  transition: 400ms;
  img {
    filter: invert(100%);
  }
}
.close-button:hover {
  background-color: darkslategray;
}
</style>
