import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { PRIORITY_TYPES } from 'frontend/constants/priority-types';

export default class BoardNewTask extends Component {
  @service projectDataService;

  @tracked taskName = '';
  @tracked taskDueDate = new Date(new Date().setDate(new Date().getDate() + 5));
  @tracked taskPriority = PRIORITY_TYPES.MEDIUM;

  @action
  updateTaskName(event) {
    this.taskName = event.target.value;
  }

  @action
  async createNewTask(event) {
    if (
      !this.taskName ||
      !this.taskDueDate ||
      !this.taskPriority ||
      !this.args.statusClass
    )
      return;
    const newTask = await this.projectDataService.createNewTask(
      this.taskName,
      this.taskDueDate,
      this.taskPriority,
      this.args.statusClass,
    );

    this.close();
  }

  @action close() {
    this.args.flipAddNewTask();
  }

  @action
  selectTaskDueDate(selection) {
    this.taskDueDate = selection.id;
  }

  @action
  selectTaskPriority(priority) {
    this.taskPriority = priority;
  }
}

// @action
// scrollIntoView() {
//   const element = this.element;

//   // Scroll the element into view while ensuring it's fully visible
//   element.scrollIntoView({
//     behavior: 'smooth',
//     block: 'start', // Align the element's top to the viewport's top
//     inline: 'nearest',
//   });

//   // You can add an extra check to adjust the position if needed
//   setTimeout(() => {
//     const rect = element.getBoundingClientRect();
//     if (rect.top < 0 || rect.bottom > window.innerHeight) {
//       window.scrollBy(0, rect.top);
//     }
//   }, 200);
// }

// Trigger scroll into view after rendering
// didRender() {
//   super.didRender();
//   this.scrollIntoView();
// }
