import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class ProjectAttachmentController extends Controller {
  @service projectDataService;

  get projectAttachmentsList() {
    return this.projectDataService.projectAttachmentsList;
  }
}
