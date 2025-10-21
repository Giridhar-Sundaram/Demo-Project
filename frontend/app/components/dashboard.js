import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class Dashboard extends Component {
  portal = null;

  @service projectDataService;

  get projects() {
    return this.projectDataService.allProjects;
  }
}
