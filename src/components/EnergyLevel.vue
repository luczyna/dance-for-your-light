<template>
  <div class="energy-container">
    <div class="energy-level">
      <div v-for="n of limit" class="energy" v-bind:key="n" v-bind:class="{'filled': amount >= n}"></div>
    </div>

    <p class="label">energy</p>
  </div>
</template>

<script>

export default {
  name: 'EnergyLevel',
  props: {
    limit: Number,
    amount: Number,
  }
}
</script>

<style lang="scss">
  @import "@/assets/variables.scss";

  .energy-container {
    width: 47%;
  }

  .energy-level {
    display: flex;
    justify-content: flex-start;
    height: $level-height;
  }

  .energy {
    border: 1px solid $black;
    width: 1px;
    flex: 1 0 auto;

    &:first-of-type {
      border-left-width: 2px;
    }

    &:last-of-type {
      border-right-width: 2px;
    }

    &.filled {
      background: lime;
    }
  }
</style>
