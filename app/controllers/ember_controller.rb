class EmberController < ApplicationController
  layout 'ember' 
  def index
   @ember_app_name = 'frontend'
  end
end
