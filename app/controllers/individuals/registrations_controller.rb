class Individuals::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]
  before_action :configure_account_update_params, only: [:update]

  def new
    super
  end

  def create
    super
  end

  def edit
    super
  end

  def update
    super
  end

  def destroy
    super
  end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  def cancel
    super
  end

  protected

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute, :first_name, :last_name, :phone_number, :major, :about, :seller])
  end

  def configure_account_update_params
    devise_parameter_sanitizer.permit(:account_update, keys: [:attribute, :first_name, :last_name, :phone_number, :major, :about])
  end

  def after_sign_up_path_for(resource)
    super(resource)

    params = {
      'scope' => 'read_write',
      'client_id' => ENV['STRIPE_CONNECT_CLIENT_ID'],
      'response_type' => 'code',
      'stripe_user[email]' => current_individual.email,
      'stripe_user[business_name]' => "#{current_individual.first_name} #{current_individual.last_name}"
    }

    if current_individual.seller == '1'
      return URI::HTTP.build(host: 'connect.stripe.com',
                             path: '/oauth/authorize',
                             query: params.to_query).to_s
    end

    '#about'
  end

  def after_inactive_sign_up_path_for(resource)
    super(resource)
  end
end
