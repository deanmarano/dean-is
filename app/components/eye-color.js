import Component from '@ember/component';
/* global CannyJS, webgazer, clearphoto */

export default Component.extend({
  actions: {
    start() {
      navigator.getUserMedia({video: true}, (stream)=> {
        this.set('started', true);
        var video = this.$('video')[0];
        video.src = URL.createObjectURL(stream);
        video.play();
        webgazer.start();

      }, (err)=> {
        this.set('error', err);
      });
    },
    takePicture() {
     var canvas1 = this.$('.canvas-1')[0];
     var canvas2 = this.$('.canvas-2')[0];
     var canvas3 = this.$('.canvas-3')[0];
     var video = this.$('video')[0];
     var context1 = canvas1.getContext('2d');
     var context2 = canvas2.getContext('2d');
     var context3 = canvas3.getContext('2d');
     var width = 320;
     var height = width / (4/3);

     if (width && height) {
       canvas1.width = width;
       canvas1.height = height;
       context1.drawImage(video, 0, 0, width, height);
       context2.drawImage(video, 0, 0, width / 2, height / 2);
       context3.drawImage(video, 0, 0, width / 2, height / 2);
       var image = CannyJS.canny(canvas3);
       image.drawOn(canvas3);
     } else {
       clearphoto();
     }
   }
  }
});
