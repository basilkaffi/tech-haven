<template>
  <div class="dropdown">
    <div class="button">Category</div>
    <div class="dropdown-content">
      <div class="dropdown-item" @click.prevent="gotoCategory('accessories')">
        <span>Accessories</span>
      </div>
      <div class="dropdown-item" @click.prevent="gotoCategory('console')">
        <span>Console</span>
      </div>
      <div class="dropdown-item" @click.prevent="gotoCategory('cars')">
        <span>Cars</span>
      </div>
      <div class="dropdown-item" @click.prevent="gotoCategory('cpu')">
        <span>CPU</span></div>
      <div class="dropdown-item" @click.prevent="gotoCategory('gpu')">
        <span>GPU</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryDropdown",
  methods: {
    gotoCategory(category) {
      this.$router.push(`/products/${category}`);
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
// $fourth-color: #f5deb3;

.dropdown {
  position: relative;
  display: inline-block;
  z-index: 2;
  .button {
    color: $third-color;
    font-family: $primary-font;
    margin: 1rem;
    cursor: pointer;
    transition: 400ms;
    font-size: 1.2rem;
  }
  .dropdown-content {
    box-sizing: border-box;
    position: absolute;
    transform: translateY(-0.7rem);
    background-color: $primary-color;
    border-radius: 0.3rem 0.3rem 0 0;
    min-width: 4rem;
    z-index: 1;
    visibility: hidden;
    opacity: 0;
    transition: ease 400ms;
    border-top: solid 0.4rem $secondary-color;
    .dropdown-item {
      font-size: 1.3rem;
      color: $third-color;
      font-family: $secondary-font;
      font-weight: 300;
      cursor: pointer;
      transition: ease-in-out 180ms;
      text-align: left;
    }
  }
}
.dropdown:hover .button {
  color: $secondary-color;
  transform: translateY(-0.2rem);
}
.dropdown:hover .dropdown-content {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
}
.dropdown-item:hover {
  background-color: $fourth-color;
  span {
    color: $secondary-color;
  }
}
</style>
