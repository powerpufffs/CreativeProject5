<template>
<div>
  <div v-if="user">
    <div class="header">
      <div>
        <h1>{{user.name}}</h1>
      </div>
      <div>
        <p id="logoutButton">
          <a href="#" @click="logout">Log Out</a>
        </p>
      </div>
    </div>
  </div>
  <div v-else-if="!loggingIn">
    <p>If you would like to save or view your scores, please register for an account or login.</p>
    <button class="pure-button" @click="actionToRegister">Register</button> or
    <button class="pure-button" @click="actionToLogin">Login</button>
  </div>
  <div v-if="loggingIn && action === 'login'">
    <h1>Login to your account</h1>
    <form @submit.prevent="login" class="pure-form pure-form-aligned">
        <fieldset>
        <p class="pure-form-message-inline">All fields are required.</p>

        <div class="pure-control-group">
            <label for="username">Username</label>
            <input v-model="username" type="text" placeholder="Username">
        </div>

        <div class="pure-control-group">
            <label for="password">Password</label>
            <input v-model="password" type="password" placeholder="Password">
        </div>

        <div class="pure-controls">
            <button type="submit" class="pure-button pure-button-primary">Submit</button>
        </div>
        </fieldset>
    </form>
    <p v-if="error" class="error">{{error}}</p>
  </div>
  <div v-if="loggingIn && action === 'register'">
    <h1>Register for an account</h1>
    <form @submit.prevent="register" class="pure-form pure-form-aligned">
        <fieldset>
        <p class="pure-form-message-inline">All fields are required.</p>

        <div class="pure-control-group">
            <label for="name">Real Name</label>
            <input v-model="name" type="text" placeholder="Real Name">
        </div>

        <div class="pure-control-group">
            <label for="username">Username</label>
            <input v-model="username" type="text" placeholder="Username">
        </div>

        <div class="pure-control-group">
            <label for="password">Password</label>
            <input v-model="password" type="password" placeholder="Password">
        </div>

        <div class="pure-controls">
            <button type="submit" class="pure-button pure-button-primary">Submit</button>
        </div>
        </fieldset>
    </form>
    <p v-if="error" class="error">{{error}}</p>
  </div>
</div>
</template>

<script>

export default {
  name: 'login',
  data() {
    return {
      loggingIn: false,
      action: "",
      name: "",
      username: "",
      password: "",
      error: "",
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  async created() {
    await this.$store.dispatch("getUser");
  },
  methods: {
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
        this.escape();
        this.$emit('logOut');
      } catch (error) {
        console.log(error);
      }
    },
    async login() {
      try {
        this.error = await this.$store.dispatch("login", {
          username: this.username,
          password: this.password
        });
        if (this.error === "")
            this.escape();
            this.$emit('logIn');
          //this.$router.push('');
      } catch (error) {
        console.log(error);
      }
    },
    async register() {
      try {
        this.error = await this.$store.dispatch("register", {
          name: this.name,
          username: this.username,
          password: this.password
        });
        if (this.error === "")
            this.escape();
            this.$emit('logIn');
          //this.$router.push('mypage');
      } catch (error) {
        console.log(error);
      }
    },
    escape() {
        this.action = "";
        this.loggingIn = false;
        this.name = "";
        this.username = "";
        this.password = "";
        this.error = "";
    },
    actionToLogin () {
        this.action = "login";
        this.loggingIn = true;
    },
    actionToRegister() {
        this.action = "register";
        this.loggingIn = true;
    },

  }
}
</script>

<style scoped>
p#logoutButton {
    text-align: center;
    margin: 2em;
}

a {
    text-decoration: none;
    border: black 1px solid;
    padding: .25em;
    border-radius: 10px;
}

.header {
  display: flex;
}
.header a {
  color: #222;
  font-size: 1em;
}
.header svg {
  margin-top: 12px;
}
</style>
