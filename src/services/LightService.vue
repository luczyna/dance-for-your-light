<script>
const LIMIT = 7;
const TIME = 5000;
const SHIMEE = 1;
const SHAKE = 1;
const YOLO = 2;
const STUN = 3;

export default {
  name: 'EnergyService',
  data: function() {
    return {
      light: LIMIT,
      lightLoop: null,
      lightLimit: LIMIT
    };
  },
  methods: {
    checkLightLevel() {
      if (!this.light) {
        // GAME OVER
        this.gameEnd = Date.now();
      }
    },
    decreaseLight(amount = 1) {
      this.light -= amount;

      this.light = Math.max(this.light, 0);
      this.checkLightLevel();
    },
    increaseLight(amount = 1) {
      this.light += amount;

      this.light = Math.min(LIMIT, this.light);
    },
    startLightLoop() {
      this.lightLoop = window.setInterval(() => {
        this.decreaseLight();
      }, TIME);
    },
    stopLightLoop() {
      window.clearInterval(this.lightLoop);
      this.lightLoop = null;
    },
    judgeDance(isFreshMove, whichDanceName) {
      let updateLightAmount;
      let message;

      switch (whichDanceName) {
        case 'shimee':
          updateLightAmount = SHIMEE;
          message = 'shimee shimee ko ko bop';
          break;
        case 'shake':
          updateLightAmount = SHAKE;
          message = 'shake ya booty';
          break;
        case 'yolo':
          updateLightAmount = YOLO;
          message = 'this is a crazy move, YOLO';
          break;
        case 'stun':
          updateLightAmount = STUN;
          message = 'hiya!';
          break;
        default:
          updateLightAmount = 0;
      }

      if (isFreshMove) {
        this.increaseLight(updateLightAmount);
      } else {
        // TODO alternate phrases!
        message = 'move not phresh!';
        // TODO is this cruel?
        this.decreaseLight(updateLightAmount);
      }

      return message;
    }
  }
}
</script>
