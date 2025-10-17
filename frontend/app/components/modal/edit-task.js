import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class MyPortalComponent extends Component {
  portal = null;

  @tracked userComment = '';

  @service projectDataService;

  // constructor() {
  //   super(...arguments);

  //   this.portal = document.getElementById('portal');
  //   this.portal.style.display = 'block';
  // }

  get projectKey() {
    return this.projectDataService.projectKey;
  }

  get taskId() {
    return this.args.task.id;
  }

  get taskName() {
    return this.args.task.task_name;
  }

  get taskDescription() {
    return this.args.task.task_description;
  }

  get taskAttachments() {
    return this.args.task.attachments;
  }

  get taskComments() {
    return this.args.task.comments;
  }

  get taskAssignee() {
    return this.args.task.assignee.user_name;
  }

  get taskPriority() {
    return this.args.task.task_priority;
  }

  get getUserProfileUrl() {
    return 'https://api.dicebear.com/9.x/initials/svg?radius=50&size=24&seed=Felix';
  }

  get taskStatus() {
    return this.args.task.task_status;
  }

  get taskDueDate() {
    return this.args.task.task_dueDate;
  }

  // @action
  // stopBubbling(event) {
  //   event.stopPropagation();
  // }

  @action
  closeModa() {
    this.projectDataService.closeEditModal();
  }

  @action
  async editTaskName(taskName) {
    try {
      const taskId = this.args.task.id;
      this.projectDataService.updateTaskName(taskId, taskName);
    } catch (e) {}
  }

  @action
  async editTaskDescription(taskDescription) {
    try {
      const taskId = this.args.task.id;
      this.projectDataService.updateTaskDescription(taskId, taskDescription);
    } catch (e) {}
  }

  @action
  async deleteTask() {
    try {
      const taskId = this.args.task.id;
      const taskDeleted = await this.projectDataService.deleteTask(taskId);

      if (taskDeleted) this.args.closeModal();
    } catch (e) {}
  }

  // willDestroy() {
  //   super.willDestroy(...arguments);

  //   if (this.portal) {
  //     this.portal.style.display = 'none';
  //   }
  // }
}
