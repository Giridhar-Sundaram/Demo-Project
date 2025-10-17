# db/migrate/XXXXXX_create_project_collaborators.rb
class CreateProjectCollaborators < ActiveRecord::Migration[8.0]
  def change
    create_table :project_collaborators, id: false do |t|
      t.references :project, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
    end
    # Ensures a user can only be added once to a project
    add_index :project_collaborators, [:project_id, :user_id], unique: true
  end
end