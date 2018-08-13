<template>
  <div class="game-over">
    <h1>Game Over :(</h1>
    <p>you danced for {{gameLength}}</p>
    <p><button class="button" type="button" @click="reloadGame">start dancing again</button></p>
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
  @import "@/assets/variables.scss";

  .game-over {
    border: 2px solid $white;
    padding: 20px;
    position: absolute;
    top: 0;
    width: 90%;
    left: 5%;
    background: $black;
  }
</style>
