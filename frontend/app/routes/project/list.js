import Route from '@ember/routing/route';
import { SAMPLE_PROJECT_DATA } from 'frontend/constants/seed';

export default class ProjectListRoute extends Route {
  async model() {
    return this.modelFor('project');
  }
}
