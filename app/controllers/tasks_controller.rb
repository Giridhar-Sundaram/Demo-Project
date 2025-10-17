class TasksController < ApplicationController
  skip_before_action :verify_authenticity_token 
  before_action :set_task, only: %i[ show edit update destroy ]

# app/controllers/tasks_controller.rb

  # GET /tasks or /tasks.json
  def index
      # Step 1: Filter tasks by project_id if present
      tasks_query = if params[:project_id].present?
                      Task.where(project_id: params[:project_id])
                    else
                      Task.all
                    end
                    
      # 🎯 Step 2: Eager load ASSOCIATIONS (Nested Inclusion)
      # We must include the 'comments' association and THEN include the 'author' association on the comments.
      @tasks = tasks_query.includes(:attachments, :tags, :assignee, comments: [:author]) 
      # Notice: 'comments: [:author]' loads the user associated via the 'author' foreign key in TaskComment

      # Step 3: Render the tasks and their associations as JSON
      render json: @tasks, 
            include: [
              :attachments, 
              :tags,
              
              # 🎯 MODIFICATION: Include the 'comments' association and NEST the 'author' details
              {
                comments: {
                  include: [
                    { 
                      author: { # This assumes 'author' is the association name in TaskComment
                        only: [:id, :user_name] 
                      } 
                    }
                  ],
                  # Select only the required fields from the TaskComment model itself
                  only: [:id, :text, :date, :created_at] 
                }
              },
              
              # 🎯 Assignee inclusion remains the same
              { 
                assignee: { 
                  only: [:id, :user_name] 
                } 
              }
            ], 
            status: :ok
  end

  # GET /tasks/1 or /tasks/1.json
  def show
  end

  # GET /tasks/new
  def new
    @task = Task.new
  end

  # GET /tasks/1/edit
  def edit
  end

  # POST /tasks or /tasks.json
  def create
  @task = Task.new(task_params)

    respond_to do |format|
      if @task.save
        # Render the newly created task, @task, with all required associations.
        format.json { 
          render json: @task, 
                include: [
                  # Include other associations
                  :attachments, 
                  :comments, 
                  :tags,
                  
                  # 🎯 Include the 'assignee' association and specify which attributes to return
                  { 
                    assignee: { 
                      only: [:id, :user_name] # Selects only the ID and user_name fields
                    } 
                  }
                ], 
                status: :created, 
                location: @task 
        }
      else
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tasks/1 or /tasks/1.json
  def update
    respond_to do |format|
      if @task.update(task_params)
        format.html { redirect_to @task, notice: "Task was successfully updated.", status: :see_other }
        format.json { render :show, status: :ok, location: @task }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tasks/1 or /tasks/1.json
  def destroy
    @task.destroy!

    respond_to do |format|
      format.html { redirect_to tasks_path, notice: "Task was successfully destroyed.", status: :see_other }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def task_params
      params.expect(task: [ :project_id, :task_name, :task_description, :task_status, :task_priority, :task_dueDate, :task_assignedTo_id ])
    end
end
