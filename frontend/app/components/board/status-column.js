import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class BoardStatusColumn extends Component {
  @service projectDataService;
  @service taskPersistanceService;

  @tracked isDragOver = false;

  @tracked addNewTask = false;

  @action
  flipAddNewTask() {
    this.addNewTask = !this.addNewTask;
  }

  @action
  handleOnDragOver(event) {
    event.preventDefault();
    this.isDragOver = true;
  }

  @action
  handleOnDragLeave(event) {
    this.isDragOver = false;
  }

  @action
  async handleOnDrop(event) {
    event.preventDefault();
    this.isDragOver = false;

    try {
      const dataTransfer = event.dataTransfer;

      const taskId = parseInt(dataTransfer.getData('text/plain'));

      this.args.setIsDragging(false, '');
      // this.args.changeTaskStatus(taskId, this.args.statusClass);

      await this.taskPersistanceService.updateTaskStatus(
        taskId,
        this.args.statusClass,
      );
    } catch (exception) {
      console.error(exception);
    }
  }
}
