import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | making-noise', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:making-noise');
    assert.ok(route);
  });
});
