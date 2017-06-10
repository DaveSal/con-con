class Publication < ApplicationRecord
  validates :title, presence: true
  validates :content, presence: true

  belongs_to :author, class_name: 'Individual'
end
