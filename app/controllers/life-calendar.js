import { lt } from '@ember/object/computed';
import { computed } from '@ember/object';
import Controller from '@ember/controller';

var myAge = '29';

export default Controller.extend({
  parentsAge: computed("date", function() {
    if(this.get('date')) {
      var date = new Date(this.get('date'));
      return date.getFullYear() - 1960;
    }
  }),
  parentsNotBorn: lt('parentsAge', 0),
  grandparentsNotBorn: lt('grandparentsAge', 0),
  parentsAgeDiff: computed("parentsAge", function() {
    var parentsAge = this.get('parentsAge');
    if(parentsAge < myAge) {
      return `${myAge - parentsAge} younger than me.`
    } else if(parentsAge > myAge) {
      return `${parentsAge - myAge} older than me.`
    } else {
      return 'were my age.';
    }
  }),
  grandparentsAge: computed("date", function() {
    if(this.get('date')) {
      return new Date(this.get('date')).getFullYear() - 1927;
    }
  }),
  grandparentsAgeDiff: computed("grandparentsAge", function() {
    var grandparentsAge = this.get('grandparentsAge');
    if(grandparentsAge < myAge) {
      return `${myAge - grandparentsAge} younger than me.`
    } else if(grandparentsAge > myAge) {
      return `${grandparentsAge - myAge} older than me.`
    } else {
      return 'were my age.';
    }
  }),
});
