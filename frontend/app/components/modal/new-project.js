import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class NewProjectModal extends Component {
  @service projectDataService;
  @service taskPersistanceService;
  @service userDetailService;
  @service apiService;

  @tracked projectName = '';
  @tracked projectKey = '';
  @tracked selectedUsers = new Set();

  constructor() {
    super(...arguments);

    this.userDetailService.fetchUserList();
  }

  get userList() {
    return this.userDetailService.userList;
  }

  @action
  toggleCollaborator(userId) {
    if (this.selectedUsers.has(userId)) this.selectedUsers.delete(userId);
    else this.selectedUsers.add(userId);

    this.selectedUsers = new Set(this.selectedUsers);
  }

  @action
  setProjectName(event) {
    this.projectName = event.target.value;
  }

  @action
  setProjectKey(event) {
    const value = event.target.value;
    if (value.length > 2) {
      event.target.value = this.projectKey;
      return;
    }
    this.projectKey = value.toUpperCase();
  }

  @action
  async createNewProject() {
    try {
      if (!this.projectName || !this.projectKey || !this.selectedUsers.size)
        return;
      const collaborators = [...this.selectedUsers].map((id) => ({
        user_id: id,
      }));

      const createdProject = await this.projectDataService.createProject(
        this.projectName,
        this.projectKey,
        collaborators,
      );
      if (createdProject) return this.closeModal();
    } catch (e) {
      console.error(e);
    }
  }

  @action
  closeModal() {
    return this.projectDataService.closeCreateProjectModal();
  }
}
