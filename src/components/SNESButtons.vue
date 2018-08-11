<template>
  <div class="button-container">
    <div class="column left">
      <button type="button" @click="buttonPress('a')" class="control" data-control="a">a</button>
      <button type="button" @click="buttonPress('b')" class="control" data-control="b">b</button>
    </div>

    <div class="column right">
      <button type="button" @click="buttonPress('c')" class="control" data-control="c">c</button>
      <button type="button" @click="buttonPress('d')" class="control" data-control="d">d</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SNESButtons',
  methods: {
    buttonPress(which) {
      console.log(`${which} was pressed`);
    }
  }
}
</script>

<style lang="scss">
  $pixel-border-size: 6px;
  $top-butt-margin: 5px;

  .button-container {
    display: flex;
    margin: 0 auto;
    width: 170px;
    justify-content: space-evenly;
  }

  .column {
    display: flex;
    flex-direction: column;
    transform: rotateZ(48deg);

    &.right {
      margin-top: 4.5em;
    }
  }

  .control {
    font-size: 1.5em;
    text-align: center;
    padding: 15px 20px;
    margin: 0;
    height: 70px;
    width: 70px - (2 * $pixel-border-size);
    font-family: monospace;

    // THX https://codepen.io/darcy/pen/yGocb
    border-top-width: $pixel-border-size;
    border-bottom-width: $pixel-border-size;
    position: relative;

    &:before, &:after {
      content: '';
      top: 0;
      width: $pixel-border-size;
      height: 100%;
      position: absolute;
    }

    &:before {
      left: -$pixel-border-size;
    }

    &:after {
      right: -$pixel-border-size;
    }

    &[data-control=a] {
      margin-bottom: $top-butt-margin;
      background: blue;
      border-top-color: darken(blue, 15%);
      border-bottom-color: darken(blue, 15%);

      &:before, &:after {
        background: darken(blue, 15%);
      }
    }

    &[data-control=b] {
      background: lime;
      border-top-color: darken(lime, 15%);
      border-bottom-color: darken(lime, 15%);

      &:before, &:after {
        background: darken(lime, 15%);
      }
    }

    &[data-control=c] {
      margin-bottom: $top-butt-margin;
      background: red;
      border-top-color: darken(red, 15%);
      border-bottom-color: darken(red, 15%);

      &:before, &:after {
        background: darken(red, 15%);
      }
    }

    &[data-control=d] {
      background: yellow;
      border-top-color: darken(yellow, 15%);
      border-bottom-color: darken(yellow, 15%);

      &:before, &:after {
        background: darken(yellow, 15%);
      }
    }
  }
</style>
