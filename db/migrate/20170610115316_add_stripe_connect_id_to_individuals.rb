class AddStripeConnectIdToIndividuals < ActiveRecord::Migration[5.0]
  def change
    add_column :individuals, :stripe_user_id, :string
  end
end
