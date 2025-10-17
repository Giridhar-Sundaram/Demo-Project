class ProjectCollaboratorsController < ApplicationController
  before_action :set_project_collaborator, only: %i[ show edit update destroy ]

  # # GET /project_collaborators or /project_collaborators.json
  # def index
  #   @project_collaborators = ProjectCollaborator.all
  # end

  # app/controllers/project_collaborators_controller.rb

  def index
    # Step 1: Handle missing project_id
    unless params[:project_id].present?
      return render json: [], status: :ok
    end

    # Step 2: Get the join records and eagerly load the User data
    # This query is efficient but returns an Active Record Relation of ProjectCollaborator records.
    collaborator_joins = ProjectCollaborator.where(project_id: params[:project_id]).includes(:user)

    # 🎯 STEP 3: EXTRACT THE USER OBJECTS
    # We use the 'map' method to iterate over the join records and pull out the associated :user object.
    # This turns the collection of ProjectCollaborator objects into a simple array of User objects.
    @users = collaborator_joins.map(&:user)

    # Step 4: Render the array of User objects directly.
    # Note: Since @users is now a standard Ruby array of Active Record objects, 
    # Rails' JSON renderer will automatically convert them.
    render json: @users,
          only: [:id, :user_name, :email], # Apply filtering directly to the User objects
          status: :ok
  end

  # GET /project_collaborators/1 or /project_collaborators/1.json
  def show
  end

  # GET /project_collaborators/new
  def new
    @project_collaborator = ProjectCollaborator.new
  end

  # GET /project_collaborators/1/edit
  def edit
  end

  # POST /project_collaborators or /project_collaborators.json
  def create
    @project_collaborator = ProjectCollaborator.new(project_collaborator_params)

    respond_to do |format|
      if @project_collaborator.save
        format.html { redirect_to @project_collaborator, notice: "Project collaborator was successfully created." }
        format.json { render :show, status: :created, location: @project_collaborator }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @project_collaborator.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /project_collaborators/1 or /project_collaborators/1.json
  def update
    respond_to do |format|
      if @project_collaborator.update(project_collaborator_params)
        format.html { redirect_to @project_collaborator, notice: "Project collaborator was successfully updated.", status: :see_other }
        format.json { render :show, status: :ok, location: @project_collaborator }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @project_collaborator.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /project_collaborators/1 or /project_collaborators/1.json
  def destroy
    @project_collaborator.destroy!

    respond_to do |format|
      format.html { redirect_to project_collaborators_path, notice: "Project collaborator was successfully destroyed.", status: :see_other }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_project_collaborator
      @project_collaborator = ProjectCollaborator.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def project_collaborator_params
      params.expect(project_collaborator: [ :project_id, :user_id ])
    end
end
