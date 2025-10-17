require "application_system_test_case"

class TaskTagsTest < ApplicationSystemTestCase
  setup do
    @task_tag = task_tags(:one)
  end

  test "visiting the index" do
    visit task_tags_url
    assert_selector "h1", text: "Task tags"
  end

  test "should create task tag" do
    visit task_tags_url
    click_on "New task tag"

    fill_in "Tag name", with: @task_tag.tag_name
    fill_in "Task", with: @task_tag.task_id
    click_on "Create Task tag"

    assert_text "Task tag was successfully created"
    click_on "Back"
  end

  test "should update Task tag" do
    visit task_tag_url(@task_tag)
    click_on "Edit this task tag", match: :first

    fill_in "Tag name", with: @task_tag.tag_name
    fill_in "Task", with: @task_tag.task_id
    click_on "Update Task tag"

    assert_text "Task tag was successfully updated"
    click_on "Back"
  end

  test "should destroy Task tag" do
    visit task_tag_url(@task_tag)
    click_on "Destroy this task tag", match: :first

    assert_text "Task tag was successfully destroyed"
  end
end
