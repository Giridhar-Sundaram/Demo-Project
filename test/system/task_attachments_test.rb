require "application_system_test_case"

class TaskAttachmentsTest < ApplicationSystemTestCase
  setup do
    @task_attachment = task_attachments(:one)
  end

  test "visiting the index" do
    visit task_attachments_url
    assert_selector "h1", text: "Task attachments"
  end

  test "should create task attachment" do
    visit task_attachments_url
    click_on "New task attachment"

    fill_in "Document url", with: @task_attachment.document_url
    fill_in "Name", with: @task_attachment.name
    fill_in "Project", with: @task_attachment.project_id
    fill_in "Task", with: @task_attachment.task_id
    fill_in "Type", with: @task_attachment.type
    click_on "Create Task attachment"

    assert_text "Task attachment was successfully created"
    click_on "Back"
  end

  test "should update Task attachment" do
    visit task_attachment_url(@task_attachment)
    click_on "Edit this task attachment", match: :first

    fill_in "Document url", with: @task_attachment.document_url
    fill_in "Name", with: @task_attachment.name
    fill_in "Project", with: @task_attachment.project_id
    fill_in "Task", with: @task_attachment.task_id
    fill_in "Type", with: @task_attachment.type
    click_on "Update Task attachment"

    assert_text "Task attachment was successfully updated"
    click_on "Back"
  end

  test "should destroy Task attachment" do
    visit task_attachment_url(@task_attachment)
    click_on "Destroy this task attachment", match: :first

    assert_text "Task attachment was successfully destroyed"
  end
end
