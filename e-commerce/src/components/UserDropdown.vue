<template>
  <div class="dropdown">
    <b-icon
      icon="person"
      class="icon rounded-circle bg-secondary p-1"
      style="width: 2rem; height: 2rem;"
      variant="light"
    ></b-icon>
    <div class="dropdown-content">
      <div class="dropdown-item name">Basil Kaffi Ar Rahman</div>
      <div class="dropdown-item button">logout</div>
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
  .icon {
    align-items: center;
    margin: 0.8rem;
    cursor: pointer;
    transition: 400ms;
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
      color: $third-color;
      cursor: pointer;
      transition: ease-in-out 180ms;
      text-align: left;
    }
    .name {
      cursor: default;
    }
  }
}
.dropdown:hover .icon {
  transform: scale(1.2);
}
.dropdown:hover .name {
  color: $secondary-color;
  background-color: $primary-color;
}
.dropdown:hover .dropdown-content {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
}
.button:hover {
  background-color: $fourth-color;
}
</style>
