<template>
  <div class="card-container" :style="cssProps">
    <div class="title">
      {{ category.toUpperCase() }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Category",
  props: ["category"],
  computed: {
    cssProps() {
      return {
        backgroundImage:
          "url(" + require(`../assets/${this.category}.jpg`) + ")",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.card-container {
  width: 95%;
  height: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  margin: auto;
  transition: ease 400ms;
  .title {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 3rem;
    font-weight: 500;
    width: fit-content;
    visibility: hidden;
    opacity: 0;
    transition: ease 400ms;
    cursor: pointer;
  }
}
.card-container:hover {
  .title {
    visibility: visible;
    opacity: 1;
  }
}
.title:hover {
  color: wheat;
  letter-spacing: 0.5rem;
}
</style>
