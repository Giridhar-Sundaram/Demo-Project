// app/components/my-date-selector.js

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { PRIORITY_VALUES } from 'frontend/constants/priority-types';

export default class CommonProrityPicker extends Component {
  @tracked priority;
  @tracked open;

  get pickerIcon() {
    return '/assets/icons/task-priority-' + this.args.selectedPriority + '.svg';
  }

  get visiblePriorityList() {
    return PRIORITY_VALUES.filter(
      (priority) => priority !== this.args.selectedPriority,
    );
  }

  @action
  flipOpen() {
    this.open = !this.open;
  }

  @action
  selectPriority(priority) {
    this.args.onSelectionOfPriority(priority);
    this.flipOpen();
  }
}
