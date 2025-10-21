import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @service projectDataService;
  @service userDetailService;
  @tracked openModal = null;

  get currentUserName() {
    return this.userDetailService.currentUser.user_name;
  }

  get isCreateProjectModalOpen() {
    return this.projectDataService.isCreateProjectModalOpen;
  }

  get isCreateTaskModalOpen() {
    return this.projectDataService.isCreateTaskModalOpen;
  }

  @action
  setOpenModal(modal) {
    if (modal === 'project') {
      return this.projectDataService.openCreateProjectModal();
    }
    if (modal === 'task') {
      return this.projectDataService.openCreateTaskModal();
    }
    this.openModal = modal;
  }
}
