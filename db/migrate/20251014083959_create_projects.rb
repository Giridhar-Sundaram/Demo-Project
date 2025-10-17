# db/migrate/XXXXXX_create_projects.rb

class CreateProjects < ActiveRecord::Migration[7.1] # Use your Rails version
  def change
    create_table :projects do |t|
      t.string :project_name, null: false
      t.string :project_key, null: false, limit: 10, index: { unique: true }

      # 1. Use 't.belongs_to' or 't.references' (simpler)
      #    We name the reference 'project_owner' but tell it to link to the 'users' table.
      t.references :project_owner, foreign_key: { to_table: :users }

      t.timestamps
    end
    # Ensure this part is exactly as shown above.
    # The `foreign_key: { to_table: :users }` part is crucial.
  end
end