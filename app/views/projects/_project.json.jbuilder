json.extract! project, :id, :project_name, :project_key, :project_owner_id, :created_at, :updated_at
json.url project_url(project, format: :json)
