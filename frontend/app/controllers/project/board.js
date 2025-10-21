import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { STATUS_TYPES } from 'frontend/constants/status-types';

export default class ProjectBoardController extends Controller {
  @service projectDataService;
  // Dragging state
  @tracked isDragging = false;
  @tracked draggingStatusType = '';

  // These are required to make template-reactivity work
  @tracked collaborators = [];
  @tracked projectId = null;
  @tracked searchBoard = '';

  filterTaskByName(task) {
    const searchTerm = this.searchBoard.toLowerCase();
    const taskName = task.task_name.toLowerCase();

    return searchTerm === '' || taskName.includes(searchTerm);
  }

  get isModalOpen() {
    return this.projectDataService.isEditModalOpen;
  }

  get tasks() {
    return this.projectDataService.projectTasksList;
  }

  get todoStatusKey() {
    return STATUS_TYPES.TODO;
  }

  get inprogressStatusKey() {
    return STATUS_TYPES.INPROGRESS;
  }

  get doneStatusKey() {
    return STATUS_TYPES.DONE;
  }

  get isDraggingTaskStatusTodo() {
    return this.draggingStatusType === STATUS_TYPES.TODO;
  }

  get isDraggingTaskStatusInProgress() {
    return this.draggingStatusType === STATUS_TYPES.INPROGRESS;
  }

  get isDraggingTaskStatusDone() {
    return this.draggingStatusType === STATUS_TYPES.DONE;
  }

  get topFourCollaborators() {
    return this.collaborators.slice(0, 4);
  }

  get todoTasks() {
    return this.tasks
      .filter((task) => task.task_status === STATUS_TYPES.TODO)
      .filter(this.filterTaskByName.bind(this));
  }

  get inprogressTasks() {
    return this.tasks
      .filter((task) => task.task_status === STATUS_TYPES.INPROGRESS)
      .filter(this.filterTaskByName.bind(this));
  }

  get doneTasks() {
    return this.tasks
      .filter((task) => task.task_status === STATUS_TYPES.DONE)
      .filter(this.filterTaskByName.bind(this));
  }

  @action
  setIsDragging(isDragging = false, draggingStatusType = '') {
    this.isDragging = isDragging;
    this.draggingStatusType = draggingStatusType;
  }

  // properties that the outlet will set
  searchBoard = '';

  @action
  changeTaskStatus(taskId, statusType) {
    this.tasks = this.tasks.map((task) => {
      return task.id === taskId ? { ...task, task_status: statusType } : task;
    });
  }
}
