import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller) {
    controller.set('entity', this.store.createRecord('entity'));
  },
  model() {
    return this.store.findAll('entity');
  },
  actions: {
    createEntry() {
      let entity = this.controller.get('entity');
      return entity.save();
    }
  }
});
