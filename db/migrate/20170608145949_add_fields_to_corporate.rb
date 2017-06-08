class AddFieldsToCorporate < ActiveRecord::Migration[5.0]
  def change
    add_column :corporates, :company_name, :string
    add_column :corporates, :phone_number, :string
    add_column :corporates, :representer, :string
    add_column :corporates, :about, :text
  end
end
