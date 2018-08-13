<script>
const SHIMEE = {
  moves: ['a', 'a', 'b'],
  cooldown: 2000,
  name: 'shimee'
};
const SHAKE = {
  moves: ['c', 'a', 'c'],
  cooldown: 3000,
  name: 'shake'
};
const YOLO = {
  moves: ['d', 'a', 'a', 'c'],
  cooldown: 4000,
  name: 'yolo'
};
const STUN = {
  moves: ['c', 'd', 'a', 'b'],
  cooldown: 5000,
  name: 'stun'
};

export default {
  name: 'DanceService',
  data: function() {
    return {
      keylog: [],
      danceCoolDown: {
        shimee: null,
        shake: null,
        yolo: null,
        stun: null
      }
    };
  },
  methods: {
    logMove(which) {
      this.keylog.push(which);
    },
    detectMove() {
      let isMatch = false;
      let isUseful = false;
      let matchedMove = null;
      let result = { match: matchedMove, useful: isUseful };

      let checkThese = [SHIMEE, SHAKE, YOLO, STUN];
      checkThese.forEach((move) => {
        if (!isMatch) {
          isMatch = this.findDanceMatch(move);
          if (isMatch) {
            matchedMove = move;
          }
        }
      });

      if (isMatch) {
        // if there is no cooldown, then the move is fresh! hense useful
        isUseful = !this.danceCoolDown[matchedMove.name];
        this.resetCooldown(matchedMove);
        result.match = matchedMove;
        result.useful = isUseful;
      }

      return result;
    },
    findDanceMatch(whichMove) {
      // see if the last couple of moves input by player match the move of dance
      const moves = whichMove.moves.toString();
      const input = this.keylog.slice(-whichMove.moves.length).toString();
      return (moves === input);
    },
    resetCooldown(move) {
      const name = move.name;

      if (this.danceCoolDown[name]) {
        // clear an existing one
        window.clearTimeout(this.danceCoolDown[name]);
      }

      // start or restart (>:D) the cooldown
      this.danceCoolDown[name] = window.setTimeout(() => {
        this.danceCoolDown[name] = null;
      }, move.cooldown);
    }
  }
}
</script>
