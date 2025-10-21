import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { STATUS_VALUES } from 'frontend/constants/status-types';

export default class ProjectPicker extends Component {
  @service projectDataService;

  @tracked open;

  get visibleProjectList() {
    return this.projectDataService.allProjects.filter(
      (project) => project.id !== this.args.selectedProjectId,
    );
  }

  @action
  flipOpen() {
    this.open = !this.open;
  }

  @action
  selectProject(project) {
    this.args.onSelectionOfProject(project);
    this.flipOpen();
  }
}
