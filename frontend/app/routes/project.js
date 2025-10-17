import Route from '@ember/routing/route';
import { service } from '@ember/service';
import {
  SAMPLE_PROJECT_DATA,
  SAMPLE_COLLABORATORS,
} from 'frontend/constants/seed';

export default class ProjectRoute extends Route {
  @service projectDataService;

  async model() {
    const { project_id } = this.paramsFor('project');

    try {
      const task = await this.projectDataService.fetchProjectTasks(project_id);
      return {
        project_id: project_id,
        collaborators: [...SAMPLE_COLLABORATORS],
        tasks: [...task],
      };
    } catch (error) {
      console.error('Error in ProjectRoute model hook:', error);
    }

    return structuredClone({ ...SAMPLE_PROJECT_DATA, projectId: project_id });
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.tasks = model.tasks;
    controller.projectId = model.projectId;
    controller.collaborators = model.collaborators;
  }
}
