class ProjectsController < ApplicationController
  before_action :set_project, only: %i[ show edit update destroy ]

  # GET /projects or /projects.json
  def index
    @projects = Project.all.includes(:tasks, :collaborations)

    respond_to do |format|
      format.json do 
        project_metrics = @projects.map do |project|
          task_counts = project.tasks.group_by(&:task_status).transform_values(&:count)
          
          todo_count       = task_counts.fetch('todo', 0)
          inprogress_count = task_counts.fetch('inprogress', 0)
          done_count       = task_counts.fetch('done', 0)
          total_tasks      = todo_count + inprogress_count + done_count
          
          progress_percent = total_tasks.positive? ? ((done_count.to_f / total_tasks) * 100).round : 0
          project_status = if total_tasks == done_count && total_tasks.positive?
                            'done'
                          elsif inprogress_count.positive?
                            'inprogress'
                          else
                            'todo'
                          end

          {
            id: project.id,
            project_name: project.project_name,
            project_key: project.project_key,
            project_status: project_status,
            todo_count: todo_count,
            inprogress_count: inprogress_count,
            done_count: done_count,
            total_tasks: total_tasks,
            progress_percent: progress_percent,
            collaborations: project.collaborations.map do |collaboration|
              {
                id: collaboration.user.id,
                user_name: collaboration.user.user_name,  
                email: collaboration.user.email 
              }
            end
          }
        end

        render json: project_metrics, status: :ok
      end
    end
  end

  # GET /projects/1 or /projects/1.json
  def show
    begin
      # 1. Retrieve the ID from the URL parameter (e.g., /projects/5)
      project_id = params[:id]
      
      # 2. Find the project object. Use bang method (find) to raise an 
      #    exception if not found, which is caught below.
      @project = Project.find(project_id) 
      
      # 3. Explicitly render the project object as JSON
      render json: @project, status: :ok # status: :ok is optional (200 OK is default)

    rescue ActiveRecord::RecordNotFound
      # Handle the error if the ID doesn't match any record
      render json: { error: "Project not found with ID: #{project_id}" }, 
             status: :not_found # Renders 404 Not Found
    end
  end

  # GET /projects/new
  def new
    @project = Project.new
  end

  # GET /projects/1/edit
  def edit
  end

  # POST /projects or /projects.json
  def create
    @project = Project.new(project_params)

    respond_to do |format|
      if @project.save
        format.html { redirect_to @project, notice: "Project was successfully created." }
        format.json { render :show, status: :created, location: @project }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /projects/1 or /projects/1.json
  def update
    respond_to do |format|
      if @project.update(project_params)
        format.html { redirect_to @project, notice: "Project was successfully updated.", status: :see_other }
        format.json { render :show, status: :ok, location: @project }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /projects/1 or /projects/1.json
  def destroy
    @project.destroy!

    respond_to do |format|
      format.html { redirect_to projects_path, notice: "Project was successfully destroyed.", status: :see_other }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_project
      @project = Project.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def project_params
      # params.expect(project: [ :project_name, :project_key, :project_owner_id ])
      params.require(:project).permit(
        :project_name, 
        :project_key, 
        :project_owner_id,
        
        collaborations_attributes: [ 
          :user_id, # The ID of the user to link
          :id,
          :_destroy 
        ]
      )
    end
end
