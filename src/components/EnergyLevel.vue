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
  .energy-container {
    // TODO update with new elements or use a $var
    width: 170px;
    margin: 0 auto 1em;
  }

  .energy-level {
    display: flex;
    justify-content: flex-start;
    height: 16px;
  }

  .energy {
    border: 1px solid black;
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
