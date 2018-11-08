import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  analyser: computed('audioContext', 'source', function() {
    var analyser = this.get('audioContext').createAnalyser();
    this.get('source').connect(analyser);
    analyser.minDecibels = -90;
    analyser.maxDecibels = -10;
    analyser.smoothingTimeConstant = 0.85;
    analyser.fftSize = 128;
    return analyser;
  }),

  width: computed('canvas', function() {
    return this.get("canvas").width;
  }),
  height: computed('canvas', function() {
    return this.get("canvas").height;
  }),
  canvasContext: computed('canvas', function() {
    return this.get('canvas').getContext('2d');
  }),

  didInsertElement() {
    var canvas = this.$('.visualizer')[0];
    var intendedWidth = document.querySelector('.wrapper').clientWidth;
    canvas.setAttribute('width', intendedWidth);
    this.set('canvas', canvas);
    this.setupCanvas();
  },

  setupCanvas() {
    var canvasCtx = this.get("canvasContext");

    var analyser = this.get('analyser');

    var WIDTH = this.get('width');
    var HEIGHT = this.get("height");

    var bufferLength = analyser.fftSize;
    var dataArray = new Float32Array(bufferLength);

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    function draw() {
      requestAnimationFrame(draw);

      analyser.getFloatFrequencyData(dataArray);

      canvasCtx.fillStyle = 'rgb(0, 0, 0)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      var barWidth = (WIDTH / bufferLength) * 2.5;
      var barHeight;

      for(var i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] + 140)*2;

        canvasCtx.fillStyle = 'rgb(' + Math.floor(barHeight+100) + ',50,50)';
        canvasCtx.fillRect(barWidth * i, HEIGHT-barHeight/2,barWidth,barHeight/2);
      }
    }

    draw();
  }
});
