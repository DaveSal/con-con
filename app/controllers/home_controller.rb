class HomeController < ApplicationController
  before_action :protect_content, only: [:feed, :profile]

  def index
  end   

  def about
  end

  def feed
    publications = Publication.all.order(created_at: 'desc')

    render locals: { publications: publications }
  end

  def profile
    publications = current_individual.publications.unscoped.order(created_at: 'desc')

    render locals: { publications: publications }
  end
end
