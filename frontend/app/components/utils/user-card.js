import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class UserCard extends Component {
  @tracked selected = false;

  @action
  flipSelected() {
    const userId = this.args.user.id;
    this.selected = !this.selected;
    this.args.toggleCollaborator(userId);
  }
}
