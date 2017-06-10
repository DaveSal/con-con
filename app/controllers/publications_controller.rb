class PublicationsController < ApplicationController
  before_filter :find_publication, only: [:show, :edit, :update]
  
  def index
  end

  def new
    @publication = Publication.new
  end

  def create
    byebug
    @publication = Publication.new(publications_params)
    @publication.author = current_individual
    byebug

    if @publication.save
      redirect_to @publication
    else
      render 'new' 
    end
  end

  def show
    render locals: { publication: @publication }
  end

  def edit
  end

  def update
    if @publication.update
      redirect_to @publication
    else
      render 'edit'
    end
  end

  private

  def find_publication
    @publication = Publication.find(params[:id])
  end

  def publications_params
    params.require(:publication).permit(:title, :content, :price)
  end
end
