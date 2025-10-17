# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_10_14_090154) do
  create_table "project_collaborators", id: false, force: :cascade do |t|
    t.integer "project_id", null: false
    t.integer "user_id", null: false
    t.index ["project_id", "user_id"], name: "index_project_collaborators_on_project_id_and_user_id", unique: true
    t.index ["project_id"], name: "index_project_collaborators_on_project_id"
    t.index ["user_id"], name: "index_project_collaborators_on_user_id"
  end

  create_table "projects", force: :cascade do |t|
    t.string "project_name", null: false
    t.string "project_key", limit: 10, null: false
    t.integer "project_owner_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_key"], name: "index_projects_on_project_key", unique: true
    t.index ["project_owner_id"], name: "index_projects_on_project_owner_id"
  end

  create_table "task_attachments", force: :cascade do |t|
    t.integer "task_id", null: false
    t.integer "project_id", null: false
    t.string "document_url", null: false
    t.string "type"
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_task_attachments_on_project_id"
    t.index ["task_id"], name: "index_task_attachments_on_task_id"
  end

  create_table "task_comments", force: :cascade do |t|
    t.integer "task_id", null: false
    t.integer "author_id"
    t.text "text"
    t.datetime "date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_task_comments_on_author_id"
    t.index ["task_id"], name: "index_task_comments_on_task_id"
  end

  create_table "task_tags", force: :cascade do |t|
    t.integer "task_id", null: false
    t.string "tag_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["task_id"], name: "index_task_tags_on_task_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.integer "project_id", null: false
    t.string "task_name", null: false
    t.text "task_description"
    t.string "task_status", default: "todo", null: false
    t.string "task_priority", default: "medium", null: false
    t.date "task_dueDate"
    t.integer "task_assignedTo_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_tasks_on_project_id"
    t.index ["task_assignedTo_id"], name: "index_tasks_on_task_assignedTo_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "user_name"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "project_collaborators", "projects"
  add_foreign_key "project_collaborators", "users"
  add_foreign_key "projects", "users", column: "project_owner_id"
  add_foreign_key "task_attachments", "projects"
  add_foreign_key "task_attachments", "tasks"
  add_foreign_key "task_comments", "tasks"
  add_foreign_key "task_comments", "users", column: "author_id"
  add_foreign_key "task_tags", "tasks"
  add_foreign_key "tasks", "projects"
  add_foreign_key "tasks", "users", column: "task_assignedTo_id"
end
