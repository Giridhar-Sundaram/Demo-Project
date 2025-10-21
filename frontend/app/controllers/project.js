import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ProjectController extends Controller {
  @service projectDataService;

  @tracked openedDropdown = null;

  get projects() {
    return this.projectDataService.allProjects || [];
  }

  @action
  openCreateProjectModal() {
    this.projectDataService.openCreateProjectModal();
  }
}
