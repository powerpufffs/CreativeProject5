<template>
  <div class="grid">
    <div id="app">
      <div id="nav">
        <h1>The Game</h1>
        <router-link to="/">Home</router-link> |
        <router-link to="/leaderboard">Leaderboard</router-link>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<style>
#app {
  grid-column-start: 2;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;
  /* grid-template-columns: 
    minmax(10%, 1fr)
    minmax(80%, 90%)
    minmax(10%, 1fr) / minmax(10%, 1fr) minmax(80%, 90%) minmax(10%, 1fr); */
}
#nav {
  /* grid-column-start: 2;
  grid-row-start: 2; */
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.grid {
  display: grid;
  grid-template-columns: minmax(30%, 1fr) minmax(40%, 80%) minmax(30%, 1fr);
}
</style>
