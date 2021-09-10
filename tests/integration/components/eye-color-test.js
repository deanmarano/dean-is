import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('eye-color', 'Integration | Component | eye color', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{eye-color}}`);

  assert.equal(this.element.textContent.trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#eye-color}}
      template block text
    {{/eye-color}}
  `);

  assert.equal(this.element.textContent.trim(), 'template block text');
});
