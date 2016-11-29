import Ember from 'ember';

// adapted from https://github.com/mdn/voice-change-o-matic-float-data
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API
export default Ember.Component.extend({
  audioContext: Ember.computed(function() {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    return new AudioContext();
  }),
  didInsertElement() {
    // fork getUserMedia for multiple browser versions, for those
    // that need prefixes

    navigator.getUserMedia = (navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);

    //set up the different audio nodes we will use for the app

    var audioCtx = this.get('audioContext');

    var soundSource, concertHallBuffer;

    var ajaxRequest = new XMLHttpRequest();

    ajaxRequest.open('GET', '/anna-karenina-002.mp3', true);

    ajaxRequest.responseType = 'arraybuffer';

    ajaxRequest.onload = ()=> {
      var audioData = ajaxRequest.response;

      audioCtx.decodeAudioData(audioData, (buffer)=> {
        concertHallBuffer = buffer;
        soundSource = audioCtx.createBufferSource();
        soundSource.buffer = concertHallBuffer;
        this.setProperties({
          source: soundSource,
          playing: true
        });
        //soundSource.connect(audioCtx.destination);
        soundSource.start();
      }, function(e){
        console.log("Error with decoding audio data" + e.err);
      });
    };

    ajaxRequest.send();

    //main block for doing the audio recording

    if (navigator.getUserMedia) {
      console.log('getUserMedia supported.');
      navigator.getUserMedia (
        { audio: true },
        (stream)=> {
          //this.set('source', audioCtx.createMediaStreamSource(stream));
        },
        function(err) {
          console.log('The following gUM error occured: ' + err);
        }
      );
    } else {
      console.log('getUserMedia not supported on your browser!');
    }
  },
  actions: {
    togglePlayback() {
      var context = this.get('audioContext');
      if(context.state === 'running') {
        context.suspend();
      } else {
        context.resume();
      }
    }
  }
});
