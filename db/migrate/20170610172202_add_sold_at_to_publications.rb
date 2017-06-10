class AddSoldAtToPublications < ActiveRecord::Migration[5.0]
  def change
    add_column :publications, :sold_at, :datetime
    add_column :publications, :sold_to, :integer
  end
end
