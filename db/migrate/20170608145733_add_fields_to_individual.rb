class AddFieldsToIndividual < ActiveRecord::Migration[5.0]
  def change
    add_column :individuals, :first_name, :string
    add_column :individuals, :last_name, :string
    add_column :individuals, :phone_number, :string
    add_column :individuals, :major, :string
    add_column :individuals, :about, :text
  end
end
