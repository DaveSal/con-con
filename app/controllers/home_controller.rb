class HomeController < ApplicationController
  before_action :protect_content, only: [:feed, :profile]

  def index
  end   

  def about
  end

  def feed
  end

  def profile
  end
end
