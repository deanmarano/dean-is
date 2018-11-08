import Route from '@ember/routing/route';
/* global $ */

export default Route.extend({
  model() {
    return $.get('resume.md');
  }
});
