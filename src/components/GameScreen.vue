<template>
  <div class="screen-container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>

// ticks per frame
const TICKS = 20;

let {BG, CHARACTER} = require('@/components/images.js');
let animationReference;

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
      charTick: 0,
      charFrame: 0,
      width: 0
    };
  },
  mounted() {
    const width = window.innerWidth - (window.innerWidth % 100);

    this.ctx = this.$refs.canvas.getContext('2d');
    this.$refs.canvas.width = width;
    this.$refs.canvas.height = width;
    this.width = width;

    if (this.runAnimation) {
      this.startDrawing();
    }
  },
  watch: {
    runAnimation: function() {
      if (!this.runAnimation) {
        this.stopDrawing();
      } else {
        // TODO explore if we'll ever need this check
        // this.startDrawing();
      }
    }
  },
  methods: {
    clearCanvas() {
      this.ctx.clearRect(0, 0, this.width, this.height);
    },
    composeFrame() {
      this.clearCanvas();
      this.drawBackground();
      this.drawCharacter();

      this.lightTick++;
      this.charTick++;

      if (this.lightTick > TICKS) {
        this.lightTick = 0;
        // switch 0 for 1 and vice versa, we only have 2 frames
        this.lightFrame = (this.lightFrame) ? 0 : 1;
      }

      if (this.charTick > TICKS) {
        this.charTick = 0;
        // switch 0 for 1 and vice versa, we only have 2 frames
        this.charFrame = (this.charFrame) ? 0 : 1;
      }

      animationReference = requestAnimationFrame(this.composeFrame);
    },
    drawBackground() {
      const imageVersion = (this.lightFrame) ? 'A' : 'B';
      const imageLevel = (this.light === 0) ? 1 : this.light;
      const imageKey = imageVersion + imageLevel;

      const whichImage = BG[imageKey];
      this.ctx.drawImage(whichImage, 0, 0, 900, 900, 0, 0, this.width, this.width);
    },
    drawCharacter() {
      // TODO handle states
      const imageVersion = (this.charFrame) ? '1' : '2';
      const imageStatus = 'still';
      const imageKey = imageStatus + imageVersion;

      const whichImage = CHARACTER[imageKey];
      this.ctx.drawImage(whichImage, 0, 0, 900, 900, 0, 0, this.width, this.width);
    },
    startDrawing() {
      animationReference = requestAnimationFrame(this.composeFrame);
    },
    stopDrawing() {
      cancelAnimationFrame(animationReference);
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
    display: block;
  }
</style>
