<template>
  <div class="control-container">
      <button type="button" @click="buttonPress('a')" class="control button" v-bind:class="{'focus': focusOnA}" data-control="a">a</button>
      <button type="button" @click="buttonPress('b')" class="control button" v-bind:class="{'focus': focusOnB}" data-control="b">b</button>

      <button type="button" @click="buttonPress('c')" class="control button" v-bind:class="{'focus': focusOnC}" data-control="c">c</button>
      <button type="button" @click="buttonPress('d')" class="control button" v-bind:class="{'focus': focusOnD}" data-control="d">d</button>
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
        case 49:
          this.buttonPress('a');
          this.focusOnA = true;
          this.resetFocus('focusOnA');
          break;
        case 50:
          this.buttonPress('b');
          this.focusOnB = true;
          this.resetFocus('focusOnB');
          break;
        case 51:
          this.buttonPress('c');
          this.focusOnC = true;
          this.resetFocus('focusOnC');
          break;
        case 52:
          this.buttonPress('d');
          this.focusOnD = true;
          this.resetFocus('focusOnD');
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
    margin: 0 auto;
    justify-content: space-between;
  }

  .control {
    font-size: 1.25em;
    margin: 0 (2 * $pixel-border-size);
    height: 55px;
    width: 55px - (2 * $pixel-border-size);
    flex: 1 0 auto;

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
