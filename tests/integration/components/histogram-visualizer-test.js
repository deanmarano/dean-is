import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('histogram-visualizer', 'Integration | Component | histogram visualizer', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{histogram-visualizer}}`);

  assert.equal(this.element.textContent.trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#histogram-visualizer}}
      template block text
    {{/histogram-visualizer}}
  `);

  assert.equal(this.element.textContent.trim(), 'template block text');
});
