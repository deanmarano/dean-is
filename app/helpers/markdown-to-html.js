import Ember from 'ember';
/* global marked */

export function markdownToHtml(params/*, hash*/) {
  return Ember.String.htmlSafe(marked(params[0]));
}

export default Ember.Helper.helper(markdownToHtml);
