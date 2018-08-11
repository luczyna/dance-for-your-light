<template>
  <div class="home">
    <EnergyLevel />
    <SNESButtons @sendMove="recieveMove"/>

    <ul v-if="messages.length">
      <li v-for="(log, index) in lastMessages" v-bind:key="index">{{log}}</li>
    </ul>
  </div>
</template>

<script>
import EnergyLevel from '@/components/EnergyLevel.vue';
import SNESButtons from '@/components/SNESButtons.vue';
import DanceService from '@/services/DanceService.vue';

export default {
  name: 'home',
  mixins: [
    DanceService
  ],
  components: {
    EnergyLevel,
    SNESButtons
  },
  data: function() {
    return {
      messages: []
    };
  },
  computed: {
    lastMessages: function() {
      return this.messages.slice(-10).reverse();
    }
  },
  methods: {
    recieveMove(which) {
      this.log(which);

      const match = this.detectMove();
      if (match) {
        this.messages.push(`danced the ${match.danceMatch}`);
      }
    },
    logDanceMatch(move) {
      console.log(move);
    }
  }
}
</script>
