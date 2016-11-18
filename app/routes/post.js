import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    var posts = [{
        filename: 'posts/gender-in-web-forms.md',
        url: 'thinking-about-gender-in-web-forms',
        titlePrefix: 'thinking about ',
        title: 'Gender in Web Forms',
        date: ' 2016-09-29'
      }];
    var metadata = posts.findBy('url', params.url);
    return $.get(metadata.filename).then((post)=> {
      var data = post.split('!--');
      return {
        titlePrefix: metadata.titlePrefix,
        title: metadata.title,
        date: metadata.date,
        metadata: data[1],
        content: data[2]
      };
    });
  }
});
