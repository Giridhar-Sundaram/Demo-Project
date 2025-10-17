require "test_helper"

class TasksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @task = tasks(:one)
  end

  test "should get index" do
    get tasks_url
    assert_response :success
  end

  test "should get new" do
    get new_task_url
    assert_response :success
  end

  test "should create task" do
    assert_difference("Task.count") do
      post tasks_url, params: { task: { project_id: @task.project_id, task_assignedTo_id: @task.task_assignedTo_id, task_description: @task.task_description, task_dueDate: @task.task_dueDate, task_name: @task.task_name, task_priority: @task.task_priority, task_status: @task.task_status } }
    end

    assert_redirected_to task_url(Task.last)
  end

  test "should show task" do
    get task_url(@task)
    assert_response :success
  end

  test "should get edit" do
    get edit_task_url(@task)
    assert_response :success
  end

  test "should update task" do
    patch task_url(@task), params: { task: { project_id: @task.project_id, task_assignedTo_id: @task.task_assignedTo_id, task_description: @task.task_description, task_dueDate: @task.task_dueDate, task_name: @task.task_name, task_priority: @task.task_priority, task_status: @task.task_status } }
    assert_redirected_to task_url(@task)
  end

  test "should destroy task" do
    assert_difference("Task.count", -1) do
      delete task_url(@task)
    end

    assert_redirected_to tasks_url
  end
end
