import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class BoardDraggableTask extends Component {
  @service projectDataService;

  @action
  onDragStart(event) {
    if (this.args.task && this.args.task.id) {
      event.dataTransfer.setData('text/plain', this.args.task.id);
      this.args.setIsDragging(true, this.args.statusClass);
    }
  }

  @action
  openModal() {
    this.projectDataService.openEditModal(this.args.task);
  }

  @action
  onDragEnd() {
    this.args.setIsDragging(false, '');
  }

  get projectKey() {
    return this.projectDataService.projectKey;
  }
}
