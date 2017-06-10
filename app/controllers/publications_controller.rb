class PublicationsController < ApplicationController
  def index
  end

  def new
    @publication = Publication.new
  end

  def create
  end

  def show
    publication = Publication.find(params[:id])

    render locals: { publication: publication }
  end

  private

  def publications_params
    params.require(:publication).permit(:title, :string, :price)
  end
end
