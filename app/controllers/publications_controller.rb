class PublicationsController < ApplicationController
  def index
  end

  def new
    @publication = Publication.new
  end

  def create
  end

  private

  def publications_params
    params.require(:publication).permit(:title, :string, :price)
  end
end
