<template>
  <div class="enter">
    <form>
      <h2 class="text-center" v-if="enter === 'register'">Register</h2>
      <h2 class="text-center" v-else-if="enter === 'login'">Login</h2>
      <div class="form-group">
        <input
          type="text"
          v-if="enter === 'register'"
          v-model="username"
          class="form-control"
          placeholder="Name..."
        />
      </div>
      <div class="form-group">
        <input
          type="email"
          v-model="userEmail"
          class="form-control"
          placeholder="Email..."
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          v-model="userPass"
          class="form-control"
          placeholder="Password..."
        />
      </div>
      <div class="btn-container form-group">
        <button
          class="btn btn-secondary"
          v-if="enter === 'register'"
          @click.prevent="register"
        >
          Register
        </button>
        <button
          class="btn btn-secondary"
          v-else-if="enter === 'login'"
          @click.prevent="login"
        >
          Login
        </button>
        <button class="btn btn-outline-secondary" @click.prevent="back">
          Back
        </button>
      </div>
      <p v-if="enter === 'register'">
        Already have an account? <a @click.prevent="showLogin">login</a>
      </p>
      <p v-else-if="enter === 'login'">
        Doesn't have an account? <a @click.prevent="showRegister">register</a>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: "Enter",
  data() {
    return {
      username: null,
      userEmail: null,
      userPass: null,
    };
  },
  computed: {
    enter() {
      return this.$route.params.enter;
    },
  },
  methods: {
    showLogin() {
      this.$router.push({ name: "Enter", params: { enter: "login" } });
    },
    showRegister() {
      this.$router.push({ name: "Enter", params: { enter: "register" } });
    },
    back() {
      this.$router.push("/products");
    },
    register() {
      const data = {
        name: this.username,
        email: this.userEmail,
        password: this.userPass,
      };
      this.username = null;
      this.userEmail = null;
      this.userPass = null;
      this.$store.dispatch("register", data);
    },
    login() {
      const data = {
        email: this.userEmail,
        password: this.userPass,
      };
      this.userEmail = null;
      this.userPass = null;
      this.$store.dispatch("login", data);
    },
  },
};
</script>

<style lang="scss" scoped>
.enter {
  height: 100vh;
  form {
    width: 100%;
    max-width: 18rem;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: darkslategray;
    padding: 1rem 1.3rem;
    background-color: white;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.404);
    h2 {
      margin-bottom: 5vh;
    }
    .btn-container {
      display: flex;
      justify-content: space-between;
    }
    a {
      cursor: pointer;
    }
    p {
      text-align: center;
    }
  }
}
</style>
