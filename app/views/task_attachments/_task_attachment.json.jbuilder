json.extract! task_attachment, :id, :task_id, :project_id, :document_url, :type, :name, :created_at, :updated_at
json.url task_attachment_url(task_attachment, format: :json)
