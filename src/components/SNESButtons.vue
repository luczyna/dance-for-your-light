<template>
  <div class="control-container">
    <div class="column left">
      <button type="button" @click="buttonPress('a')" class="control button" v-bind:class="{'focus': focusOnA}" data-control="a">a</button>
      <button type="button" @click="buttonPress('b')" class="control button" v-bind:class="{'focus': focusOnB}" data-control="b">b</button>
    </div>

    <div class="column right">
      <button type="button" @click="buttonPress('c')" class="control button" v-bind:class="{'focus': focusOnC}" data-control="c">c</button>
      <button type="button" @click="buttonPress('d')" class="control button" v-bind:class="{'focus': focusOnD}" data-control="d">d</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SNESButtons',
  mounted() {
    window.addEventListener('keyup', this.keyPressMapper);
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.keyPressMapper);
  },
  data: function() {
    return {
      focusOnA: false,
      focusOnB: false,
      focusOnC: false,
      focusOnD: false
    }
  },
  methods: {
    buttonPress(which) {
      this.$emit('sendMove', which);
    },
    keyPressMapper(event) {
      switch (event.keyCode) {
        case 37:
          this.buttonPress('b');
          this.focusOnB = true;
          this.resetFocus('focusOnB');
          break;
        case 40:
          this.buttonPress('d');
          this.focusOnD = true;
          this.resetFocus('focusOnD');
          break;
        case 38:
          this.buttonPress('a');
          this.focusOnA = true;
          this.resetFocus('focusOnA');
          break;
        case 39:
          this.buttonPress('c');
          this.focusOnC = true;
          this.resetFocus('focusOnC');
          break;
        default:
          break;
      }
    },
    resetFocus(whichKey) {
      window.setTimeout(() => this[whichKey] = false, 200);
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/variables.scss";
  @import "@/assets/mixins.scss";

  $pixel-border-size: 5px;
  $top-butt-margin: 5px;

  .control-container {
    display: flex;
    margin: -2em auto -1em;
    width: 136px;
    justify-content: space-evenly;
    // give it a little nudge over, the rotation of the children knock the center alignment off a little
    transform: translateX(-10px)
  }

  .column {
    display: flex;
    flex-direction: column;
    transform: rotateZ(44deg);

    &.right {
      margin-top: 3em;
    }
  }

  .control {
    font-size: 1.25em;
    margin: 0;
    height: 55px;
    width: 55px - (2 * $pixel-border-size);

    &[data-control=a] {
      margin-bottom: $top-butt-margin;
    }

    &[data-control=b] {
      @include pixel-button-variation(lime);
    }

    &[data-control=c] {
      margin-bottom: $top-butt-margin;
      @include pixel-button-variation(red);
    }

    &[data-control=d] {
      @include pixel-button-variation(yellow);
    }
  }
</style>
