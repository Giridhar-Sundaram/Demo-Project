import Route from '@ember/routing/route';
import { SAMPLE_PROJECT_DATA } from 'frontend/constants/seed';

export default class ProjectListRoute extends Route {
  async model() {
    return this.modelFor('project');
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.tasks = model.tasks;
    controller.projectId = model.projectId;
    controller.collaborators = model.collaborators;
  }
}
