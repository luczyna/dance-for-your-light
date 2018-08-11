<script>
const LIMIT = 7;
const TIME = 5000;
const SHIMEE = 1;
const SHAKE = 1;
const YOLO = 2;

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
    decreaseLight(amount = 1) {
      this.light -= amount;

      this.light = Math.max(this.light, 0);
    },
    increaseLight(amount = 1) {
      this.light += amount;

      this.light = Math.min(LIMIT, this.light);
    },
    startLightLoop() {
      this.lightLoop = window.setInterval(() => {
        this.decreaseLight();
        // TODO add checks! no light === GAME OVER
      }, TIME);
    },
    stopLightLoop() {
      window.clearInterval(this.lightLoop);
      this.lightLoop = null;
    },
    judgeDance(isFreshMove, whichDance) {
      let increaseBy;
      let message;

      if (isFreshMove) {
        switch (whichDance.name) {
          case 'shimee':
          increaseBy = SHIMEE;
          message = 'shimee shimee ko ko bop';
          break;
          case 'shake':
          increaseBy = SHAKE;
          message = 'shake ya booty';
          break;
          case 'yolo':
          increaseBy = YOLO;
          message = 'this is a crazy move, YOLO';
          break;
          default:
          increaseBy = 0;
        }

        this.increaseLight(increaseBy);
      } else {
        // TODO alternate phrases!
        message = 'move not phresh!';
        // TODO is this cruel?
        this.decreaseLight();
      }

      return message;
    }
  }
}
</script>
