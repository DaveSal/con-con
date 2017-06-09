Rails.application.routes.draw do
  root 'home#index'

  get '/about'   => 'home#about'
  get '/feed'    => 'home#feed'
  get '/profile' => 'home#profile'
  
  devise_for :corporates, controllers: { 
    registrations: "corporates/registrations",
    sessions: "corporates/sessions"
  }

  devise_for :individuals, controllers: { 
    registrations: "individuals/registrations",
    sessions: "individuals/sessions"
  }
end
