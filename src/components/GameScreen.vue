<template>
  <div class="screen-container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
// ticks per frame
const TICKS = 20;
let BG = {
  A1: new Image(),
  B1: new Image(),
  A2: new Image(),
  B2: new Image(),
  A3: new Image(),
  B3: new Image(),
  A4: new Image(),
  B4: new Image(),
  A5: new Image(),
  B5: new Image(),
  A6: new Image(),
  B6: new Image(),
  A7: new Image(),
  B7: new Image()
};

// D'OH need to switch the levels (7 is 1...)
BG.A1.src = '/img/bg/bg7a.JPG';
BG.B1.src = '/img/bg/bg7b.JPG';
BG.A2.src = '/img/bg/bg6a.JPG';
BG.B2.src = '/img/bg/bg6b.JPG';
BG.A3.src = '/img/bg/bg5a.JPG';
BG.B3.src = '/img/bg/bg5b.JPG';
BG.A4.src = '/img/bg/bg4a.JPG';
BG.B4.src = '/img/bg/bg4b.JPG';
BG.A5.src = '/img/bg/bg3a.JPG';
BG.B5.src = '/img/bg/bg3b.JPG';
BG.A6.src = '/img/bg/bg2a.JPG';
BG.B6.src = '/img/bg/bg2b.JPG';
BG.A7.src = '/img/bg/bg1a.JPG';
BG.B7.src = '/img/bg/bg1b.JPG';

export default {
  name: 'LightLevel',
  props: {
    light: Number,
    runAnimation: Boolean
  },
  data: function() {
    return {
      ctx: null,
      lightTick: 0,
      lightFrame: 0,
      width: 0,
      animation: null
    };
  },
  mounted() {
    const width = window.innerWidth - (window.innerWidth % 100);

    this.ctx = this.$refs.canvas.getContext('2d');
    this.$refs.canvas.width = width;
    this.$refs.canvas.height = width;
    this.width = width;

    if (this.runAnimation) {
      // this.startDrawing();
    }
  },
  watch: {
    runAnimation: function() {
      console.log('game changed');
      if (this.runAnimation) {
        this.startDrawing();
      } else {
        this.stopDrawing();
      }
    }
  },
  methods: {
    clearCanvas() {
      this.ctx.clearRect(0, 0, this.width, this.height);
    },
    composeFrame() {
      window.requestAnimationFrame(this.composeFrame);

      this.clearCanvas();
      this.drawBackground();

      this.lightTick++;

      if (this.lightTick > TICKS) {
        this.lightTick = 0;
        // switch 0 for 1 and vice versa, we only have 2 frames
        this.lightFrame = (this.lightFrame) ? 0 : 1;
      }
    },
    drawBackground() {
      const imageVersion = (this.lightFrame) ? 'A' : 'B';
      const imageKey = imageVersion + this.light;

      const whichImage = BG[imageKey];
      this.ctx.drawImage(whichImage, 0, 0, 900, 900, 0, 0, this.width, this.width);
    },
    startDrawing() {
      this.animation = window.requestAnimationFrame(this.composeFrame);
    },
    stopDrawing() {
      console.log('ANIMATION STOPPED');
      window.cancelAnimationFrame(this.animation);
      this.animation = null;
    }
  }
}
</script>

<style lang="scss">
  .screen-container {
    margin: 0 auto 1em;
  }

  canvas {
    margin: 0 auto;
    border: 1px #cecece solid;
    display: block;
  }
</style>
