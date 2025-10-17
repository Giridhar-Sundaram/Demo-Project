class HomeController < ApplicationController
  def index
    @projects = Project.all.includes(:tasks)
  end
end
