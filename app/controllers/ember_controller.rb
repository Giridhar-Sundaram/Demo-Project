class EmberController < ApplicationController
  layout 'ember' 
  before_action :authenticate_user!
  
  def index
   @ember_app_name = 'frontend'
  end
end
