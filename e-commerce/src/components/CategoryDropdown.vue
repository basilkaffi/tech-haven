<template>
  <div class="dropdown">
    <div class="button">Category</div>
    <div class="dropdown-content">
      <div class="dropdown-item">Accessories</div>
      <div class="dropdown-item">Console</div>
      <div class="dropdown-item">Cars</div>
      <div class="dropdown-item">CPU</div>
      <div class="dropdown-item">GPU</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryDropdown",
};
</script>

<style lang="scss" scoped>
$primary-color: #2f4f4f;
$secondary-color: #f5deb3;
$third-color: #ffffff;
$fourth-color: #808080;

.dropdown {
  position: relative;
  display: inline-block;
  z-index: 2;
  .button {
    color: $third-color;
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
  border-top: solid 0.4rem $fourth-color;
  .dropdown-item {
    font-size: 1rem;
    color: $third-color;
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
}
</style>
