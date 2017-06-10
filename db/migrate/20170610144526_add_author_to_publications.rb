class AddAuthorToPublications < ActiveRecord::Migration[5.0]
  def change
    add_column :publications, :author_id, :integer
  end
end
