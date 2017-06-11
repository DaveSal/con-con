class HomeController < ApplicationController
  before_action :protect_content, only: [:feed, :profile]

  def index
  end

  def about
    @title = 'О проекте'
  end

  def feed
    @title = 'Последние публикации'

    publications = Publication.not_sold.order(created_at: 'desc')

    render locals: { publications: publications }
  end

  def profile
    @title = 'Личный профиль'

    if current_individual.can_sell?
      publications = current_individual.publications.not_sold.order(created_at: 'desc')
      sold_publications = current_individual.publications.sold.order(created_at: 'desc')
    else
      publications = current_individual.bought_publications
    end

    render locals: { publications: publications, sold_publications: sold_publications }
  end
end
