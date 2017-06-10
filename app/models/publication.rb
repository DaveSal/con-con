class Publication < ApplicationRecord
  validates :title, presence: true
  validates :content, presence: true
  validates :price, presence: true

  belongs_to :author, class_name: 'Individual'

  def price_in_cents
    (price * 100).to_i
  end
end
