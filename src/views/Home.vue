<template>
  <div class="home">
    <SNESButtons @sendMove="recieveMove"/>

    <ul v-if="keylog.length">
      <li v-for="(log, index) in lastLogSet" v-bind:key="index">{{log}}</li>
    </ul>
  </div>
</template>

<script>
import SNESButtons from '@/components/SNESButtons.vue';
import DanceService from '@/services/DanceService.vue';

export default {
  name: 'home',
  mixins: [
    DanceService
  ],
  components: {
    SNESButtons
  },
  data: function() {
    return {};
  },
  computed: {
    lastLogSet: function() {
      return this.keylog.slice(-10).reverse();
    }
  },
  methods: {
    recieveMove(which) {
      this.log(which);
    }
  }
}
</script>
