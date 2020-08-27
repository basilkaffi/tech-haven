<template>
  <div>
    <div class="header" :style="cssProps">
      <div class="title">{{categoryTitle.toUpperCase()}}</div>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar";
export default {
  name: "Header",
  components: {
    Navbar,
  },
  computed: {
    categoryTitle() {
      return this.$route.params.category
    },
    cssProps() {
      return {
        background:
          "linear-gradient(#00000090,#ffffff70),#ffffff url(" +
          require(`../assets/${this.categoryTitle}.jpg`) +
          ") center center/cover no-repeat fixed",
      };
    },
  },
};
</script>

<style lang="scss" scoped>

$primary-font: 'Merriweather', serif;
$secondary-font: "Roboto Condensed", sans-serif;

.header {
  width: 100%;
  height: 20rem;
  .title {
    color: white;
    cursor: default;
    font-family: $secondary-font;
    font-size: 6rem;
    position: relative;
    top: 65%;
    left: 50%;
    transform: translate(-50%,-65%);
  }
}
</style>
