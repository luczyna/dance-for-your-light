<script>
const SHIMEE = ['a', 'a', 'b'];
const SHAKE = ['c', 'a', 'c'];
const YOLO = ['d', 'a', 'a', 'c'];

export default {
  name: 'DanceService',
  data: function() {
    return {
      keylog: []
    }
  },
  methods: {
    log(which) {
      this.keylog.push(which);
      this.detectMove();
    },
    detectMove() {
      const matchShimee = this.keylog.slice(-(SHIMEE.length)).toString() === SHIMEE.toString();
      const matchShake = this.keylog.slice(-(SHAKE.length)).toString() === SHAKE.toString();
      const matchYolo = this.keylog.slice(-(YOLO.length)).toString() === YOLO.toString();

      if (matchShimee) {
        this.$emit('danceMatch', 'shimee');
      } else if (matchShake) {
        this.$emit('danceMatch', 'shake');
      } else if (matchYolo) {
        this.$emit('danceMatch', 'yolo');
      }
    }
  }
}
</script>
