<template>
  <div>
    <Navbar />
    <div class="header">
      <div class="title">Shopping Cart</div>
    </div>
    <div class="content">
      <div class="cart-container">
        <CartCard v-for="item in items" :key="item.id" :item="item" />
      </div>
      <div class="description">
        <h5>Shopping Summary</h5>
        <div class="purchase">
          <div class="item-detail">
            <p v-for="item in items" :key="item.key">{{ item.Product.name }}</p>
          </div>
          <div class="item-detail">
            <p v-for="item in items" :key="item.key">{{ item.Order }} x</p>
          </div>
          <div class="item-detail">
            <p v-for="item in items" :key="item.key">
              Rp {{ formatPrice(item.Product.price) }}
            </p>
          </div>
        </div>
        <div class="total">
          <div class="label">Total Price:</div>
          <div class="amount">Rp. {{ formatPrice(totalPrice) }}</div>
        </div>
        <button class="btn btn-secondary" @click.prevent="buy">Checkout</button>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import CartCard from "@/components/CartCard.vue";
export default {
  name: "CartPage",
  components: {
    Navbar,
    CartCard,
    Footer,
  },
  created() {
    this.$store.dispatch("getItems");
    this.$store.dispatch("getAllDatas", "products");
  },
  computed: {
    items() {
      return this.$store.state.cartItems;
    },
    totalPrice() {
      let price = 0;
      this.items.forEach((item) => {
        price += item.Product.price * item.Order;
      });
      return price;
    },
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed().replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    buy() {
      this.$store.dispatch("bulkDelete");
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-font: "Merriweather", serif;
$secondary-font: "Roboto Condensed", sans-serif;

.header {
  width: 100%;
  height: 20rem;
  background-image: url("../assets/cart.jpg");
  background-repeat: no-repeat;
  background-position: right top;
  background-size: 20rem 20rem;
  .title {
    color: darkslategray;
    cursor: default;
    font-family: $primary-font;
    font-size: 6rem;
    position: relative;
    top: 50%;
    left: 30%;
    transform: translate(-50%, -50%);
  }
}
.content {
  display: grid;
  grid-template-columns: 3fr 2fr;
  min-height: 40rem;
  margin: 6rem;
  .cart-container {
    max-height: 50rem;
    overflow-y: scroll;
  }
  .cart-container::-webkit-scrollbar {
    margin: 0;
    display: none;
  }

  .description {
    margin: 2rem;
    height: fit-content;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    color: darkslategray;
    h5 {
      text-align: center;
      font-family: $primary-font;
      padding: 1rem;
      font-size: 1.7rem;
      width: 80%;
      margin: 0 auto 1rem auto;
    }
    .purchase {
      width: 80%;
      display: flex;
      font-family: $secondary-font;
      font-size: 1.1rem;
      justify-content: space-between;
      margin: auto;
      .item-detail {
        text-align: left;
        display: flex;
        flex-direction: column;
      }
    }
    .total {
      width: 80%;
      font-family: $secondary-font;
      border-top: 0.2rem gray solid;
      font-size: 1.1rem;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      margin: 1rem auto;
    }
    .btn {
      width: 40%;
      float: right;
      margin: 2rem;
      margin-bottom: 1rem;
      border-radius: 0;
    }
  }
}
</style>
