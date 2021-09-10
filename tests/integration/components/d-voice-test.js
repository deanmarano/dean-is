import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('d-voice', 'Integration | Component | d voice', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{d-voice}}`);

  assert.equal(this.element.textContent.trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#d-voice}}
      template block text
    {{/d-voice}}
  `);

  assert.equal(this.element.textContent.trim(), 'template block text');
});
