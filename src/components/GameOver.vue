<template>
  <div>
    <h1>Game Over</h1>
    <p>you danced for {{gameLength}}</p>
    <p><button type="button" @click="reloadGame">start dancing again</button></p>
  </div>
</template>

<script>
export default {
  name: 'GameOver',
  props: {
    gameStart: Number,
    gameEnd: Number
  },
  computed: {
    gameLength: function() {
      const seconds = (this.gameEnd - this.gameStart) / 1000;
      return `${seconds} seconds`;
    }
  },
  methods: {
    reloadGame() {
      // TODO explore other ways to do this?
      window.location.reload();
    }
  }
}
</script>

<style lang="scss">

</style>
