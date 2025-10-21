Rails.application.routes.draw do
  
  namespace :api do
    resources :users, only: [:index] do
    collection do 
        get :current 
      end
    end
  end
  get "home/index"
  resources :task_tags
  resources :task_attachments
  resources :task_comments
  resources :tasks
  resources :project_collaborators
  resources :projects
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    passwords: 'users/passwords'
    # add others if needed
  }
  get "auth/index"

  root "ember#index" , defaults: { ember_app: 'frontend' }
  mount_ember_app :frontend, to: "/em/", controller: "ember", action: "index"
  get '/em(/*all)', to: 'ember#index', format: false
  
  # get "ember/index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
end
