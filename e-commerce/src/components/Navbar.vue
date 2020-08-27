<template>
  <b-navbar id="navbar" fixed="top">
    <b-navbar-brand class="logo" @click.prevent="gotoHome">
      <p class="textLogo" :class="{ bannerMode: inBanner }">
        <span id="tech">Tech</span>
        <span id="haven">Haven</span>
      </p>
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <div class="center">
        <div class="text" @click.prevent="gotoAbout">About</div>
        <CategoryDropdown></CategoryDropdown>
        <div class="text">Contact</div>
      </div>
      <div class="right">
        <UserDropdown></UserDropdown>
        <img
          class="icon"
          src="https://image.flaticon.com/icons/svg/833/833400.svg"
          alt="cartImg"
          @click.prevent="gotoCartPage"
        />
      </div>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import CategoryDropdown from "./CategoryDropdown";
import UserDropdown from "./UserDropdown";
export default {
  name: "Navbar",
  components: {
    CategoryDropdown,
    UserDropdown,
  },
  props: ["inBanner"],
  methods: {
    gotoHome() {
      this.$router.push("/products");
    },
    gotoAbout() {
      this.$router.push("/about");
    },
    gotoCartPage() {
      localStorage.access_token
        ? this.$router.push("/carts")
        : this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #2f4f4f;
$secondary-color: #f5deb3;
$third-color: #ffffff;
$fourth-color: #808080;

$primary-font: 'Merriweather', serif;
$secondary-font: "Roboto Condensed", sans-serif;

// $primary-color: #ffffff;
// $secondary-color: #5bc0de;
// $third-color: #146e8a;
// $fourth-color: #f5deb3;

#navbar {
  background-color: $primary-color;
  align-items: center;
  padding: 0 6%;
  position: fixed;
  width: 100%;
  z-index: 2;
  box-shadow: 0 0.1rem 0.4rem 0 rgba(47, 79, 79, 0.1);
  .logo {
    .textLogo {
      font-size: 2rem;
      margin: auto;
      cursor: pointer;
    }
    .bannerMode {
      font-size: 3rem;
    }
    #tech {
      font-family: $secondary-font;
      color: $third-color;
      font-weight: 300;
    }
    #haven {
      font-family: $primary-font;
      color: $secondary-color;
    }
  }
  .center,
  .right {
    display: flex;
    width: fit-content;
  }
  .center {
    .text {
      font-family: $primary-font;
      color: $third-color;
      margin: 1rem;
      cursor: pointer;
      transition: 400ms;
      font-size: 1.2rem;
    }
    .text:hover {
      color: $secondary-color;
      transform: translateY(-0.2rem);
    }
  }
  .right {
    margin-left: 2rem;
    width: 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 1.6rem;
      filter: invert(90%);
      cursor: pointer;
      transition: 400ms;
    }
    .icon:hover {
      transform: scale(1.2);
      filter: invert(100%);
    }
  }
}
</style>
