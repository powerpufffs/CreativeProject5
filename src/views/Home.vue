<template>
  <div class="home">
    <LogIn @logInEmit="login()" @logOutEmit="logout()"/>
    <Game v-if="loggedIn"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Game from '@/components/Game.vue'
import LogIn from '@/components/LogIn.vue'

export default {
  name: 'home',
  components: {
    Game,
    LogIn
  },
  data: function() {
    return {
      loggedIn: false,
    }
  },
  methods: {
    login () {
      this.loggedIn = true;
    },
    logout () {
      this.loggedIn = false;
    }
  },
}
</script>
