<template>
  <div class="light-container">
    <div class="light-level">
      <div v-for="n of limit" class="light" v-bind:key="n" v-bind:class="{'bright': amount >= n}"></div>
    </div>

    <p class="label">light</p>
  </div>
</template>

<script>

export default {
  name: 'LightLevel',
  props: {
    limit: Number,
    amount: Number,
  }
}
</script>

<style lang="scss">
  @import "@/assets/variables.scss";

  .light-container {
    width: 47%;
    text-align: right;
  }

  .light-level {
    display: flex;
    justify-content: flex-end;
    flex-direction: row-reverse;
    height: $level-height;
  }

  .light {
    border: 1px solid $black;
    width: 1px;
    flex: 1 0 auto;
    background: $black;

    &:first-of-type {
      border-right-width: 2px;
    }

    &:last-of-type {
      border-left-width: 2px;
    }

    &.bright {
      background: $white;
    }
  }
</style>
