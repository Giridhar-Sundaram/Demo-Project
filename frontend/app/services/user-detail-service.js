import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class ApiService extends Service {
  @service apiService;

  @tracked currentUser = null;
  @tracked userList = [];

  async fetchCurrentUserDetails() {
    try {
      const user = await this.apiService.get('api/users/current');
      this.currentUser = user;
    } catch (exception) {
      console.error(exception);
    }
  }

  async fetchUserList() {
    try {
      const users = await this.apiService.get('api/users');
      this.userList = users;
    } catch (exception) {
      console.error(exception);
    }
  }
}
