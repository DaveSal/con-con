module AuthHelper
  def protect_content
    unless individual_signed_in?
      redirect_to root_url
    end
  end
end
