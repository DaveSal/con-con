class ConfirmsController < ApplicationController
  def show
    logger.info('Request to https://connect.stripe.com/oauth/token')

    response = HTTParty.post('https://connect.stripe.com/oauth/token', body: {
                               client_secret: ENV['STRIPE_SECRET_KEY'],
                               code: params['code'],
                               grant_type: 'authorization_code'
                             })

    logger.info('Response from https://connect.stripe.com/oauth/token')
    logger.info(response['body'])

    if response['error'].blank?
      current_individual.stripe_user_id = response['stripe_user_id']
      current_individual.save!

      redirect_to root_path

      return
    end

    raise StandardError, 'Cannot retrieve stripe_user_id'
  end
end
