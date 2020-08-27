<template>
  <div class="dropdown">
    <img
      class="icon"
      src="https://image.flaticon.com/icons/svg/709/709722.svg"
      alt="profileImg"
    />
    <div class="dropdown-content" v-if="username">
      <div class="dropdown-item name">{{ formatName(username) }}</div>
      <div class="dropdown-item button" @click.prevent="loggingOut">
        <span>Logout</span>
      </div>
    </div>
    <div class="dropdown-content" v-else>
      <div class="dropdown-item button" @click.prevent="gotoRegister">
        Register
      </div>
      <div class="dropdown-item button" @click.prevent="gotoLogin">Login</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryDropdown",
  data() {
    return {
      username: null,
    };
  },
  created() {
    this.$store.dispatch("setUsername", localStorage.username);
    this.username = this.$store.state.username;
  },
  methods: {
    loggingOut() {
      localStorage.clear();
      this.username = null;
      this.$router.push("/products");
    },
    gotoRegister() {
      this.$router.push("/register");
    },
    gotoLogin() {
      this.$router.push("/login");
    },
    formatName(name) {
      const usernameArray = name.split(" ");
      const newusernameArray = usernameArray.map((name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
      });
      return newusernameArray.join(" ");
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
  .icon {
    width: 1.6rem;
    filter: invert(90%);
    cursor: pointer;
    transition: 400ms;
    margin: 0.8rem;
  }
  .dropdown-content {
    box-sizing: border-box;
    position: absolute;
    transform: translateY(-0.7rem);
    background-color: $primary-color;
    border-radius: 0.3rem 0.3rem 0 0;
    min-width: 9rem;
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
    .name {
      cursor: default;
    }
  }
}
.dropdown:hover .icon {
  transform: scale(1.2);
  filter: invert(100%);
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
  span {
    color: $secondary-color;
  }
}
</style>
