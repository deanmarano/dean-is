import Ember from 'ember';
import _ from 'lodash/lodash';

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
    var canvasCtx = this.get("canvasContext");

    var analyser = this.get('analyser');

    var width = this.get('width');
    var HEIGHT = this.get("height");

    canvasCtx.clearRect(0, 0, width, HEIGHT);
    // width to go by

    var data = this.get('source').buffer.getChannelData(0);
    var sampleRate = this.get('source').buffer.sampleRate;

    //canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    //canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    // 634 by 100
    //var barWidth = (WIDTH / bufferLength) * 2.5;
    //var barHeight;

    for(var i = 0; i < (data.length / sampleRate); i++) {
      var sample = data.slice(i * sampleRate, i * sampleRate + sampleRate);
      var sampleBlockSize = sampleRate / 100;
      for(var j = 0; j < 100; j++) {
        var sum = sample.slice(sampleBlockSize * j, sampleBlockSize * j + sampleBlockSize).reduce(function(a, b) {
          return a + b;
        }, 0);
        var scaledSum = (1 / sum) * 100;
        var value = scaledSum;
        canvasCtx.fillStyle = 'rgb(0,0,' + sum + ')';
        canvasCtx.fillRect(i, j, 1, 1);
      }
    }
  }
});
