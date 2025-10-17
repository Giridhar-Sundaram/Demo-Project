# app/models/task.rb

class Task < ApplicationRecord
  # Ensure all associations are correctly linked (we previously fixed task_assignedTo_id)
   # Existing association (assuming)
  belongs_to :project

  # New/Updated: Tell Rails that 'task_assignedTo_id' refers to the 'User' class.
  belongs_to :assignee, 
             class_name: 'User', 
             foreign_key: 'task_assignedTo_id', 
             optional: true # Set to true if a task can be unassigned

  # Ensure all other associations (has_many) are also present for proper cleanup/seeding
  has_many :comments, class_name: 'TaskComment', foreign_key: 'task_id', dependent: :destroy
  has_many :attachments, class_name: 'TaskAttachment', foreign_key: 'task_id', dependent: :destroy
  has_many :tags, class_name: 'TaskTag', foreign_key: 'task_id', dependent: :destroy
end

