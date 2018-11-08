import { set } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  actions: {
    expandMonth(year, month) {
      this.get('life.years').forEach(year => set(year, 'currentMonth', null));
      set(year, 'currentMonth', month);
    }
  }
});
