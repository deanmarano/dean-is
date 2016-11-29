import Ember from 'ember';

export default Ember.Component.extend({
  audioContext: Ember.computed(function() {
    return new (window.AudioContext || window.webkitAudioContext)();
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

    ajaxRequest.open('GET', 'https://mdn.github.io/voice-change-o-matic/audio/concert-crowd.ogg', true);

    ajaxRequest.responseType = 'arraybuffer';

    ajaxRequest.onload = ()=> {
      var audioData = ajaxRequest.response;

      audioCtx.decodeAudioData(audioData, (buffer)=> {
        concertHallBuffer = buffer;
        soundSource = audioCtx.createBufferSource();
        soundSource.buffer = concertHallBuffer;
        this.set('source', soundSource);
        soundSource.start();
      }, function(e){"Error with decoding audio data" + e.err});
    }

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
  }
});
