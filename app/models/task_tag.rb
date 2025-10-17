# app/models/task_tag.rb
class TaskTag < ApplicationRecord
  belongs_to :task
  validates :tag_name, presence: true
end