import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | sudoku', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:sudoku');
    assert.ok(controller);
  });
});
