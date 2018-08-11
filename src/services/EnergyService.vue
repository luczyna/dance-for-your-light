<script>
const LIMIT = 10;
const TIME = 1000;
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
      this.energyLoop = window.setInterval(this.decreaseEnergy, TIME);
    },
    stopEnergyLoop() {
      window.stopInterval(this.energyLoop);
    }
  }
}
</script>
