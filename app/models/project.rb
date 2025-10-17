# app/models/project.rb

class Project < ApplicationRecord
  # This tells Rails that the 'project_owner_id' column belongs to a 'User' object.
  # The `foreign_key: 'project_owner_id'` explicitly maps the association name to the column name.
  belongs_to :owner, class_name: 'User', foreign_key: 'project_owner_id'

  has_many :collaborations, class_name: 'ProjectCollaborator', dependent: :destroy
  has_many :users, through: :collaborations
  has_many :tasks, dependent: :destroy

  # ... validations
  def task_counts
    @task_counts ||= tasks.group_by(&:task_status).transform_values(&:count)
  end

  def total_tasks
    @total_tasks ||= tasks.length
  end

  def todo_count
    task_counts.fetch('todo', 0)
  end

  def inprogress_count
    task_counts.fetch('inprogress', 0)
  end

  def done_count
    task_counts.fetch('done', 0)
  end

  def progress_percent
    return 0 unless total_tasks.positive?
    ((done_count.to_f / total_tasks) * 100).round
  end
  
  def project_status
    if total_tasks.zero?
      'todo'
    elsif total_tasks == done_count
      'done'
    elsif inprogress_count.positive?
      'inprogress'
    else
      'todo'
    end
  end

end