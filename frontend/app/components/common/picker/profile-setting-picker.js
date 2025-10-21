// app/components/my-date-selector.js

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ProfileSettingPicker extends Component {
  @service apiService;

  @tracked open;

  @action
  flipOpen() {
    this.open = !this.open;
  }

  @action
  logout() {
    this.apiService.logout();
  }
}
