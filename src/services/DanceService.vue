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
    logMove(which) {
      this.keylog.push(which);
    },
    detectMove() {
      const matchShimee = this.keylog.slice(-(SHIMEE.length)).toString() === SHIMEE.toString();
      const matchShake = this.keylog.slice(-(SHAKE.length)).toString() === SHAKE.toString();
      const matchYolo = this.keylog.slice(-(YOLO.length)).toString() === YOLO.toString();

      if (matchShimee) {
        return { danceMatch: 'shimee' };
      } else if (matchShake) {
        return { danceMatch: 'shake' };
      } else if (matchYolo) {
        return { danceMatch: 'yolo' };
      } else {
        return null;
      }
    }
  }
}
</script>
