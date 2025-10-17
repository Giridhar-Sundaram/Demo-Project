class CreateTaskAttachments < ActiveRecord::Migration[8.0]
  def change
    create_table :task_attachments do |t|
      # Reference 1: Links to the tasks table (Task ID)
      t.references :task, null: false, foreign_key: true 
      
      # Reference 2: Links to the projects table (Project ID)
      # This is redundant based on normalization, but included as requested.
      t.references :project, null: false, foreign_key: true 
      
      t.string :document_url, null: false 
      t.string :type                       
      t.string :name, null: false           

      t.timestamps
    end
  end
end