<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Game</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  margin: 0 auto 1em;
  a {
    color: #2c3e50;
    margin-right: 1em;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
