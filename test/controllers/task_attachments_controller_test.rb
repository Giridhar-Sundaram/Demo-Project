require "test_helper"

class TaskAttachmentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @task_attachment = task_attachments(:one)
  end

  test "should get index" do
    get task_attachments_url
    assert_response :success
  end

  test "should get new" do
    get new_task_attachment_url
    assert_response :success
  end

  test "should create task_attachment" do
    assert_difference("TaskAttachment.count") do
      post task_attachments_url, params: { task_attachment: { document_url: @task_attachment.document_url, name: @task_attachment.name, project_id: @task_attachment.project_id, task_id: @task_attachment.task_id, type: @task_attachment.type } }
    end

    assert_redirected_to task_attachment_url(TaskAttachment.last)
  end

  test "should show task_attachment" do
    get task_attachment_url(@task_attachment)
    assert_response :success
  end

  test "should get edit" do
    get edit_task_attachment_url(@task_attachment)
    assert_response :success
  end

  test "should update task_attachment" do
    patch task_attachment_url(@task_attachment), params: { task_attachment: { document_url: @task_attachment.document_url, name: @task_attachment.name, project_id: @task_attachment.project_id, task_id: @task_attachment.task_id, type: @task_attachment.type } }
    assert_redirected_to task_attachment_url(@task_attachment)
  end

  test "should destroy task_attachment" do
    assert_difference("TaskAttachment.count", -1) do
      delete task_attachment_url(@task_attachment)
    end

    assert_redirected_to task_attachments_url
  end
end
