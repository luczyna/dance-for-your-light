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
    }
  }
}
