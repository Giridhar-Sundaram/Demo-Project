class ApplicationController < ActionController::Base
  before_action :set_projects
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
  protect_from_forgery with: :exception, unless: -> { request.format.json? }
  # before_action :authenticate_user!

  def set_projects
    # Define the projects collection for all views that need it
    @projects = Project.all 
  end
end
