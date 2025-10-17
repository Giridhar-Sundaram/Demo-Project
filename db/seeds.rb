# db/seeds.rb

# NOTE: This seed file assumes you have the 'faker' gem installed and all migrations run.
# Devise handles automatic password hashing (BCrypt).

# --- 0. Setup and Cleanup ---
puts "Cleaning database..."

# Destroying records in reverse order of dependency
TaskAttachment.destroy_all
TaskComment.destroy_all
TaskTag.destroy_all
Task.destroy_all
ProjectCollaborator.destroy_all
Project.destroy_all
User.destroy_all

# Resources for attachments (extended list)
ALL_ATTACHMENT_URLS = [
  "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1468071174046-657d9d351a40?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80"
]

TAG_OPTIONS = [
  'design',
  'frontend',
  'backend',
  'security',
  'database',
  'mobile',
  'documentation',
  'refactor',
  'qa',
  'performance',
  'testing',
  'devops',
  'data',
  'component',
  'automation',
  'review',
  'tooling',
  'feature',
  'ux',
  'a11y',
  'management',
  'cloud'
]
STATIC_STATUSES = ['todo', 'inprogress', 'done']
STATIC_PRIORITIES = ['lowest', 'low', 'medium', 'high', 'highest']


# --- 1. Create 10 Users ---
puts "\n1. Creating 10 Users..."

users = []
# Create 9 new generic users
9.times do |i|
  user = User.create!(
    user_name: Faker::Name.unique.name,
    email: Faker::Internet.unique.email,
    password: 'password123',
    password_confirmation: 'password123'
  )
  users << user
end

# Ensure the core user from the original JSON exists
giridhar = User.find_or_create_by!(email: 'giridhar@gmail.com') do |u|
    u.user_name = 'Giridhar Sundar'
    u.password = 'system123#'
    u.password_confirmation = 'system123#'
end
users << giridhar
puts "   - Created 10 total users."


# --- 2. Create 10 Projects, Collaborators, Tasks, Comments, Tags, and Attachments ---
puts "\n2. Creating Projects, Tasks, Comments, Tags, and Attachments..."

10.times do |i|
  # --- 2.1 Project Creation ---
  owner = users.sample 
  
  # Constraint: Project key is exactly two unique uppercase letters
  project_key = Faker::Alphanumeric.unique.alpha(number: 2).upcase
  
  project = Project.create!(
    project_name: Faker::Company.bs.titleize + " Initiative",
    project_key: project_key,
    owner: owner # Links via project_owner_id
  )
  puts "   - Created Project: #{project.project_name} (Key: #{project_key})"

  # --- 2.2 Collaborator Setup (Owner + 2 random users) ---
  
  ProjectCollaborator.find_or_create_by!(project: project, user: owner)
  (users - [owner]).sample(2).each do |collaborator|
    ProjectCollaborator.find_or_create_by!(project: project, user: collaborator)
  end
  project_collaborators = project.users 
  
  # 🎯 FIX 1: Ensure project_collaborators is never empty to prevent nil.sample
  project_collaborators = [owner] if project_collaborators.empty?

  # --- CRITICAL FIX for Enum Error (NoMethodError) ---
  Task.reset_column_information 
  
  # --- 2.3 Create Minimum 20 Tasks per Project ---
  
  statuses = STATIC_STATUSES    
  priorities = STATIC_PRIORITIES 
  
  20.times do |j|
    assignee = project_collaborators.sample 
    
    task = Task.create!(
      project: project,
      task_name: Faker::Hacker.verb.titleize + " " + Faker::Hacker.noun.titleize + " Refinement",
      task_description: Faker::Lorem.sentence(word_count: 15) + " Final review of the specifications is required.",
      task_status: statuses.sample,
      task_priority: priorities.sample,
      # 🎯 FIX 2: Assign the full User object to the 'assignee' association.
      assignee: assignee, 
      # task_assignedTo_id: assignee, # <-- REMOVED/REPLACED BY 'assignee: assignee'
      task_dueDate: Faker::Date.forward(days: 60)
    )

    # --- 2.4 Add 3 Comments to each Task ---
    3.times do 
      comment_author = project_collaborators.sample
      TaskComment.create!(
        task: task,
        # 🎯 FIX 3: Assign the full User object to the 'author' association.
        author: comment_author, 
        # author_id: comment_author, # <-- REMOVED/REPLACED BY 'author: comment_author'
        text: "#{Faker::Hacker.say_something_smart}. #{comment_author.user_name} provided key insights.",
        date: Faker::Time.backward(days: 30)
      )
    end
    
    # --- 2.5 Add 2 Attachments to each Task ---
    2.times do |k|
      TaskAttachment.create!(
        task: task,
        project: project, # Required by the dual task_id and project_id foreign keys
        document_url: ALL_ATTACHMENT_URLS.sample,
        type: 'img', # Mix types
        name: "#{task.task_name.split.first}_Doc_V#{k+1}"
      )
    end
    
    # --- 2.6 Add 2 Tags to each Task ---
    TAG_OPTIONS.sample(2).each do |tag|
        TaskTag.create!(task: task, tag_name: tag)
    end
  end
  puts "     -> Created 20 tasks, 60 comments, 40 attachments, and 40 tags for #{project.project_key}."
end

puts "\n--- Seeding Complete! ---"
puts "Summary:"
puts "Total Users: #{User.count}"
puts "Total Projects: #{Project.count}"
puts "Total Tasks: #{Task.count}"
puts "Total Tags: #{TaskTag.count}"
puts "Total Attachments: #{TaskAttachment.count}"