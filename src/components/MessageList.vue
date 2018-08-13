<template>
  <ul class="message-container page">
    <li v-for="(log, index) in messages" v-bind:key="index">{{log}}</li>
  </ul>
</template>

<script>
export default {
  name: 'MessageList',
  props: {
    messages: Array,
  }
}
</script>

<style lang="scss">
  @import "@/assets/variables.scss";

  .message-container {
    padding: 0;
    margin: 1em auto;
    list-style: none;

    li {
      padding: 5px 0 4px;
      border-bottom: 1px $off-black solid;

      &:last-of-type {
        border-bottom: none;
      }
    }
  }
</style>
