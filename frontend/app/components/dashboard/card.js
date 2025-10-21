import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class DashboardCard extends Component {
  @tracked borderColor = 'transparent';

  setBorderColor = (color) => {
    this.borderColor = color;
  };

  get pieChartData() {
    return {
      labels: ['To Do', 'In Progress', 'Done'],
      datasets: [
        {
          // Data points must be raw numbers (the counts)
          data: [
            this.args.project.todo_count,
            this.args.project.inprogress_count,
            this.args.project.done_count,
          ],
          backgroundColor: [
            '#a19faf', // Orange/Todo
            '#fedf89', // Blue/In Progress
            '#6ce9a6', // Green/Done
          ],
          borderColor: '#ffffff', // White border between segments
          borderWidth: 2,
        },
      ],
    };
  }

  get pieChartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: true, // important to allow legend to the side
      legend: {
        display: true,
        position: 'right', // valid in v2
        labels: {
          boxWidth: 20, // optional styling
          // padding: 20,
        },
      },
      // aspectRatio: 2,
    };
  }
}
