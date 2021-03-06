import { gt } from '@ember/object/computed';
import EmberObject, { computed } from '@ember/object';
/* global moment */

export default EmberObject.extend({
  date: computed('month', 'year', function() {
    var month = this.get('month') + 1;
    var paddedMonth = month < 10 ? '0' + month : month;
    return moment(`${this.get('year')}-${paddedMonth}-01`);
  }),
  number: computed('month', function() {
    this.get('month') - 1;
  }),
  hasEvent: gt('events.length', 0),
  beforeLife: computed('date', 'life.birthdate', function() {
    return this.get('date').diff(this.get('life.birthdate'), 'months') < 0;
  }),
  past: computed('date', function() {
    return this.get("date").diff(moment()) < 0;
  }),
  future: computed('past', function() {
    return !this.get("past");
  }),
  afterDeath: computed('date', 'life.deathdate', function() {
    return this.get('date').diff(this.get('life.deathdate'), 'months') >= 0;
  }),
  classes: computed('hasEvent', 'before-life', 'past', 'afterDeath', function() {
    return ['hasEvent', 'beforeLife', 'past', 'afterDeath', 'future'].
      map(c => this.get(c) ? c.dasherize() : null).
      compact().
      concat(this.get('events').mapBy('type')).
      join(' ');
  })
});
