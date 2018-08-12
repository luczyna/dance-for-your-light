<template>
  <div id="app">
    <p class="nav">
      <router-link :to="{name: 'home'}">Home</router-link>
      <router-link :to="{name: 'game'}">Dance</router-link>
      <router-link :to="{name: 'about'}">About</router-link>
      <router-link :to="{name: 'learn'}">Learn</router-link>
    </p>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "@/assets/variables.scss";

.nav {
  text-align: center;

  a {
    margin-right: 1em;

    &.router-link-exact-active {
      color: $pop;
    }

    &:last-of-type {
      margin-right: 0;
    }
  }
}
</style>
