import { action } from '@ember/object';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { STATUS_TYPES } from 'frontend/constants/status-types';

export default class TaskPersistanceService extends Service {
  @service projectDataService;
  @service apiService;

  _getTaskAndIndex(taskId) {
    const taskIndex = this.projectDataService.projectTasksList.findIndex(
      (task) => task.id === taskId,
    );
    const task = this.projectDataService.projectTasksList[taskIndex];

    return [task, taskIndex];
  }

  async _performTaskUpdate(taskId, attributes) {
    try {
      const [task, taskIndex] = this._getTaskAndIndex(taskId);

      if (!task) {
        throw new Error(`Task ID ${taskId} not found locally.`);
      }

      const updatedTask = {
        ...task,
        ...attributes,
      };

      return await this.updateTask(updatedTask, taskIndex);
    } catch (exception) {
      console.error(`Error performing update for task ${taskId}:`, exception);
      throw exception;
    }
  }

  async fetchprojectTasksList(projectId) {
    try {
      await this.projectDataService.fetchInformationAboutAllProjects();
      await this.projectDataService.fetchProjectDetails(projectId);
      await this.projectDataService.fetchprojectCollaboratorsList(projectId);

      const tasks = await this.apiService.get(`tasks?project_id=${projectId}`);

      const attachments = tasks
        .map((task) =>
          task.attachments.map((attachment) => ({
            ...attachment,
            taskName: task.task_name,
          })),
        )
        .flat();

      console.log(tasks);

      this.projectDataService.setProjectTaskList(tasks);
      this.projectDataService.setProjectAttachmentsList(attachments);

      return tasks;
    } catch (e) {
      console.error(`Failed to fetch tasks for project ${projectId}:`, e);
      throw e;
    }
  }

  async createTask(task) {
    try {
      const maxIndex = this.projectDataService.projectCollaboratorsList.length;
      const randomNumber = Math.floor(Math.random() * maxIndex);

      const projectid = task.projectId
        ? task.projectId
        : this.projectDataService.projectId;
      const assignee = task.taskAssignedToId
        ? task.taskAssignedToId
        : this.projectDataService.projectCollaboratorsList[randomNumber].id;

      const apiBody = {
        task: {
          project_id: projectid,
          task_name: task.taskName,
          task_description: task.taskDescription,
          task_status: task.taskStatus,
          task_priority: task.taskPriority,
          task_dueDate: task.taskDueDate,
          task_assignedTo_id: assignee,
        },
      };

      const newTask = await this.apiService.post('tasks', apiBody);

      const updatedTaskList = [
        ...this.projectDataService.projectTasksList,
        newTask,
      ];
      this.projectDataService.setProjectTaskList(updatedTaskList);

      return task;
    } catch (exception) {
      console.error(exception);
      throw exception;
    }
  }

  async updateTask(task, taskIndex) {
    try {
      const updated = await this.apiService.update(`tasks/${task.id}`, {
        task: {
          ...task,
        },
      });

      if (!updated) return false;

      this.projectDataService.syncProjectTasks(task, taskIndex);
      return updated;
    } catch (exception) {
      console.error(exception);
      throw exception;
    }
  }

  async updateTaskStatus(taskId, statusType) {
    return await this._performTaskUpdate(taskId, { task_status: statusType });
  }

  async updateTaskName(taskId, taskName) {
    return await this._performTaskUpdate(taskId, { task_name: taskName });
  }

  async updateTaskDescription(taskId, taskDescription) {
    return await this._performTaskUpdate(taskId, {
      task_description: taskDescription,
    });
  }

  async updateTaskPriority(taskId, taskPriority) {
    return await this._performTaskUpdate(taskId, {
      task_priority: taskPriority,
    });
  }

  async updateTaskAssignee(taskId, taskAssignee) {
    return await this._performTaskUpdate(taskId, {
      assignee: taskAssignee,
    });
  }

  async updateTaskAttachments(taskId, taskAttachments) {
    return await this._performTaskUpdate(taskId, {
      attachments: taskAttachments,
    });
  }

  async updateTaskDueDate(taskId, taskDueDate) {
    return await this._performTaskUpdate(taskId, {
      task_dueDate: taskDueDate.id,
    });
  }

  async deleteTask(taskId) {
    try {
      const deleted = this.apiService.delete(`tasks/${taskId}`);
      if (!deleted) throw 'Task not deleted';

      this.projectDataService.removeTaskFromList(taskId);
      return true;
    } catch (exception) {
      console.error(`Error deleting task ${taskId}:`, exception);
      throw exception;
    }
  }
}
