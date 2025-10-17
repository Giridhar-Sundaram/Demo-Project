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

  get isModalOpen() {
    return (
      this.projectDataService.isEditModalOpen &&
      this.args.task.id === this.projectDataService.modalOpenForTaskId
    );
  }

  @action
  openModal() {
    const taskId = this.args.task.id;
    this.projectDataService.openEditModal(taskId);
  }

  @action
  closeModal() {
    console.log('clicked');
    this.projectDataService.closeEditModal();
  }

  @action
  onDragEnd() {
    this.args.setIsDragging(false, '');
  }

  get projectKey() {
    return this.projectDataService.projectKey;
  }
}
