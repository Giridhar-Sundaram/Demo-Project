import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service router;
  @service projectDataService;
  @service userDetailService;

  async beforeModel() {
    await this.userDetailService.fetchCurrentUserDetails();
    await this.projectDataService.fetchInformationAboutAllProjects();
    // this.router.replaceWith('project.board', 1);
  }
}
