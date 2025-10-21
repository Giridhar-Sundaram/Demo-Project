import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class ProjectSideView extends Component {
  @tracked dropdownOpen = false;

  @action
  flipDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
