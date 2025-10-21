import Route from '@ember/routing/route';
import { SAMPLE_ATTACHMENTS } from 'frontend/constants/seed';

export default class ProjectAttachmentRoute extends Route {
  model() {
    return this.modelFor('project');
  }
}
