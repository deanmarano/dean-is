import Ember from 'ember';
import Posts from 'dean-is/models/post';

export default Ember.Route.extend({
  model() {
    return { posts: Posts };
  }
});
