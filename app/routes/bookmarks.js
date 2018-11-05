import Route from '@ember/routing/route';

export default Route.extend({
  setupController(controller) {
    controller.set('entity', this.store.createRecord('entity'));
  },
  model() {
    return this.store.findAll('entity');
  },
  actions: {
    destroy(entity) {
      entity.destroyRecord();
    },
    createEntry() {
      let entity = this.controller.get('entity');
      entity.save().then(() => {
        this.controller.set('entity', this.store.createRecord('entity'));
      });
    }
  }
});
