<template>
  <div class="about">
    <Navbar />
    <div class="description">
      <h4>This E-Commerce App developed using SPA paradigm in Frontend and TDD paradigm in Backend</h4>
      <br>
      <h5>Frontend Stack</h5>
      <p>Vue.Js, Vuex, Vue Router, Bootsrap, Sweetalert, Sass</p>
      <br>
      <h5>Backend Stack</h5>
      <p>Express.Js, Postgres, Sequelize, Bcrypt, Cors, Jsonwebtoken, Jest, Supertest</p>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
export default {
  name: "About",
  components: {
    Navbar
  }
};
</script>

<style lang="scss" scoped>

$primary-font: "Merriweather", serif;
$secondary-font: "Roboto Condensed", sans-serif;

.about {
  height: 100vh;
}
.description {
  color: darkslategray;
  width: 50%;
  height: fit-content;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  text-align: justify;
  h4,p {
    font-family: $secondary-font;
  }
  h5 {
    font-family: $primary-font;
  }
  p{
    font-size: 1.3rem;
  }
}
</style>
