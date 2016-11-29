import Ember from 'ember';
import Month from './month';
/* global moment */

export default Ember.Object.extend({
  maxYears: 90,
  lifeExpectancy: 76,
  percentComplete: Ember.computed('lifeExpectancy', 'age', function() {
    return this.get('age') / this.get('lifeExpectancy') * 100;
  }),
  percentRemaining: Ember.computed('percentComplete', function() {
    return 100 - this.get('percentComplete');
  }),
  yearsComplete: Ember.computed('birthdate', function() {
    return moment().diff(this.get('birthdate'), 'years');
  }),
  yearsRemaining: Ember.computed('deathdate', function() {
    return this.get('deathdate').diff(moment(), 'years');
  }),
  monthsComplete: Ember.computed('birthdate', function() {
    return moment().diff(this.get('birthdate'), 'months');
  }),
  monthsRemaining: Ember.computed('birthdate', function() {
    return this.get('deathdate').diff(moment(), 'months');
  }),
  daysComplete: Ember.computed('birthdate', function() {
    return moment().diff(this.get('birthdate'), 'days');
  }),
  daysRemaining: Ember.computed('birthdate', function() {
    return this.get('deathdate').diff(moment(), 'days');
  }),
  age: Ember.computed('birthdate', function() {
    return moment().diff(this.get('birthdate'), 'years');
  }),
  firstYear: Ember.computed('birthdate', function() {
    return this.get('birthdate').clone().year();
  }),

  deathdate: Ember.computed('birthdate', 'lifeExpectancy', function() {
    return moment(this.get('birthdate')).add(this.get('lifeExpectancy'), 'years');
  }),

  years: Ember.computed('events', function() {
    var firstYear = this.get('firstYear');
    var years = [];
    for(let i = 0; i < this.get('maxYears'); i++) {
      let year = firstYear + i;
      let label;
      if(year === firstYear || year % 10 === 0 || year === moment().year()) {
        label = year;
      }
      years[i] = {year: firstYear + i, months: [], label: label};
      for(let month = 0; month < 12; month++) {
        years[i].months.push(this.createMonth(month, year, firstYear, this));
      }
    }
    return years;
  }),

  createMonth(month, year, firstYear, life) {
    let events = life.events.filter(e => e.date.month() === month && e.date.year() === year);
    let monthObj = Month.create({month: month, year: year, life: life, events: events});
    let birthdate = this.get('birthdate');
    let importantBirthdays = [5, 10, 16, 18, 21, 25, 30, 40, 50, 60, 70, 76];
    if(monthObj.get('month') === birthdate.month() && importantBirthdays.indexOf(year - firstYear) != -1) {
      monthObj.events.push({
        date: moment(`${year}-${month + 1}-${birthdate.date()}`),
        type: 'life',
        text: `${this.get('name')}'s ${year - firstYear} birthday`
      });
    }
    return monthObj;
  },
});
