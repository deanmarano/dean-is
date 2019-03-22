import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home', {path: ''});
  this.route('about', {path: 'pretty-cool'});
  this.route('resume', {path: 'working'});

  // Projects
  this.route('life-calendar', {path: 'living-life'});
  this.route('eye-color', {path: 'looking-at-eyes'});
  this.route('voice', {path: 'hearing-voices'});
  this.route('listening', {path: 'listen'});
  this.route('sudoku', {path: 'playing-sudoku'});
  this.route('bookmarks', {path: 'bookmarking'}, function() {
    this.route('tags', {path: 'tags/:name'});
  });

  // Posts
  this.route('post', {path: ':url'});
  this.route('making-noise');
});

export default Router;
