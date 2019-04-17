<template>
  <div class="leaderboard">
    <h1>Leaderboard</h1>
    <div class="scores">
      <div v-for="game in allGames" :key="game._id">
        <p class="label">Name: <span class="notBold">{{ game.name }}</span></p> 
        <p class="label">Turns: <span class="notBold">{{ game.turns }}</span></p> 
        <p class="label">Duration: <span class="notBold">{{ game.duration }}</span></p> 
        <p class="label">Date: <span class="notBold">{{ formatDate(game.created) }}</span></p> 
      </div>
    </div>
    <div class="scores" v-if="user">
      <h1>Your Last 5 Games</h1>
      <div v-for="game in personalGames" :key="game._id">
        <p class="label">Turns: <span class="notBold">{{ game.turns }}</span></p> 
        <p class="label">Duration: <span class="notBold">{{ game.duration }}</span></p> 
        <p class="label">Date: <span class="notBold">{{ formatDate(game.created) }}</span></p> 
      </div>
    </div>
    <div v-else>
      <h1>Log in to see your own scores.</h1>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'leaderboard',
  data() {
    return {
      personalGames: [],
      allGames: [],
    }
  },
  methods: {
    userGames() {
      this.personalGames = this.games
        .filter(game => game.user == this.user._id)
        .sort((a,b) => a.duration - b.duration)
        .slice(0, 5);
    },
    topGames() {
      this.allGames = this.games
        .sort((a,b) => a.duration - b.duration)
        .slice(0, 5);
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
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
    this.userGames();
    this.topGames();
  }
}
</script>

<style scoped>

.scores {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.label {
  font-size: 20px;
  font-weight: bold;
}

.notBold {
  font-weight: normal;
}

</style>

