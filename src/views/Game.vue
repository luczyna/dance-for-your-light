<template>
  <div class="game">
    <div class="levels">
      <EnergyLevel v-bind:limit="energyLimit" v-bind:amount="energy" />
      <LightLevel v-bind:limit="lightLimit" v-bind:amount="light" />
    </div>

    <div class="elements">
      <p class="centered play-ball" v-if="!gameStart"><button class="button" type="button" @click="startGame">start dancing</button></p>

      <!-- <p><a target="_blank" v-bind:href="tweet">Twieet yur sc0r3</a></p> -->
      <GameOver v-if="gameOver" v-bind:gameStart="gameStart" v-bind:gameEnd="gameEnd" />
      <GameScreen v-bind:light="light" v-bind:runAnimation="!gameOver" v-bind:moves="moveLineup" />
      <SNESButtons @sendMove="recieveMove"/>

      <MessageList v-if="messages.length" v-bind:messages="lastMessages" />
    </div>
  </div>
</template>

<script>
import EnergyLevel from '@/components/EnergyLevel.vue';
import GameScreen from '@/components/GameScreen.vue';
import GameOver from '@/components/GameOver.vue';
import LightLevel from '@/components/LightLevel.vue';
import MessageList from '@/components/MessageList.vue';
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
    MessageList,
    SNESButtons
  },
  data: function() {
    return {
      messages: [],
      gameStart: null,
      gameEnd: null,
      gameOver: false,
      moveLineup: []
    };
  },
  watch: {
    gameEnd: function () {
      this.gameOver = true;
      this.stopGame();
    }
  },
  // mounted() {
  //   this.startGame();
  // },
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
      this.moveLineup.push({type: 'move', value: which});
      if (!this.gameStart) return;

      this.logMove(which);

      const results = this.detectMove();
      if (!results.match) return;

      const energyBurn = this.calculateEnergyBurn(results.match.name);

      if (energyBurn <= this.energy) {
        this.moveLineup.push({type: 'dance', value: results.match.name});
        this.decreaseEnergy(energyBurn);
        const response = this.judgeDance(results.useful, results.match.name);
        this.messages.push(response);

      } else {
        // TODO alternate messages!
        this.messages.push(`too tired...`);
      }
    },
    startGame() {
      this.startEnergyLoop();
      this.startLightLoop();
      this.gameStart = Date.now();
    },
    stopGame() {
      this.stopEnergyLoop();
      this.stopLightLoop();
    }
  }
}
</script>

<style lang="scss">
.levels {
  display: flex;
  justify-content: space-between;
  max-width: 600px;
  margin: 0 auto 1em;
}

.elements {
  position: relative;
}

.play-ball {
  position: absolute;
  top: 30%;
  left: 0;
  width: 100%;
}
</style>
