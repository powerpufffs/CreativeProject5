<template>
  <div class="home">
    <Game v-if="loggedIn"/>
    <LogIn v-else/>
  </div>
</template>

<script>
// @ is an alias to /src
import Game from '@/components/Game.vue'

export default {
  name: 'home',
  components: {
    Game
  },
  data: function() {
    return {
      loggedIn: false,
    }
  },
  methods: {

  },
}
</script>
