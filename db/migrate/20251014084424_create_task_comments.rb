
class CreateTaskComments < ActiveRecord::Migration[7.1]
  def change
    create_table :task_comments do |t|
      t.references :task, null: false, foreign_key: true
      
      # CORRECTED LINE: Defines 'author_id' as a foreign key pointing to the 'users' table.
      t.references :author, foreign_key: { to_table: :users } 
      
      t.text :text
      t.datetime :date

      t.timestamps
    end
  end
end