require "application_system_test_case"

class TaskCommentsTest < ApplicationSystemTestCase
  setup do
    @task_comment = task_comments(:one)
  end

  test "visiting the index" do
    visit task_comments_url
    assert_selector "h1", text: "Task comments"
  end

  test "should create task comment" do
    visit task_comments_url
    click_on "New task comment"

    fill_in "Author", with: @task_comment.author_id
    fill_in "Date", with: @task_comment.date
    fill_in "Task", with: @task_comment.task_id
    fill_in "Text", with: @task_comment.text
    click_on "Create Task comment"

    assert_text "Task comment was successfully created"
    click_on "Back"
  end

  test "should update Task comment" do
    visit task_comment_url(@task_comment)
    click_on "Edit this task comment", match: :first

    fill_in "Author", with: @task_comment.author_id
    fill_in "Date", with: @task_comment.date.to_s
    fill_in "Task", with: @task_comment.task_id
    fill_in "Text", with: @task_comment.text
    click_on "Update Task comment"

    assert_text "Task comment was successfully updated"
    click_on "Back"
  end

  test "should destroy Task comment" do
    visit task_comment_url(@task_comment)
    click_on "Destroy this task comment", match: :first

    assert_text "Task comment was successfully destroyed"
  end
end
