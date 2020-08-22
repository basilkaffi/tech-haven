<template>
  <b-navbar id="navbar">
    <b-navbar-brand class="logo">
      <p class="textLogo" :class="{ bannerMode: inBanner }">
        <span id="tech">Tech</span>
        <span id="haven">Haven</span>
      </p>
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto center">
      <div class="text">About</div>
      <CategoryDropdown></CategoryDropdown>
      <div class="text">Contact</div>
      <!-- </b-navbar-nav>
    <b-navbar-nav class="ml-auto right"> -->
      <div class="right">
        <UserDropdown></UserDropdown>
        <b-icon
          icon="cart3"
          class="icon rounded-circle bg-secondary p-1"
          style="width: 2rem; height: 2rem;"
          variant="light"
        ></b-icon>
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
};
</script>

<style lang="scss" scoped>
$primary-color: #2f4f4f;
$secondary-color: #f5deb3;
$third-color: #ffffff;
$fourth-color: #808080;

#navbar {
  background-color: $primary-color;
  align-items: center;
  padding: 0 6%;
  position: fixed;
  width: 100%;
  z-index: 2;
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
      color: $third-color;
    }
    #haven {
      color: $secondary-color;
    }
  }
  .center,
  .right {
    display: flex;
    flex-direction: row;
    width: fit-content;
  }
  .center {
    .text {
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
    .icon {
      margin: 0.8rem;
      cursor: pointer;
      transition: 400ms;
    }
    .icon:hover {
      transform: scale(1.2);
    }
  }
}
</style>
