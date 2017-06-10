class CreatePublications < ActiveRecord::Migration[5.0]
  def change
    create_table :publications do |t|
      t.string :title
      t.text :content
      t.decimal :price

      t.timestamps
    end
  end
end
