<script>
const LIMIT = 10;
const TIME = 3000;
const SHIMEE = 2;
const SHAKE = 2;
const YOLO = 3;

export default {
  name: 'EnergyService',
  data: function() {
    return {
      energy: LIMIT,
      energyLoop: null,
      energyLimit: LIMIT,
    };
  },
  methods: {
    decreaseEnergy(amount = 1) {
      this.energy -= amount;

      this.energy = Math.max(this.energy, 0);
    },
    increaseEnergy(amount = 1) {
      this.energy += amount;

      this.energy = Math.min(LIMIT, this.energy);
    },
    startEnergyLoop() {
      this.energyLoop = window.setInterval(() => {
        this.increaseEnergy();
      }, TIME);
    },
    stopEnergyLoop() {
      window.clearInterval(this.energyLoop);
      this.energyLoop = null;
    },
    calculateEnergyBurn(whichMove) {
      let moveCost;
      switch (whichMove) {
        case 'shimee':
          moveCost = SHIMEE;
          break;
        case 'shake':
          moveCost = SHAKE;
          break;
        case 'yolo':
          moveCost = YOLO;
          break;
        default:
          moveCost = 0;
          break;
      }

      return moveCost;
    }
  }
}
</script>
