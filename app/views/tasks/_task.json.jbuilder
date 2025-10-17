json.extract! task, :id, :project_id, :task_name, :task_description, :task_status, :task_priority, :task_dueDate, :task_assignedTo_id, :created_at, :updated_at
json.url task_url(task, format: :json)
