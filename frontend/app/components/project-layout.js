// app/controllers/project.js (or project route if you prefer)

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ProjectLayout extends Component {
  @tracked searchBoard = '';

  @action
  handleSearchInput(event) {
    this.searchBoard = event.target.value;
  }

  @action
  clearSearchInput() {
    this.searchBoard = '';
  }
}
