import Component from '@ember/component';
import { computed } from '@ember/object';

// adapted from https://github.com/mdn/voice-change-o-matic-float-data
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API
export default Component.extend({
  audioContext: computed(function() {
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

    ajaxRequest.open('GET', 'https://mdn.github.io/voice-change-o-matic/audio/concert-crowd.ogg', true);

    ajaxRequest.responseType = 'arraybuffer';

    ajaxRequest.onload = ()=> {
      var audioData = ajaxRequest.response;

      audioCtx.decodeAudioData(audioData, (buffer)=> {
        concertHallBuffer = buffer;
        soundSource = audioCtx.createBufferSource();
        soundSource.buffer = concertHallBuffer;
        //this.set('source', soundSource);
        soundSource.start();
      }, function(e){
        window.alert("Error with decoding audio data" + e.err);
      });
    };

    ajaxRequest.send();

    //main block for doing the audio recording

    if (navigator.getUserMedia) {
      navigator.getUserMedia (
        { audio: true },
        (stream)=> {
          this.set('source', audioCtx.createMediaStreamSource(stream));
        },
        function(err) {
          window.alert('The following gUM error occured: ' + err);
        }
      );
    } else {
      window.alert('getUserMedia not supported on your browser!');
    }
  }
});
