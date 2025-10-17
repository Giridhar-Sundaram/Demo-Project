import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class ProjectAttachmentController extends Controller {
  @service projectDataService;

  get projectAttachments() {
    return this.projectDataService.projectAttachments;
  }
}
