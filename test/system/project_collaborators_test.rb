require "application_system_test_case"

class ProjectCollaboratorsTest < ApplicationSystemTestCase
  setup do
    @project_collaborator = project_collaborators(:one)
  end

  test "visiting the index" do
    visit project_collaborators_url
    assert_selector "h1", text: "Project collaborators"
  end

  test "should create project collaborator" do
    visit project_collaborators_url
    click_on "New project collaborator"

    fill_in "Project", with: @project_collaborator.project_id
    fill_in "User", with: @project_collaborator.user_id
    click_on "Create Project collaborator"

    assert_text "Project collaborator was successfully created"
    click_on "Back"
  end

  test "should update Project collaborator" do
    visit project_collaborator_url(@project_collaborator)
    click_on "Edit this project collaborator", match: :first

    fill_in "Project", with: @project_collaborator.project_id
    fill_in "User", with: @project_collaborator.user_id
    click_on "Update Project collaborator"

    assert_text "Project collaborator was successfully updated"
    click_on "Back"
  end

  test "should destroy Project collaborator" do
    visit project_collaborator_url(@project_collaborator)
    click_on "Destroy this project collaborator", match: :first

    assert_text "Project collaborator was successfully destroyed"
  end
end
