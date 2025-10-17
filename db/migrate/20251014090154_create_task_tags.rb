class CreateTaskTags < ActiveRecord::Migration[8.0]
  def change
    create_table :task_tags do |t|
      t.references :task, null: false, foreign_key: true
      t.string :tag_name

      t.timestamps
    end
  end
end
