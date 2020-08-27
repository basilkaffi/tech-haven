<template>
  <div class="card-container" :style="cssProps">
    <div class="title" @click.prevent="gotoCategory">
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
  methods: {
    gotoCategory() {
      this.$router.push({
        name: "Category",
        params: { category: this.category },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-font: "Merriweather", serif;
$secondary-font: "Roboto Condensed", sans-serif;

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
    font-family: $secondary-font;
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
