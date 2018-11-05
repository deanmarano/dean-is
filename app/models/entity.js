import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  source: DS.attr('string'),
  subject: DS.attr('string'),
  message: DS.attr('string'),
  messageWithoutTags: computed('message', function() {
    if(!this.get('message')) { return ""; }
    return this.get('message').replace(/#[0-9A-Za-z]+/g, '');
  }),
  taggings: DS.hasMany('tagging'),
  tags: DS.hasMany('tag')
});
