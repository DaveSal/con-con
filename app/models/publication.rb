class Publication < ApplicationRecord
  validates :title, presence: true
  validates :content, presence: true
  validates :price, presence: true

  belongs_to :author, class_name: 'Individual'
  belongs_to :buyer, class_name: 'Individual', foreign_key: 'sold_to'

  default_scope { where(sold_at: nil) }

  def price_in_cents
    (price * 100).to_i
  end

  def sold!(user)
    self.sold_at = Time.zone.now
    self.sold_to = user.id
    save!
  end
end
