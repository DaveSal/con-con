Rails.application.routes.draw do
  root 'home#index'
  
  devise_for :corporates, controllers: { 
    registrations: "corporates/registrations",
  }

  devise_for :individuals, controllers: { 
    registrations: "individuals/registrations",
  }
end
