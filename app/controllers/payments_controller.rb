class PaymentsController < ApplicationController
  def create
    publication = Publication.find(params[:publication])

    charge_params = [{
      amount: publication.price_in_cents,
      currency: 'usd',
      source: params['stripeToken']
    }, stripe_account: publication.author.stripe_user_id]

    logger.info("Making charge with following params: #{charge_params}")

    charge = Stripe::Charge
             .create(*charge_params)
  rescue Stripe::CardError => e
    flash[:error] = e.message
    redirect_to payments_path(publication: publication.id)
  end
end
