import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  currentlySelectedCell: null,
  actions: {
    select(cell) {
      if(this.currentlySelectedCell) {
        this.set('currentlySelectedCell.selected', false);
      }
      if(this.get('currentlySelectedCell.value') === cell.value) {
        this.set('currentlySelectedCell', null);
      } else {
        this.set('currentlySelectedCell', cell);
        this.set('currentlySelectedCell.selected', true);
      }
    },

    selectNumber(number) {
      if(!this.currentlySelectedCell) {
        return;
      }

      let hints = this.currentlySelectedCell.hints;
      if(this.currentlySelectedCell.guess) {
        hints.addObject(this.currentlySelectedCell.guess);
      }

      if(hints.includes(number)) {
        this.set('currentlySelectedCell.hints', hints.removeObject(number));
      } else {
        this.set('currentlySelectedCell.hints', hints.addObject(number));
      }
      if(hints.length === 1) {
        this.set('currentlySelectedCell.guess', hints[0]);
        this.set('currentlySelectedCell.hints', []);
      } else {
        this.set('currentlySelectedCell.guess', null);
      }
      console.log(`guess: ${this.currentlySelectedCell.guess} hints: ${JSON.stringify(this.currentlySelectedCell.hints)}`);
    }
  }
});
