<template>
  <div class="category-section">
    <transition name="fade">
      <div class="title" v-if="showTitle">Category</div>
    </transition>
    <transition name="category">
      <div class="category-container" v-if="showCategory">
        <CategoryCard
          v-for="(category, i) in categories"
          :key="i"
          :category="category"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import CategoryCard from "./CategoryCard";
export default {
  name: "CategoryContainer",
  components: {
    CategoryCard,
  },
  data() {
    return {
      categories: ["cars", "cpu", "gpu"],
      showCategory: false,
      showTitle: false
    };
  },
  methods: {
    handleScroll(event) {
      window.pageYOffset > (window.innerHeight * 2) / 5
        ? (this.showTitle = true)
        : (this.showTitle = false);
      window.pageYOffset > (window.innerHeight * 1) / 2
        ? (this.showCategory = true)
        : (this.showCategory = false);
    },
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss" scoped>

$primary-color: #2f4f4f;
$secondary-color: #f5deb3;
$third-color: #ffffff;
$fourth-color: #808080;

// $primary-color: #ffffff;
// $secondary-color: #5bc0de;
// $third-color: #146e8a;
// $fourth-color: #f5deb3;

$primary-font: 'Merriweather', serif;
$secondary-font: "Roboto Condensed", sans-serif;

.category-section {
  color: $primary-color;
  font-family: $primary-font;
  .title {
    font-size: 3rem;
    padding: 6rem 0 3rem 0;
  }
  .category-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: auto;
    width: 80rem;
    height: 12rem;
  }
}

.category-enter-active {
  transition: all 500ms;
}
.category-leave-active {
  transition: all 300ms;
}
.category-enter {
  opacity: 0;
}
.category-enter {
  transform: translateY(2rem);
  opacity: 0;
}
.category-leave-to {
  transform: translateY(2rem);
  opacity: 1;
}

.fade-enter-active {
  transition: all 500ms;
}
.fade-leave-active {
  transition: all 500ms;
}
.fade-enter {
  opacity: 0;
}
.fade-enter {
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
}
</style>
