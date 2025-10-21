import { action } from '@ember/object';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { STATUS_TYPES } from 'frontend/constants/status-types';

export default class ProjectDataService extends Service {
  @service apiService;
  @service userDetailService;

  @tracked allProjects = [];
  @tracked projectId = undefined;
  @tracked projectKey = '';
  @tracked projectName = '';
  @tracked projectCollaboratorsList = [];
  @tracked projectTasksList = [];
  @tracked projectAttachmentsList = [];

  @tracked isEditModalOpen = false;
  @tracked modalOpenForTask = null;
  @tracked isCreateTaskModalOpen = false;

  @tracked isCreateProjectModalOpen = false;
  @tracked isCreateTaskModalOpen = false;

  @action
  openEditModal(task) {
    this.isEditModalOpen = true;
    this.modalOpenForTask = task;
  }

  @action
  closeEditModal() {
    this.isEditModalOpen = false;
    this.modalOpenForTask = null;
  }

  @action
  openCreateTaskModal() {
    this.isCreateTaskModalOpen = true;
  }

  @action
  closeCreateTaskModal() {
    this.isCreateTaskModalOpen = false;
  }

  @action
  openCreateProjectModal() {
    this.isCreateProjectModalOpen = true;
  }

  @action
  closeCreateProjectModal() {
    this.isCreateProjectModalOpen = false;
  }

  @action
  setProjectDetails(projectId, projectKey, projectName) {
    this.projectId = projectId;
    this.projectKey = projectKey;
    this.projectName = projectName;
  }

  @action
  setProjectTaskList(taskList) {
    this.projectTasksList = taskList;
  }

  @action
  setProjectAttachmentsList(attachmentsList) {
    this.projectAttachmentsList = attachmentsList;
  }

  @action
  setProjectCollaboratorsList(collaborators) {
    this.projectCollaboratorsList = collaborators;
  }

  @action
  syncProjectTasks(updatedTask, taskIndex) {
    const deepClondeUpdatedTask = JSON.parse(JSON.stringify(updatedTask));
    this.projectTasksList[taskIndex] = deepClondeUpdatedTask;
    this.projectTasksList = [...this.projectTasksList];
    if (this.isEditModalOpen) this.modalOpenForTask = deepClondeUpdatedTask;
  }

  @action
  removeTaskFromList(taskId) {
    const filteredTask = this.projectTasksList.filter(
      (task) => task.id !== taskId,
    );

    this.projectTasksList = filteredTask;
  }

  async createProject(projectName, projectKey, projectCollaborators) {
    try {
      const body = {
        project: {
          project_name: projectName,
          project_key: projectKey,
          project_owner_id: this.userDetailService.currentUser.id,
          collaborations_attributes: [...projectCollaborators],
        },
      };

      const created = await this.apiService.post('projects', body);
      if (created) return this.fetchInformationAboutAllProjects();
    } catch (e) {
      console.error(`Failed to create project `, e);
    }
  }

  async fetchInformationAboutAllProjects() {
    try {
      const projects = await this.apiService.get('projects');

      this.allProjects = projects;

      console.log(projects);
      return projects;
    } catch (e) {
      console.error(`Failed to fetch project details for ID ${projectId}:`, e);
      return false;
    }
  }

  async fetchProjectDetails(projectId) {
    try {
      const project = await this.apiService.get(`projects/${projectId}`);

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

  async fetchprojectCollaboratorsList(projectId) {
    try {
      const collaborators = await this.apiService.get(
        `project_collaborators?project_id=${projectId}`,
      );

      this.setProjectCollaboratorsList(collaborators);

      return collaborators;
    } catch (e) {
      console.error(
        `Failed to fetch project collaborators for ID ${projectId}:`,
        e,
      );
      throw e;
    }
  }
}
