<script>
const LIMIT = 7;
const TIME = 10000;
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

      // TODO add checks! no light === GAME OVER
      this.light = Math.max(this.light, 0);
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
    // TODO set up diminishing returns for dance moves
    judgeDance(whichDance) {
      let increaseBy;

      switch (whichDance) {
        case 'shimee':
          increaseBy = SHIMEE;
          break;
        case 'shake':
          increaseBy = SHAKE;
          break;
        case 'yolo':
          increaseBy = YOLO;
          break;
        default:
          increaseBy = 0;
      }

      this.increaseLight(increaseBy);
    }
  }
}
</script>
