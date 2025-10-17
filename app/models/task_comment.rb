class TaskComment < ApplicationRecord
  # Existing association to Task
  belongs_to :task

  # New/Updated: Tell Rails that 'author_id' refers to the 'User' class.
  # The 'foreign_key' option specifies the column name in the task_comments table.
  belongs_to :author, class_name: 'User', foreign_key: 'author_id'
end