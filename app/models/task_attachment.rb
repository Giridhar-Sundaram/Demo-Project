class TaskAttachment < ApplicationRecord
  belongs_to :task
  belongs_to :project

  self.inheritance_column = nil
end
