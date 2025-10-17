json.extract! task_comment, :id, :task_id, :author_id, :text, :date, :created_at, :updated_at
json.url task_comment_url(task_comment, format: :json)
