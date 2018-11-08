import Route from '@ember/routing/route';
import Posts from 'dean-is/models/post';

export default Route.extend({
  model() {
    return { posts: Posts };
  }
});
