Rails.application.routes.draw do
  devise_for :players
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql' if Rails.env.development?
  post '/graphql', to: 'graphql#execute'

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check

  # TODO: Required for Devise; do I want to have a non-API side for the Rails app? Decide this first
  # root to: "home#index"
end
