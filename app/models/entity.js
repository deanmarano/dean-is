import DS from 'ember-data';

export default DS.Model.extend({
  source: DS.attr('string'),
  subject: DS.attr('string'),
  message: DS.attr('string'),
  taggings: DS.hasMany('tagging'),
  tags: DS.hasMany('tag')
});