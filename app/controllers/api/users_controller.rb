class Api::UsersController < ApplicationController
  # skip_before_action :verify_authenticity_token 
  # before_action :authenticate_user! 

  # GET /api/users
  def index
    @users = User.all.order(:user_name) 

    render json: @users, only: [:id, :user_name, :email], status: :ok
  end

  def current
    @user = current_user 
    
    render json: @user, 
           only: [:id, :user_name, :email],
           status: :ok
  end


end