<template>
  <div class="about" v-if="user">
    <h1>Leaderboard</h1>
    <div v-for="game in games" :key="game._id">
      <p>{{ game.name}} </p>
      <p>{{ game.turns }}</p>
      <p>{{ game.duration }}</p>
      <p>{{ game.date }}</p>
    </div>
  </div>
  <div v-else-if="!user">
    <p>Please log in to see your games</p>
  </div>
</template>

<script>
export default {
  name: 'leaderboard',
  data() {
    return {
      personalGames: [],
      allGames: [],
    }
  },
  methods: {

  },
  computed: {
    games: function() {
      return this.$store.state.games;
    },
    user: function() {
      return this.$store.state.user;
    }
  },
  async created() {
    await this.$store.dispatch("getUser");
    await this.$store.dispatch("getGames");
  }
}
</script>

<style scoped>

</style>

