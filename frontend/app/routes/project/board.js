import Route from '@ember/routing/route';

export default class ProjectBoardRoute extends Route {
  model() {
    return this.modelFor('project');
  }
}
