class TaskAttachmentsController < ApplicationController
  before_action :set_task_attachment, only: %i[ show edit update destroy ]

  # GET /task_attachments or /task_attachments.json
  def index
    @task_attachments = TaskAttachment.all
  end

  # GET /task_attachments/1 or /task_attachments/1.json
  def show
  end

  # GET /task_attachments/new
  def new
    @task_attachment = TaskAttachment.new
  end

  # GET /task_attachments/1/edit
  def edit
  end

  # POST /task_attachments or /task_attachments.json
  def create
    @task_attachment = TaskAttachment.new(task_attachment_params)

    respond_to do |format|
      if @task_attachment.save
        format.html { redirect_to @task_attachment, notice: "Task attachment was successfully created." }
        format.json { render :show, status: :created, location: @task_attachment }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @task_attachment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /task_attachments/1 or /task_attachments/1.json
  def update
    respond_to do |format|
      if @task_attachment.update(task_attachment_params)
        format.html { redirect_to @task_attachment, notice: "Task attachment was successfully updated.", status: :see_other }
        format.json { render :show, status: :ok, location: @task_attachment }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @task_attachment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /task_attachments/1 or /task_attachments/1.json
  def destroy
    @task_attachment.destroy!

    respond_to do |format|
      format.html { redirect_to task_attachments_path, notice: "Task attachment was successfully destroyed.", status: :see_other }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task_attachment
      @task_attachment = TaskAttachment.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def task_attachment_params
      params.expect(task_attachment: [ :task_id, :project_id, :document_url, :type, :name ])
    end
end
