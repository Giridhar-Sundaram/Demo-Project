import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class CreateNewPicker extends Component {
  @tracked center = new Date();
  @tracked open = false;

  @action
  onCenterChange(selected) {
    this.center = selected.date;
  }

  @action
  selected(createNew) {
    this.args.onSelection(createNew);
    this.flipOpen();
  }

  @action
  flipOpen() {
    this.open = !this.open;
  }
}
