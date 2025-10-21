import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { STATUS_TYPES } from 'frontend/constants/status-types';
import { PRIORITY_TYPES } from 'frontend/constants/priority-types';

export default class NewTaskModal extends Component {
  @service projectDataService;
  @service taskPersistanceService;
  @service userDetailService;
  @service apiService;
  @service router;

  @tracked projectId = null;

  @tracked selectedTaskAssignee = null;

  @tracked taskName = '';
  @tracked taskDescription = '';
  @tracked taskStatus = STATUS_TYPES.TODO;
  @tracked taskDueDate = new Date();
  @tracked taskPriority = PRIORITY_TYPES.MEDIUM;

  get isUnderProjectRoute() {
    return this.router.currentRouteName.startsWith('project.');
  }

  get selectedProject() {
    return this.projectDataService.allProjects.find(
      (project) => project.id === this.selectedProjectId,
    );
  }

  get taskAssignee() {
    console.log(this.selectedProject.collaborations);
    if (this.selectedTaskAssignee) return this.selectedTaskAssignee;
    return this.selectedProject.collaborations[0];
  }

  get selectedProjectId() {
    if (!this.isUnderProjectRoute && !this.projectId) {
      return 1;
    }
    if (!this.projectId) {
      return this.projectDataService.projectId;
    }
    return this.projectId;
  }

  get isValidTask() {
    if (!this.taskName) return false;
    if (!this.taskDueDate) return false;
    if (!this.taskDescription) return false;
    if (!this.selectedProjectId) return false;
    return true;
  }

  @action
  selectProject(project) {
    this.projectId = project.id;
  }

  @action
  selectAssignee(taskAssignee) {
    this.selectedTaskAssignee = taskAssignee;
  }

  @action
  selectTaskStatus(taskStatus) {
    this.taskStatus = taskStatus;
  }

  @action
  selectTaskDueDate(taskDueDate) {
    this.taskDueDate = taskDueDate.id;
  }

  @action
  selectTaskPriority(taskPriority) {
    this.taskPriority = taskPriority;
  }

  @action
  changeTaskName(event) {
    this.taskName = event.target.value;
  }

  @action
  changeTaskDescription(event) {
    this.taskDescription = event.target.value;
  }

  @action
  async createTask() {
    if (!this.isValidTask) return false;
    const task = {
      projectId: this.selectedProjectId,
      taskName: this.taskName,
      taskDescription: this.taskDescription,
      taskStatus: this.taskStatus,
      taskPriority: this.taskPriority,
      taskDueDate: this.taskDueDate,
      taskAssignedToId: this.taskAssignee.id,
    };

    await this.taskPersistanceService.createTask(task);
    this.closeModal();
  }

  @action
  closeModal() {
    this.projectDataService.closeCreateTaskModal();
  }
}
