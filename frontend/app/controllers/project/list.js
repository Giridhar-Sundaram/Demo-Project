import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class ProjectListController extends Controller {
  @service projectDataService;

  // filter state
  @tracked searchBoard = '';

  get projectKey() {
    return this.projectDataService.projectKey;
  }

  get tasks() {
    return this.projectDataService.projectTasksList;
  }
}
