import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class EditTaskModal extends Component {
  @service projectDataService;
  @service taskPersistanceService;

  @tracked userComment = '';

  get task() {
    return this.projectDataService.modalOpenForTask;
  }

  get projectKey() {
    return this.projectDataService.projectKey;
  }

  get taskId() {
    return this.task.id;
  }

  get taskName() {
    return this.task.task_name;
  }

  get taskDescription() {
    return this.task.task_description;
  }

  get taskAttachments() {
    return this.task.attachments;
  }

  get taskComments() {
    return this.task.comments;
  }

  get taskAssignee() {
    return this.task.assignee;
  }

  get taskAssigneeName() {
    return this.task.assignee.user_name;
  }

  get taskAssigneeId() {
    return this.task.assignee.id;
  }

  get taskPriority() {
    return this.task.task_priority;
  }

  get taskStatus() {
    return this.task.task_status;
  }

  get taskDueDate() {
    return this.task.task_dueDate;
  }

  get getUserProfileUrl() {
    return 'https://api.dicebear.com/9.x/initials/svg?radius=50&size=24&seed=Felix';
  }

  @action
  closeModal() {
    this.projectDataService.closeEditModal();
  }

  @action
  async editTaskName(taskName) {
    try {
      this.taskPersistanceService.updateTaskName(this.taskId, taskName);
    } catch (exception) {
      console.error(exception);
    }
  }

  @action
  async editTaskDescription(taskDescription) {
    try {
      this.taskPersistanceService.updateTaskDescription(
        this.taskId,
        taskDescription,
      );
    } catch (exception) {
      console.error(exception);
    }
  }

  @action
  async editTaskStatus(taskStatus) {
    try {
      this.taskPersistanceService.updateTaskStatus(this.taskId, taskStatus);
    } catch (exception) {
      console.error(exception);
    }
  }

  @action
  async editTaskPriority(taskPriority) {
    try {
      this.taskPersistanceService.updateTaskPriority(this.taskId, taskPriority);
    } catch (exception) {
      console.error(exception);
    }
  }

  @action
  async editTaskAssignee(taskAssignee) {
    try {
      this.taskPersistanceService.updateTaskAssignee(this.taskId, taskAssignee);
    } catch (exception) {}
  }

  @action
  async editTaskDueDate(taskDueDate) {
    try {
      this.taskPersistanceService.updateTaskDueDate(this.taskId, taskDueDate);
    } catch (exception) {
      console.error(exception);
    }
  }

  @action
  async deleteTask() {
    try {
      const taskDeleted = await this.taskPersistanceService.deleteTask(
        this.taskId,
      );

      if (taskDeleted) this.closeModal();
    } catch (exception) {
      console.error(exception);
    }
  }
}
