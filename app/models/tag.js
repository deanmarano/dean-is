import DS from 'ember-data';

export default DS.Model.extend({
  taggings: DS.hasMany('tagging'),
  entities: DS.hasMany('entity'),
  name: DS.attr('string')
});
