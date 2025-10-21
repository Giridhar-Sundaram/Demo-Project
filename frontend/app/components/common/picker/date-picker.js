// app/components/my-date-selector.js

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class CommonDatePicker extends Component {
  @tracked center = new Date();
  @tracked open = false;

  @action
  onCenterChange(selected) {
    this.center = selected.date;
  }

  @action
  onSelectionOfDate(selection) {
    this.args.onSelectionOfDate(selection);
    this.selectedDate = selection.date;
    this.flipOpen();
  }

  @action
  flipOpen() {
    this.open = !this.open;
  }
}
