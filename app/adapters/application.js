import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  host: "http://fusion.deanoftech.com:3000"
});
