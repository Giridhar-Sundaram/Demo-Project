import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ProjectRoute extends Route {
  @service projectDataService;
  @service taskPersistanceService;
  @service userDetailService;

  async model() {
    const { project_id } = this.paramsFor('project');

    try {
      await this.userDetailService.fetchCurrentUserDetails();
      await this.taskPersistanceService.fetchprojectTasksList(project_id);
    } catch (error) {
      console.error('Error in ProjectRoute model hook:', error);
    }
  }
}
