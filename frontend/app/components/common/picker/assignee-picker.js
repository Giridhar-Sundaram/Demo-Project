import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class AssigneePicker extends Component {
  @service projectDataService;

  @tracked center = new Date();
  @tracked open = false;

  get taskCollaborators() {
    return this.projectDataService.projectCollaboratorsList;
  }

  get visibleAssignee() {
    return this.taskCollaborators.filter(
      (collaborators) => collaborators.id !== this.args.selectedAssignee.id,
    );
  }

  @action
  selectAssignee(assignee) {
    this.args.onSelectionOfAssignee(assignee);
    this.flipOpen();
  }

  @action
  flipOpen() {
    this.open = !this.open;
  }
}
