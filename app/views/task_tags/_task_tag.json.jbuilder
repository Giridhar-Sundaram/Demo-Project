json.extract! task_tag, :id, :task_id, :tag_name, :created_at, :updated_at
json.url task_tag_url(task_tag, format: :json)
