import Ember from 'ember';

export default Ember.Component.extend({
  analyser: Ember.computed('audioContext', 'source', function() {
    var analyser = this.get('audioContext').createAnalyser();
    this.get('source').connect(analyser);
    analyser.minDecibels = -90;
    analyser.maxDecibels = -10;
    analyser.smoothingTimeConstant = 0.85;
    analyser.fftSize = 1024;
    return analyser;
  }),

  width: Ember.computed('canvas', function() {
    return this.get("canvas").width;
  }),
  height: Ember.computed('canvas', function() {
    return this.get("canvas").height;
  }),
  canvasContext: Ember.computed('canvas', function() {
    return this.get('canvas').getContext('2d');
  }),

  didInsertElement() {
    var canvas = this.$('.sinewave-visualizer')[0];
    var intendedWidth = document.querySelector('.wrapper').clientWidth;
    canvas.setAttribute('width', intendedWidth);
    this.set('canvas', canvas);
    this.setupCanvas();
  },

  setupCanvas() {
    var sinewaveCanvasCtx = this.get("canvasContext");

    var analyser = this.get('analyser');

    var width = this.get('width');
    var HEIGHT = this.get("height");

    var bufferLength = analyser.fftSize;
    var dataArray = new Float32Array(bufferLength);

    sinewaveCanvasCtx.clearRect(0, 0, width, HEIGHT);

    function drawSinewave() {
      requestAnimationFrame(drawSinewave);

      analyser.getFloatTimeDomainData(dataArray);

      sinewaveCanvasCtx.fillStyle = 'rgb(200, 200, 200)';
      sinewaveCanvasCtx.fillRect(0, 0, width, HEIGHT);

      sinewaveCanvasCtx.lineWidth = 2;
      sinewaveCanvasCtx.strokeStyle = 'rgb(0, 0, 0)';

      sinewaveCanvasCtx.beginPath();

      var sliceWidth = width / bufferLength;

      sinewaveCanvasCtx.moveTo(0, y);
      for(var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] * 200.0;
        var y = HEIGHT/2 + v;
        sinewaveCanvasCtx.lineTo(i * sliceWidth, y);
      }
      sinewaveCanvasCtx.stroke();
    };

    drawSinewave();
  }
});
