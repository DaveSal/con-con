class PaymentsController < ApplicationController
  def create
    publication = Publication.find(params[:publication])

    fee = publication.price * BigDecimal.new(ENV['FEE_PERCENTAGE'])

    charge_params = [{
      amount: publication.price_in_cents,
      currency: 'usd',
      source: params['stripeToken'],
      application_fee: (fee * 100).to_i,
      description: "#{current_individual.first_name} #{current_individual.last_name}"
    }, stripe_account: publication.author.stripe_user_id]

    logger.info("Making charge with following params: #{charge_params}")

    charge = Stripe::Charge
             .create(*charge_params)

    publication.sold!(current_individual)

    flash[:notice] = "Поздравляем! Все права на статью <strong>\"#{publication.title}\"</strong> теперь принадлежат вам."

    redirect_to feed_path
  rescue Stripe::CardError => e
    flash[:error] = e.message
    redirect_to payments_path(publication: publication.id)
  end
end
