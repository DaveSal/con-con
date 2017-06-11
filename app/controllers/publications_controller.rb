class PublicationsController < ApplicationController
  before_filter :find_publication, only: [:show, :edit, :update]
  
  def index
  end

  def new
    @publication = current_individual.publications.build
  end

  def create
    @publication = current_individual.publications.build(publications_params)

    if @publication.save
      redirect_to @publication
      flash[:success] = 'Вы успешно создали публикацию'
    else
      flash.now[:error] = 'Не удалось создать публикацию'
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
