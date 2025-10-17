# db/migrate/XXXXXX_create_tasks.rb
class CreateTasks < ActiveRecord::Migration[8.0]
  def change
    create_table :tasks do |t|
      t.references :project, null: false, foreign_key: true
      t.string :task_name, null: false
      t.text :task_description
      t.string :task_status, null: false, default: 'todo'
      t.string :task_priority, null: false, default: 'medium'
      t.date :task_dueDate

      # CORRECTED: Links the assignee field to the 'users' table.
      t.references :task_assignedTo, foreign_key: { to_table: :users }, index: true

      t.timestamps
    end
  end
end