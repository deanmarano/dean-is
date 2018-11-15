import Component from '@ember/component';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  didInsertElement() {
    var audioContext = new AudioContext();
    var oscNode = audioContext.createOscillator();
    oscNode.frequency.value = 440;
    oscNode.detune.value = 0;
    oscNode.type = 'sine';
    oscNode.start(0);

    audioContext.suspend();
    $(function() {
      $('#lower').on('click', function() {
        oscNode.frequency.value -= 10;
      });

      $('#higher').on('click', function() { oscNode.frequency.value += 10;});

      $('#pause').on('click', function() { audioContext.suspend();});

      $('#play').on('click', function() { audioContext.resume();});

      $('form').on('change', function(e) {
        // var tenthRoot = Math.pow(2, 1/10);
        var notes = {
          'a4': 440.000,
          'a#4': 466.164,
          'b4': 493.883,
          'c5': 523.251,
          'c#5': 554.365,
          'd5': 587.330,
          'd#5': 622.254,
          'e5': 659.255,
          'f5': 698.456,
          'f#5': 739.989,
          'g5': 783.991,
          'g#5': 830.609,
          'a5': 880.000,
          '0': 440.000,
          '1': Math.pow(2, 1/10) * 440,
          '2': Math.pow(2, 2/10) * 440,
          '3': Math.pow(2, 3/10) * 440,
          '4': Math.pow(2, 4/10) * 440,
          '5': Math.pow(2, 5/10) * 440,
          '6': Math.pow(2, 6/10) * 440,
          '7': Math.pow(2, 7/10) * 440,
          '8': Math.pow(2, 8/10) * 440,
          '9': Math.pow(2, 9/10) * 440,
          '10':Math.pow(2, 10/10) * 440
        };
        oscNode.frequency.value = notes[e.target.value];
      });
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      /* navigator.getUserMedia(
      {
        "audio": {
          "mandatory": {
            "googEchoCancellation": "false",
            "googAutoGainControl": "false",
            "googNoiseSuppression": "false",
            "googHighpassFilter": "false"
          },
          "optional": []
        },
      }, function gotStream(stream) {
        liveNode = audioContext.createMediaStreamSource(stream);
      // oscNode.connect(analyser);
      // liveNode.connect(analyser);
      // analyser.connect(audioContext.destination);
      }, function() { console.log('err');} ); */
      var analyser = audioContext.createAnalyser();

      analyser.fftSize = 2048;
      var bufferLength = analyser.frequencyBinCount;
      var dataArray = new Uint8Array(bufferLength);
      analyser.getByteTimeDomainData(dataArray);


      // draw an oscilloscope of the current audio source
      var canvas = document.getElementById('my-canvas');
      var canvasCtx = canvas.getContext('2d');

      var WIDTH = 500, HEIGHT = 500;
      var draw = function draw() {

        requestAnimationFrame(draw);

        analyser.getByteTimeDomainData(dataArray);

        canvasCtx.fillStyle = 'rgb(200, 200, 200)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

        canvasCtx.beginPath();

        var sliceWidth = WIDTH * 1.0 / bufferLength;
        var x = 0;

        for(var i = 0; i < bufferLength; i++) {

          var v = dataArray[i] / 128.0;
          var y = v * HEIGHT/2;

          if(i === 0) {
            canvasCtx.moveTo(x, y);
          } else {
            canvasCtx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        canvasCtx.lineTo(canvas.width, canvas.height/2);
        canvasCtx.stroke();
      };

      draw();

      var glassRequest = new XMLHttpRequest();
      glassRequest.open("GET", "becky.mp3", true);
      glassRequest.responseType = "arraybuffer";
      glassRequest.onload = function() {
        audioContext.decodeAudioData( glassRequest.response, function(buffer) {

          var audioNode = audioContext.createBufferSource();
          audioNode.buffer = buffer;
          audioNode.start();
          // audioNode.connect(analyser);
          // analyser.connect(audioContext.destination);
          oscNode.connect(analyser);
          analyser.connect(audioContext.destination);
        } );
      }
      glassRequest.send();
    });
  }
});
