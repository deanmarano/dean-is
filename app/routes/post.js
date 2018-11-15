import Route from '@ember/routing/route';
import Posts from 'dean-is/models/post';
import $ from 'jquery';

export default Route.extend({
  model(params) {
    var metadata = Posts.findBy('url', params.url);
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
