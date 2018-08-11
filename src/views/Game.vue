<template>
  <div class="home">
    <EnergyLevel v-bind:limit="energyLimit" v-bind:amount="energy" />
    <LightLevel  v-bind:limit="lightLimit" v-bind:amount="light" />
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

      const match = this.detectMove();
      if (!match) return;

      const energyBurn = this.calculateEnergyBurn(match.danceMatch);

      if (energyBurn <= this.energy) {
        this.messages.push(`danced the ${match.danceMatch}`);
        this.decreaseEnergy(energyBurn);
        // TODO manage the light
      } else {
        // TODO alternate messages!
        this.messages.push(`too tired...`);
      }
    }
  }
}
</script>
