<template>
  <div>
    <EnergyLevel v-bind:limit="energyLimit" v-bind:amount="energy" />
    <LightLevel v-bind:limit="lightLimit" v-bind:amount="light" />
    <SNESButtons @sendMove="recieveMove"/>

    <ul v-if="messages.length">
      <li v-for="(log, index) in lastMessages" v-bind:key="index">{{log}}</li>
    </ul>
  </div>
</template>

<script>
import EnergyLevel from '@/components/EnergyLevel.vue';
import LightLevel from '@/components/LightLevel.vue';
import SNESButtons from '@/components/SNESButtons.vue';
import DanceService from '@/services/DanceService.vue';
import LightService from '@/services/LightService.vue';
import EnergyService from '@/services/EnergyService.vue';

export default {
  name: 'home',
  mixins: [
    DanceService,
    EnergyService,
    LightService
  ],
  components: {
    EnergyLevel,
    LightLevel,
    SNESButtons
  },
  data: function() {
    return {
      messages: []
    };
  },
  mounted() {
    this.startEnergyLoop();
    this.startLightLoop();
  },
  beforeDestroy() {
    this.stopEnergyLoop();
    this.stopLightLoop();
  },
  computed: {
    lastMessages: function() {
      return this.messages.slice(-10).reverse();
    }
  },
  methods: {
    recieveMove(which) {
      this.logMove(which);

      const results = this.detectMove();
      if (!results.match) return;

      const energyBurn = this.calculateEnergyBurn(results.match.name);

      if (energyBurn <= this.energy) {
        this.decreaseEnergy(energyBurn);
        const response = this.judgeDance(results.useful, results.match.name);
        this.messages.push(response);

      } else {
        // TODO alternate messages!
        this.messages.push(`too tired...`);
      }
    }
  }
}
</script>
