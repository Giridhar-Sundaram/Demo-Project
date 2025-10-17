import { action } from '@ember/object';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { STATUS_TYPES } from 'frontend/constants/status-types';

export default class ProjectDataService extends Service {
  @service router;

  @tracked projectId = undefined;
  @tracked projectKey = '';
  @tracked projectName = '';
  @tracked projectCollaborators = [];
  @tracked projectTasks = [];
  @tracked projectAttachments = [];

  @tracked isEditModalOpen;
  @tracked modalOpenForTaskId;

  @tracked rootUrl = '';
  @tracked csrfToken = null;

  // This tracked property will hold the ID read from the URL
  @tracked activeProjectId = null;

  constructor() {
    super(...arguments);
    const tokenElement = document.querySelector('meta[name="csrf-token"]');

    if (tokenElement) {
      this.csrfToken = tokenElement.content;
      this.rootUrl = this._getRootUrl();
    }

    // 2. Listen for URL changes (transitions) and update the ID.
    this.router.on('routeDidChange', this.setActiveProjectFromUrl.bind(this));
  }

  @action
  setActiveProjectFromUrl() {
    // Get the parameters for the currently active route (e.g., project.board)
    const currentRoute = this.router.currentRoute;

    // Safely extract the project_id from the URL params
    const projectId = currentRoute.params?.project_id;

    // Update the service's state if a valid ID is found
    if (projectId && projectId !== this.activeProjectId) {
      this.activeProjectId = projectId;
      console.log(`Service updated: Active Project ID is ${projectId}`);
    }
  }

  _getRootUrl() {
    const protocol = window.location.protocol;
    const host = window.location.host;
    return protocol + '//' + host;
  }

  @action
  openEditModal(taskId) {
    console.log('Task open');
    this.isEditModalOpen = true;
    this.modalOpenForTaskId = taskId;
  }

  @action
  closeEditModal() {
    this.isEditModalOpen = false;
    this.modalOpenForTaskId = null;
  }

  @action
  setProjectDetails(projectId, projectKey, projectName) {
    this.projectId = projectId;
    this.projectKey = projectKey;
    this.projectName = projectName;
  }

  @action
  setProjectTaskAndAttachments(projectTasks, projectAttachments) {
    this.projectTasks = projectTasks;
    this.projectAttachments = projectAttachments;
  }

  @action setProjectCollaborators(collaborators) {
    this.projectCollaborators = collaborators;
  }

  async fetchProjectDetails(projectId) {
    const url = `${this.rootUrl}/projects/${projectId}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Error fetching project ${projectId}: ${response.status} ${response.statusText}`,
        );
      }

      const project = await response.json();

      this.setProjectDetails(
        project.id,
        project.project_key,
        project.project_name,
      );

      return project;
    } catch (e) {
      console.error(`Failed to fetch project details for ID ${projectId}:`, e);
      throw e;
    }
  }

  async fetchProjectCollaborators(projectId) {
    const url = `${this.rootUrl}/project_collaborators?project_id=${projectId}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Error fetching project ${projectId}: ${response.status} ${response.statusText}`,
        );
      }

      const collaborators = await response.json();

      this.setProjectCollaborators(collaborators);

      return collaborators;
    } catch (e) {
      console.error(
        `Failed to fetch project collaborators for ID ${projectId}:`,
        e,
      );
      throw e;
    }
  }

  async fetchProjectTasks(projectId) {
    const url = `${this.rootUrl}/tasks?project_id=${projectId}`;

    try {
      await this.fetchProjectDetails(projectId);
      await this.fetchProjectCollaborators(projectId);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `HTTP Error fetching tasks for project ${projectId}: ${response.status} ${response.statusText}`,
        );
      }

      const tasks = await response.json();

      const attachments = tasks
        .map((task) =>
          task.attachments.map((attachment) => ({
            ...attachment,
            taskName: task.task_name,
          })),
        )
        .flat();

      console.log(tasks);

      this.setProjectTaskAndAttachments(tasks, attachments);

      return tasks;
    } catch (e) {
      console.error(`Failed to fetch tasks for project ${projectId}:`, e);
      throw e;
    }
  }

  async updateTask(task) {
    const url = `${this.rootUrl}/tasks/${task.id}`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.csrfToken,
        },
        body: JSON.stringify({
          task: {
            ...task,
          },
        }),
      });

      if (!response.ok) {
        let errorDetails = {};
        try {
          errorDetails = await response.json();
        } catch (e) {}
        throw new Error(
          `API Update Failed (${response.status}): ${JSON.stringify(errorDetails)}`,
        );
      }
      return response.ok;
    } catch (exception) {
      console.error(exception);
      return false;
    }
  }

  async updateTaskStatus(taskId, statusType) {
    try {
      const taskIndex = this.projectTasks.findIndex(
        (task) => task.id === taskId,
      );
      const task = { ...this.projectTasks[taskIndex], task_status: statusType };
      const taskUpdated = await this.updateTask(task);
      if (taskUpdated) {
        this.projectTasks[taskIndex] = task;
        this.projectTasks = [...this.projectTasks];
      }
      return true;
    } catch (exception) {
      console.error(exception);
      return false;
    }
  }

  async updateTaskName(taskId, taskName) {
    try {
      const taskIndex = this.projectTasks.findIndex(
        (task) => task.id === taskId,
      );
      const task = { ...this.projectTasks[taskIndex], task_name: taskName };
      const taskUpdated = await this.updateTask(task);
      if (taskUpdated) {
        this.projectTasks[taskIndex] = task;
        this.projectTasks = [...this.projectTasks];
      }
      return true;
    } catch (exception) {
      console.error(exception);
      return false;
    }
  }

  async updateTaskDescription(taskId, taskDescription) {
    try {
      console.log('test');
      const taskIndex = this.projectTasks.findIndex(
        (task) => task.id === taskId,
      );
      const task = {
        ...this.projectTasks[taskIndex],
        task_description: taskDescription,
      };
      const taskUpdated = await this.updateTask(task);
      if (taskUpdated) {
        this.projectTasks[taskIndex] = task;
        this.projectTasks = [...this.projectTasks];
      }
      return true;
    } catch (exception) {
      console.error(exception);
      return false;
    }
  }

  async createNewTask(
    taskName,
    taskDueDate,
    taskPriority,
    taskStatus,
    taskAssignee,
  ) {
    try {
      const url = `${this.rootUrl}/tasks`;

      const maxIndex = this.projectCollaborators.length;
      const randomNumber = Math.floor(Math.random() * maxIndex);
      const randomAssigne = this.projectCollaborators[randomNumber].id;

      const newTask = {
        project_id: this.projectId,
        task_name: taskName,
        task_description: '',
        task_status: taskStatus,
        task_priority: taskPriority,
        task_dueDate: taskDueDate,
        task_assignedTo_id: randomAssigne,
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.csrfToken,
        },
        body: JSON.stringify({
          task: newTask,
        }),
      });

      if (!response.ok) {
        return null;
      } else {
        const task = await response.json();
        this.projectTasks = [...this.projectTasks, task];
        return task;
      }
    } catch (exception) {}
  }

  async deleteTask(taskId) {
    const url = `${this.rootUrl}/tasks/${taskId}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.csrfToken,
        },
      });
      if (!response.ok) {
        throw new Error(`Deletion Failed: HTTP Status ${response.status}`);
      }

      const filteredTask = this.projectTasks.filter(
        (task) => task.id !== taskId,
      );

      this.projectTasks = filteredTask;

      return true;
    } catch (exception) {
      console.error(`Error deleting task ${taskId}:`, exception);
      return false;
    }
  }
}
