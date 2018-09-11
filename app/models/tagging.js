import DS from 'ember-data';

export default DS.Model.extend({
  tag: DS.belongsTo('tag'),
  entity: DS.belongsTo('entity')
});
