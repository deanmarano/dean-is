import DS from 'ember-data';
import Ember from 'ember';
/* global moment */

const { attr, belongsTo } = DS;

export default Ember.Object.extend({
  date: Ember.computed('month', 'year', function() {
    var month = this.get('month') + 1;
    var paddedMonth = month < 10 ? '0' + month : month;
    return moment(`${this.get('year')}-${paddedMonth}-01`);
  }),
  number: Ember.computed('month', function() {
    this.get('month') - 1;
  }),
  hasEvent: Ember.computed.gt('events.length', 0),
  beforeLife: Ember.computed('date', 'life.birthdate', function() {
    return this.get('date').diff(this.get('life.birthdate'), 'months') < 0;
  }),
  past: Ember.computed('date', function() {
    return this.get("date").diff(moment()) < 0;
  }),
  future: Ember.computed('past', function() {
    return !this.get("past");
  }),
  afterDeath: Ember.computed('date', 'life.deathdate', function() {
    return this.get('date').diff(this.get('life.deathdate'), 'months') >= 0;
  }),
  classes: Ember.computed('hasEvent', 'before-life', 'past', 'afterDeath', function() {
    return ['hasEvent', 'beforeLife', 'past', 'afterDeath', 'future'].
      map(c => this.get(c) ? c.dasherize() : null).
      compact().
      concat(this.get('events').mapBy('type')).
      join(' ');
  })
});
