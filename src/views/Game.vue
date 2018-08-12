<template>
  <div>
    <EnergyLevel v-bind:limit="energyLimit" v-bind:amount="energy" />
    <LightLevel v-bind:limit="lightLimit" v-bind:amount="light" />

    <!-- <p><a target="_blank" v-bind:href="tweet">Twieet yur sc0r3</a></p> -->
    <GameOver v-if="gameOver" v-bind:gameStart="gameStart" v-bind:gameEnd="gameEnd" />
    <GameScreen v-bind:light="light" v-bind:runAnimation="!gameOver" />
    <SNESButtons @sendMove="recieveMove"/>

    <ul v-if="messages.length">
      <li v-for="(log, index) in lastMessages" v-bind:key="index">{{log}}</li>
    </ul>
  </div>
</template>

<script>
import EnergyLevel from '@/components/EnergyLevel.vue';
import GameScreen from '@/components/GameScreen.vue';
import GameOver from '@/components/GameOver.vue';
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
    GameScreen,
    GameOver,
    LightLevel,
    SNESButtons
  },
  data: function() {
    return {
      messages: [],
      gameStart: null,
      gameEnd: null,
      gameOver: false
    };
  },
  watch: {
    gameEnd: function () {
      this.gameOver = true;
      this.stopGame();
    }
  },
  mounted() {
    this.startEnergyLoop();
    this.startLightLoop();
    this.gameStart = Date.now();
  },
  beforeDestroy() {
    this.stopGame();
  },
  computed: {
    lastMessages: function() {
      return this.messages.slice(-10).reverse();
    },
    tweet: function() {
      const fake = '87 seconds'
      let url = 'https://twitter.com/intent/tweet?text=';
      url += encodeURI(`I danced for ${fake} in Dance for your Life, by @tropvache! Sweet!`);

      return url;
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
    },
    stopGame() {
      this.stopEnergyLoop();
      this.stopLightLoop();
    }
  }
}
</script>
