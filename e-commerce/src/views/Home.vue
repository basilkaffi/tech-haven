<template>
  <div class="home">
    <transition name="navbar">
      <Navbar v-if="showNavbar" />
    </transition>
    <Banner />
    <CategoryContainer />
    <ProductContainer v-if="showNavbar" />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Banner from "@/components/Banner.vue";
import CategoryContainer from "@/components/CategoryContainer.vue";
import ProductContainer from "@/components/ProductContainer";

export default {
  name: "Home",
  components: {
    Navbar,
    Banner,
    CategoryContainer,
    ProductContainer
  },
  data() {
    return {
      showNavbar: false,
    };
  },
  methods: {
    handleScroll(event) {
      window.pageYOffset > (window.innerHeight * 4) / 5
        ? (this.showNavbar = true)
        : (this.showNavbar = false);
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
.home {
  min-height: 200vh;
}
.navbar-enter-active {
  transition: all 200ms;
}
.navbar-leave-active {
  transition: all 100ms;
}
.navbar-enter {
  opacity: 0;
}
.navbar-enter {
  transform: translateY(-4rem);
}
.navbar-leave-to {
  transform: translateY(-4rem);
}
</style>
