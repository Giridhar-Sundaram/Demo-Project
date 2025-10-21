// app/components/my-date-selector.js

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { STATUS_VALUES } from 'frontend/constants/status-types';

export default class StatusPicker extends Component {
  @tracked priority;
  @tracked open;

  get visibleStatusList() {
    return STATUS_VALUES.filter(
      (priority) => priority !== this.args.selectedPriority,
    );
  }

  @action
  flipOpen() {
    this.open = !this.open;
  }

  @action
  selectStatus(status) {
    this.args.onSelectionOfStatus(status);
    this.flipOpen();
  }
}
